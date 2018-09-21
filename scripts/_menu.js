return (services, plugin) => new Promise(function(resolve, reject){    
    const items = [
        {
            path: "/Student Platform",
            actions: {
                onclick: () => plugin['breathecode'].openTab('https://student.breatheco.de')
            }
        },
        {
            path: "/Browse Assets",
            actions: {
                onclick: () => plugin['breathecode'].openTab('https://breatheco.de/en/assets/')
            }
        },
        {
            path: "/Slack Channel",
            actions: {
                onclick: () => plugin['breathecode'].openTab('https://4geeksacademy.slack.com/messages')
            }
        },
        {
            path: "/~",
            type: "divider"
        },
        {
            path: "/Boilerplates",
            items: [
                {
                    path: "/vanilla-js",
                    actions: {
                        onclick: () => plugin['breathecode'].openTab('https://github.com/4GeeksAcademy/vanillajs-hello')
                    }
                },
                {
                    path: "/react",
                    actions: {
                        onclick: () => plugin['breathecode'].openTab('https://github.com/4GeeksAcademy/react-hello')
                    }
                },
                {
                    path: "/react-flux",
                    actions: {
                        onclick: () => plugin['breathecode'].openTab('https://github.com/4GeeksAcademy/react-hello-flux')
                    }
                },
                {
                    path: "/django-rest",
                    actions: {
                        onclick: () => plugin['breathecode'].openTab('https://github.com/4GeeksAcademy/django-rest-hello')
                    }
                }
            ]
        }
    ];
    plugin['breathecode'].log('addMenus');
    // Add a custom top-level menu to the menu bar.
    // Add commands and dividers to this menu.
    var menuCaption = "Breathe Code";     // Menu caption.
    var menus = services["menus"];    // Access the menu bar.
    menus.remove('Support');
    menus.remove('Run');
    
    var MenuItem = services.MenuItem; // Use this to create a menu item.
    var Divider = services.Divider;   // Use this to create a menu divider.
    
    // Set the top-level menu caption.
    menus.setRootMenu(menuCaption, 900, plugin);
    
    //Adding menu options to the root Breathe Code Menu
    const addMenuLevel = (parentPath, items) => {
        items.forEach((item) => {
            plugin['breathecode'].log("addItemByPath", item);
            const type = (item.type == 'divider') ? new Divider() : new MenuItem(item.actions || {});
            menus.addItemByPath(parentPath + item.path, type, 100, plugin);
            if(Array.isArray(item.items) && item.items.length>0) 
                addMenuLevel(parentPath + item.path, item.items);
        });
    };
    addMenuLevel(menuCaption, items);
    resolve();
});