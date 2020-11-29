export const getAssetUrl = (assetPath: string): string => {
  return `${process.env.REACT_APP_ASSET_URI}/images/${assetPath}`;
};
