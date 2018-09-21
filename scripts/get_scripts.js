return (services, plugin) => new Promise(function(resolve, reject){
    resolve({
        beforeMount: ['_close-console'],
        afterMount: [ '_menu']
    });
});