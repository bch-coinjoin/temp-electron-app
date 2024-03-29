// Global npm libraries
const electron = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const colabCoinJoinApi = require('colab-coinjoin-api')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({ width: 900, height: 680 })
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
  mainWindow.on('closed', () => { mainWindow = null })

  colabCoinJoinApi.startServer()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
