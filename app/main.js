const { app, BrowserWindow } = require("electron");

app.on("ready", () => {
	const mainWindow = new BrowserWindow({
		width: 300,
		height: 600
	});
	mainWindow.loadURL(`file://${__dirname}/index.html`);
});
