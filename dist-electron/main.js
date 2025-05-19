import { app as n, BrowserWindow as r, ipcMain as a } from "electron";
import { createRequire as m } from "node:module";
import { fileURLToPath as R } from "node:url";
import * as o from "node:path";
import * as t from "node:fs";
m(import.meta.url);
const l = o.dirname(R(import.meta.url));
process.env.APP_ROOT = o.join(l, "..");
const i = process.env.VITE_DEV_SERVER_URL, E = o.join(process.env.APP_ROOT, "dist-electron"), c = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = i ? o.join(process.env.APP_ROOT, "public") : c;
let e;
function d() {
  e = new r({
    icon: o.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: o.join(l, "preload.mjs"),
      contextIsolation: !0,
      // 必须启用
      nodeIntegration: !1,
      // 必须禁用
      sandbox: !1,
      devTools: !n.isPackaged
    }
  }), e.webContents.openDevTools(), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), i ? e.loadURL(i) : e.loadFile(o.join(c, "index.html"));
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
  r.getAllWindows().length === 0 && d();
});
const _ = "yuce-token.json", s = o.join(n.getPath("userData"), _);
a.handle("fs:load-token", () => (t.existsSync(s) || t.writeFileSync(s, "{}", "utf-8"), JSON.parse(t.readFileSync(s, "utf-8"))));
a.handle("fs:save-token", (u, p) => {
  const f = { token: p };
  t.writeFileSync(s, JSON.stringify(f, null, 2), "utf-8");
});
n.whenReady().then(d);
export {
  E as MAIN_DIST,
  c as RENDERER_DIST,
  i as VITE_DEV_SERVER_URL
};
