const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");
// const PosPrinter = require('electron-pos-printer')
const { exec } = require("child_process");
const os = require("os");
const { machineIdSync } = require("node-machine-id");

function createWindow() {
  const mainWindow = new BrowserWindow({
    icon: "./icon.ico",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  const data = [
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: "શ્રી ભગવતી ફાસ્ટ ફૂડ",
      style: { fontWeight: "700", textAlign: "center", fontSize: "24px" },
    },
    {
      type: "qrCode",
      value:
        "upi://pay?pa=9825312229@icici&pn=$jay parmar&tn=cftrhwetaw4gta&am=100",
      height: 10,
      width: 10,
      style: { margin: "80 20px 20 20px" },
    },
  ];
  function getPrinterList() {
    return new Promise((resolve, reject) => {
      if (process.platform === "win32") {
        exec(
          'powershell -Command "Get-Printer | Select-Object Name"',
          (err, stdout) => {
            if (err) {
              reject(err);
              return;
            }

            const printerNames = stdout
              .split("\r\n")
              .map((line) => line.trim())
              .filter((printer) => printer);

            resolve(printerNames);
          }
        );
      } else {
        exec("lpstat -a", (err, stdout) => {
          if (err) {
            reject(err);
            return;
          }

          const printerNames = stdout
            .split("\n")
            .map((line) => line.trim().split(" ")[0])
            .filter((printer) => printer);

          resolve(printerNames);
        });
      }
    });
  }

  function getMacAddress() {
    return machineIdSync();
  }
  ipcMain.on("findMac", async (event, title) => {
    const mac = getMacAddress();
    mainWindow.webContents.send("getMac", mac);
  });

  // contextBridge.exposeInMainWorld("electronAPI", {
  //   getMachineId: () => machineIdSync(),
  // });
  console.log(">>>", machineIdSync());
  console.log("<<<<<");

  getMacAddress();

  // Example usage

  ipcMain.on("findPrinter", async (event, title) => {
    getPrinterList()
      .then((printers) => {
        mainWindow.webContents.send("getPrinter", printers);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  ipcMain.on("set-title", async (event, title) => {
    console.log(">>>> ONCLICK", title);
    const printer = title.printer;
    const data = title.data;
    console.log("titel", printer.marginTop);
    const printWindow = new BrowserWindow({ show: true });
    await printWindow.loadURL(`data:text/html,` + encodeURIComponent(data));
    // await printWindow.loadURL(`http://localhost:3000`);
    try {
      printWindow.webContents.print({
        silent: true,
        printBackground: true,
        margins: {
          marginType: "custom",
          top: printer.marginTop, // Specify your custom top margin in millimeters
          bottom: printer.marginBottom, // Specify your custom bottom margin in millimeters
          left: printer.marginLeft, // Specify your custom left margin in millimeters
          right: printer.marginRight, // Specify your custom right margin in millimeters
        },
        deviceName: printer.printerName,
      });
    } catch (error) {
      console.log("catchError", error);
    }
    // getPrinterList()
    // .then(printers => {
    //   console.log('Printers:', printers);
    //    mainWindow.webContents.send('messageFromMain', printers);
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // })
  });
  // mainWindow.loadURL("http://192.168.1.222:3000/");
  // mainWindow.loadURL('http://admin.bhagwatifastfood.com/')
  // mainWindow.loadURL("http://192.168.1.222:3006/");
  mainWindow.loadURL("http://localhost:3000/");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
