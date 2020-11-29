import { Context, IEntity, MessageTypes } from "../types";

class MessageBus {
  private _subscribers: Record<string, IEntity[]>;

  constructor() {
    this._subscribers = {};
  }

  publish(messageType: MessageTypes, context: Context): void {
    if (!this._subscribers[messageType]) {
      return;
    }

    const entities = this._subscribers[messageType];

    for (const entity of entities) {
      entity.render(context);
    }
  }

  subscribe(messageType: MessageTypes, entity: IEntity): void {
    if (!this._subscribers[messageType]) {
      this._subscribers[messageType] = [];
    }

    this._subscribers[messageType].push(entity);
  }

  reset(): void {
    this._subscribers = {};
  }
}

export default MessageBus;
