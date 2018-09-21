return (services, plugin) => new Promise(function(resolve, reject){
    const tabs = services.console.getTabs();
    if(tabs.length>0){
        tabs[0].meta.$ignore = true;
        tabs[0].close();
    }
    resolve();
});
