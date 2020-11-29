import { AccessoryTypes } from "types";
import { Context, EntityProps, Layout, MessageTypes, State } from "../types";
import { applyAdjustment, applyDefaultLayout } from "../utilities/layout-helpers";
import Backdrop from "./backdrop";

enum Adjustments {
  ACCESSORY = "accessory",
}

class LevelBackdrop extends Backdrop {
  private readonly _layout: Layout;

  constructor(props: EntityProps) {
    super(props);

    this._layout = props.layout;
  }

  get subscriptions(): MessageTypes[] {
    return ["SET_ACCESSORY_TYPE"];
  }

  get alwaysRender(): boolean {
    return false;
  }

  render(context: Context): void {
    const adjustment = this._getAdjustment(context.state);

    if (adjustment) {
      applyAdjustment(this.view, this._layout, adjustment);
    } else {
      applyDefaultLayout(this.view, this._layout);
    }
  }

  private _getAdjustment(state: State): Adjustments | null {
    return state.accessoryType === AccessoryTypes.NONE ? null : Adjustments.ACCESSORY;
  }
}

export default LevelBackdrop;
