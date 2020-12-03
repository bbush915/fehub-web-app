import { addMatchImageSnapshotPlugin } from "cypress-image-snapshot/plugin";

const pluginConfig: Cypress.PluginConfig = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);

  return config;
};

export default pluginConfig;
