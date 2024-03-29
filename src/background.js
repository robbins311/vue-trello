"use strict";

import { app, protocol, BrowserWindow, Menu } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    // window default width, height(min, max값도 가능)
    width: 1920,
    height: 1080,
    // 크기 조절 허용여부, 기본값 true
    resizable: true,
    // 앱 실행시 window 중앙 위치
    center: true,
    // window 항상 최상단 위치, 기본값 false
    // alwaysOnTop: true,
    // 메뉴바 숨김여부
    autoHideMenuBar: true,
    webPreferences: {
      // node기반 라이브러리 사용여부, 기본값 true
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      // preload 스크립트, 기본값 true
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  });
  const templete = [
    {
      label: "edit",
      submenu: [
        {
          role: "zoomIn",
          accelerator: "CommandOrControl+=",
        },
        {
          role: "zoomOut",
        },
        {
          role: "reload",
        },
      ],
    },
  ];
  let newMenu = Menu.buildFromTemplate(templete);

  Menu.setApplicationMenu(newMenu);
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

//[생명주기] 모든 창이 닫히면 자동으로 앱 종료
// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // darwin(unix) 운영체제 = macOS
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
