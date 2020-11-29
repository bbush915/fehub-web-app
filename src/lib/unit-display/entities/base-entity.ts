import { Context, EntityProps, IEntity, MessageTypes } from "../types";

abstract class BaseEntiity {
  private readonly _tags: string[];
  private readonly _children: IEntity[];

  constructor(props: EntityProps) {
    this._tags = props.tags;
    this._children = [];
  }

  get tags(): string[] {
    return this._tags;
  }

  get children(): IEntity[] {
    return this._children;
  }

  get subscriptions(): MessageTypes[] {
    return [];
  }

  get alwaysRender(): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(_context: Context): void {
    // NOTE - Do nothing in default implementation.
  }
}

export default BaseEntiity;
