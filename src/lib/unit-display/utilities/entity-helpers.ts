import * as EntityTypes from "../entities";
import { EntityConstructor, EntityProps, IEntity, Layout } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getEntity(type: string, layout: Layout, tags: string[] = [], options: any = {}): IEntity {
  if (!(type in EntityTypes)) {
    throw new Error(`Unexpected entity type encountered: [${type}]`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entityConstructor: EntityConstructor = (EntityTypes as any)[type];
  const entityProps: EntityProps = { layout, tags, options };

  return new entityConstructor(entityProps);
}

export function getDefaultEntityProps(): EntityProps {
  return {
    layout: {
      default: {},
    },
    tags: [],
    options: {},
  };
}
