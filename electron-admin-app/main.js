const { app, BrowserWindow } = require('electron')
let win;

function createWindow() {
// Create the browser window.
win = new BrowserWindow({
	width: 800,
	height: 600,
	webPreferences: {
	nodeIntegration: true
	}
})

win.loadFile('./html/login.html')

win.on('closed', function () {
	app.quit();//quit app when window closed
});
}

app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
if (process.platform !== 'darwin') {
	app.quit() //for mac users
}
})

app.on('activate', () => {
if (BrowserWindow.getAllWindows().length === 0) {//to prevent multiple windows on mac
	createWindow()
}
})
