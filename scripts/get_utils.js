return (services, plugin) => new Promise(function(resolve, reject){
    resolve({
        log: function(...args){ if(plugin['breathecode'].debug) console.log(...args) },
        notify: function(){
            return {
                error: (err=null) => {
                    if(!err) err = 'Unspecified error';
                    if(plugin['breathecode'].debug) console.error(err);
                    services['dialog.error'].show("Error",err);
                },
                success: (msg=null) => {
                    if(!msg) msg = 'Unspecified error';
                    if(plugin['breathecode'].debug) console.log(msg);
                    services['dialog.alert'].show("Success",msg);
                }
            };
        },
        openTab: function(url){
            window.open(url);
        }
    });
});