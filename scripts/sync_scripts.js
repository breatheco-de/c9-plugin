return (services, plugin) => new Promise(function(resolve, reject){
    const _private = {
        init: function() {
            this.doInstallOrUpgradeIfHostedWorkspace();
        },
        onError: function(err) {
            plugin['breathecode'].log(err);
            plugin['breathecode'].notify().error(plugin['breathecode'].name + ' failed: ' + err.message);
            reject(err);
        },
        doInstallOrUpgradeIfHostedWorkspace: function() {
            plugin['breathecode'].log('doInstallOrUpgradeIfHostedWorkspace');
    
            services.proc.execFile('sh', {
                args: ['-c', 'echo -n "$C9_HOSTNAME"'], cwd: '/'
            }, (err, stdout, stderr) => _private.doInstallOrUpgradeIfHostedWorkspaceCallback(err, stdout, stderr));
        },
        doInstallOrUpgradeIfHostedWorkspaceCallback: function(err, stdout, stderr) {
            plugin['breathecode'].log('doInstallOrUpgradeIfHostedWorkspaceCallback');
    
            if (err) {
                return _private.onError(err);
            }
    
            if (stdout.endsWith('.c9users.io')) {
                _private.doInstallOrUpgrade();
            }
        },
        doInstallOrUpgrade: function() {
            plugin['breathecode'].log('doInstallOrUpgrade');
    
            services.proc.execFile('test', {
                args: ['-d', plugin['breathecode'].absPath], cwd: '/'
            }, (err, stdout, stderr) => _private.doInstallOrUpgradeCallback(err, stdout, stderr));
        },
        doInstallOrUpgradeCallback: function(err, stdout, stderr) {
            plugin['breathecode'].log('doInstallOrUpgradeCallback');
    
            if (err && (err.code == 1)) {
                // not installed
                _private.doClone();
            } else if (err) {
                // error
                _private.onError(err);
            } else {
                // installed
                _private.doUpgrade();
            }
        },
        doClone: function(callback) {
            plugin['breathecode'].log('doClone');
    
            services.proc.execFile('git', {
                args: ['clone', plugin['breathecode'].remote, plugin['breathecode'].absPath], cwd: '/'
            }, (err) => _private.doCloneCallback(err));
        },
        doCloneCallback: function(err) {
            plugin['breathecode'].log( 'doCloneCallback');
            if (err) return _private.onError( err);
            _private.doInstall(plugin['breathecode']);
        },
        doUpgrade: function() {
            plugin['breathecode'].log('doUpgrade');
    
            services.proc.execFile('git', {
                args: ['pull'], cwd: plugin['breathecode'].absPath
            }, (err) => {
                const version = plugin['breathecode'].version || null;
                if(!version) _private.doUpgradeCallback(err);
                else services.proc.execFile('git', {
                    args: ['checkout','tags/'+version], cwd: plugin['breathecode'].absPath
                }, (err) => _private.doUpgradeCallback(err));
            });
        },
        doUpgradeCallback: function(err) {
            plugin['breathecode'].log( 'doUpgradeCallback');
            if (err) return _private.onError( err);
            
            plugin['breathecode'].notify().success("The BreatheCode Plugin has been updated successfully to v"+plugin['breathecode'].version);
            _private.doInstall();
        },
        doInstall: function() {
            plugin['breathecode'].log( 'doInstall');
    
            services.proc.execFile('bash', {
                args: ['./install'], cwd: plugin['breathecode'].absPath
            }, (err, stdout) => _private.doInstallCallback(err, stdout));
        },
        doInstallCallback: function(err, stdout) {
            plugin['breathecode'].log( 'doInstallCallback');
            if (err) return _private.onError(err);
            
            resolve();
        }
    };
    
    _private.init();
});