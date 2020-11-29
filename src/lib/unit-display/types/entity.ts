import { Container } from "pixi.js";

import Context from "./context";
import Layout from "./layout";
import { MessageTypes } from "./message";

interface IEntity {
  view: Container;
  tags: string[];
  children: IEntity[];
  subscriptions: MessageTypes[];
  alwaysRender: boolean;
  render(context: Context): void;
}

export type EntityConstructor = {
  new (props: EntityProps): IEntity;
};

export type EntityProps = {
  layout: Layout;
  tags: string[];
  options: any;
};

export default IEntity;
