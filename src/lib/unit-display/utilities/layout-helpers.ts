import { Container, DisplayObject, Sprite } from "pixi.js";

import { DisplayParameters, Layout } from "../types";

export function applyDefaultLayout(view: DisplayObject, layout: Layout): void {
  applyDisplayParameters(view, layout.default);
}

export function applyAdjustment(view: DisplayObject, layout: Layout, name: string): void {
  if (!layout.adjustments?.[name]) {
    throw new Error(`Unexpected adjustment encountered: [${name}]`);
  }

  const displayParameters = {
    ...layout.default,
    ...layout.adjustments[name],
  };

  applyDisplayParameters(view, displayParameters);
}

function applyDisplayParameters(view: DisplayObject, displayParameters: Partial<DisplayParameters>): void {
  if (displayParameters.scale) {
    view.scale.set(displayParameters.scale);
  }

  if (displayParameters.position) {
    view.position.set(displayParameters.position.x, displayParameters.position.y);
  }

  if (view instanceof Container) {
    if (displayParameters.width) view.width = displayParameters.width;
    if (displayParameters.height) view.height = displayParameters.height;
  }

  if (view instanceof Sprite) {
    if (displayParameters.anchor) view.anchor.set(displayParameters.anchor);
  }
}
