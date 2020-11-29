import { NineSlicePlane } from "pixi.js";

import { EntityProps, IEntity } from "../types";
import { applyDefaultLayout } from "../utilities/layout-helpers";
import { getDefaultTexture } from "../utilities/texture-helpers";
import BaseEntiity from "./base-entity";

class BaseNineSlicePlane extends BaseEntiity implements IEntity {
  private readonly _view: NineSlicePlane;

  constructor(props: EntityProps) {
    super(props);

    this._view = new NineSlicePlane(getDefaultTexture());

    if (!props.options.leftWidth) {
      throw new Error("Missing required option: [leftWidth]");
    }

    this._view.leftWidth = props.options.leftWidth;

    if (!props.options.rightWidth) {
      throw new Error("Missing required option: [rightWidth]");
    }

    this._view.rightWidth = props.options.rightWidth;

    if (!props.options.topHeight) {
      throw new Error("Missing required option: [topHeight]");
    }

    this._view.topHeight = props.options.topHeight;

    if (!props.options.bottomHeight) {
      throw new Error("Missing required option: [bottomHeight]");
    }

    this._view.bottomHeight = props.options.bottomHeight;

    applyDefaultLayout(this._view, props.layout);
  }

  get view(): NineSlicePlane {
    return this._view;
  }
}

export default BaseNineSlicePlane;
