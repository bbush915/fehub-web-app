import { Container } from "pixi.js";

import { EntityProps, IEntity } from "../types";
import { applyDefaultLayout } from "../utilities/layout-helpers";
import BaseEntity from "./base-entity";

class BaseContainer extends BaseEntity implements IEntity {
  private readonly _view: Container;

  constructor(props: EntityProps) {
    super(props);

    this._view = new Container();

    applyDefaultLayout(this._view, props.layout);
  }

  get view(): Container {
    return this._view;
  }
}

export default BaseContainer;
