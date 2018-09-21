return (services, plugin) => new Promise(function(resolve, reject){
    reject('fake error');
    plugin['breathecode'].log('Hello....');
    console.log('Hello 2');
});