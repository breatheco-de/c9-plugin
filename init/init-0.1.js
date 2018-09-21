({
    name: 'c9-plugin',
    version: '0.1',
    remote: 'https://github.com/breatheco-de/c9-plugin.git',
    absPath: '/home/ubuntu/c9-plugin',
    relativePath: '~/workspace/c9-plugin',
    debug: true,
    log: function(elm){ if(this.debug) console.log(elm) },
    init: function() {
        this.log('initializing...');
        plugin['breathecode'] = this;
        services.proc.execFile('test', {
            args: ['-d', plugin['breathecode'].absPath], cwd: '/'
        }, (err) => {
           if (err && (err.code == 1)) services.proc.execFile('git', {
                    args: ['clone', plugin['breathecode'].remote, plugin['breathecode'].absPath], cwd: '/'
                }, (cloneError) => {
                    if(cloneError) console.error(cloneError);
                    else this.startLifeCycle();
                });
            else if(err) console.error(err);
            else this.startLifeCycle();
        });
    },
    startLifeCycle: function(){
        this.runScript('get_utils', (utils) => {
            plugin['breathecode'] = Object.assign(plugin['breathecode'], utils);
            this.runScript('get_scripts', (scripts) =>
                this.runScripts(scripts.beforeMount, () => 
                    this.runScript('sync_scripts', () => 
                        this.runScripts(scripts.afterMount, () => this.log('All scripts done'))
                    ,true)
                )
            );
        },true);
    },
    runScripts: function(scripts, callback=null){
        let requests = {};
        const hasPending = (req) => {
            for(let name in req) if(req[name].loading) return true;
            return false;
        };
        scripts.forEach((scriptName, currentScriptIndex) => {
            requests[scriptName] = { loading: true, error: false };
            this.runScript(scriptName, (result) => {
                if(typeof(result) == 'Error') requests[scriptName].error = true;
                requests[scriptName].loading = false;
                if(callback && !hasPending()) callback();
            });
        });
    },
    runScript: function(scriptName, callback=null, blocking=false){
        this.log('Retrieving script: '+scriptName);
        if(!callback && this.debug) console.error("runscript needs a function callback");
        services.fs.readFile(this.relativePath+"/scripts/"+scriptName+".js", (err, data) => {
            if (err){
                if(this.debug) console.error(err);
                if(!blocking) callback(new Error(err));
            }
            else (new Function(data)()(services, plugin))
                    .then(res => callback(res))
                    .catch(err => {
                        plugin['breathecode'].notify().error(err);
                        if(!blocking) callback(new Error(err));
                    });
        });
    }
}).init();