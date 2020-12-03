import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";

addMatchImageSnapshotCommand({
  customDiffDir: "cypress/screenshots",
  customSnapshotsDir: "cypress/screenshots",
});
