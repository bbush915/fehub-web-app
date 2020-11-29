import FontFaceObserver from "fontfaceobserver";
import { Application, Loader } from "pixi.js";

import ApplicationManager from "./utilities/application-manager";

const application = new Application({
  width: 1600,
  height: 1920,
  resolution: 2,
});

application.renderer.plugins.interaction.autoPreventDefault = false;
application.renderer.view.style.touchAction = "auto";

function preloadFontsAsync(): Promise<void> {
  const fontFaceObserver = new FontFaceObserver("nintendoP_Skip-D_003");
  return fontFaceObserver.load();
}

const NUMBER_OF_SPRITESHEETS = 2;

function preloadAssetsAsync(): Promise<void> {
  const loader = Loader.shared;

  loader.baseUrl = `${process.env.REACT_APP_ASSET_URI}`;

  for (let i = 0; i < NUMBER_OF_SPRITESHEETS; i++) {
    const resourceName = `sheet_${i + 1}`;

    if (loader.resources[resourceName]) {
      continue;
    }

    loader.add(resourceName, `images/unit-builder/spritesheet_${i + 1}.json`);
  }

  return new Promise((resolve, reject) => {
    const startTime = new Date();
    console.log(`Started loading assets at ${startTime.toISOString()}`);

    loader.load();

    loader.onComplete.add(() => {
      const finishTime = new Date();
      console.log(
        `Finished loading assets at ${finishTime.toISOString()} (${finishTime.getTime() - startTime.getTime()} ms)`
      );
      applicationManager.dispatch({ type: "SET_TEMPLATE", value: "default" });
      resolve();
    });

    loader.onError.add((error) => {
      console.error(`Error occurred while loading: ${error}`);
      reject();
    });
  });
}

preloadFontsAsync().then(preloadAssetsAsync);

const applicationManager = new ApplicationManager(application);

export const dispatch = applicationManager.dispatch.bind(applicationManager);
export const view = application.view;
