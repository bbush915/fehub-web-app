import { Sprite } from "pixi.js";

import { EntityProps, IEntity } from "../types";
import { applyDefaultLayout } from "../utilities/layout-helpers";
import BaseEntiity from "./base-entity";

class BaseSprite extends BaseEntiity implements IEntity {
  private readonly _view: Sprite;

  constructor(props: EntityProps) {
    super(props);

    this._view = new Sprite();

    applyDefaultLayout(this._view, props.layout);
  }

  get view(): Sprite {
    return this._view;
  }
}

export default BaseSprite;
