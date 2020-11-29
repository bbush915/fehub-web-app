import { BaseTexture, Loader, Texture } from "pixi.js";

export function getTexture(path: string): Texture {
  const [sheetNumber, name] = path.split("|");

  const sheet = Loader.shared.resources[`sheet_${sheetNumber}`];
  const texture = sheet.textures?.[`${name}.png`];

  return texture ?? getDefaultTexture();
}

export function getDefaultTexture(): Texture {
  return new Texture(
    new BaseTexture(undefined, {
      width: 0,
      height: 0,
    })
  );
}

export const getAssetUrl = (path: string): string => {
  return `${process.env.REACT_APP_ASSET_URI}/images/${path}`;
};
