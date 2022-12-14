const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: "./",
      builderOptions: {
        productName: "Todo-App",
        win: {
          icon: "public/trel_icon.ico",
        },
        nsis: {
          installerIcon: "public/favicon.ico",
          uninstallerIcon: "public/favicon.ico",
          uninstallDisplayName: "CPU Monitor",
          oneClick: false,
        },
      },
    },
  },
});
