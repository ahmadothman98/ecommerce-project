const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;

app.on('ready', function(){
    //create new window
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'main.html'),
        protocol: 'file',
        slashes: true
    }));
    mainWindow.on('closed', function(){
        app.quit();
    })
    

    //Build the menue from the tmplate
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert the menu
    Menu.setApplicationMenu(mainMenu)
});
    // Handle add item window

function addItem(){
    addItemWindow = new BrowserWindow({
       width: 300,
       height: 200,
       title: 'Add Shopping List Item' 
    });

    addItemWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addItem.html'),
        protocol: 'file',
        slashes: true
    }));
    addItemWindow.on('close',function(){
        addItemWindow = null;
        //garbage handling
    });

}

//create menu template

 const mainMenuTemplate = [
     {
         label: 'File',
         submenu:[
             {
                 label: 'Add Item',
                 click(){
                     addItem();
                 }
             },
             {
                 label: 'Add Catagory'
             },
             {
                 label:'Quit',
                 //add key shortcut, if mac cmd+Q if other ctrl+Q
                 accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                 click(){
                     app.quit();
                 }
             }
         ]
     }
 ];

// for mac users
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});//adds empty object to menu 
}

