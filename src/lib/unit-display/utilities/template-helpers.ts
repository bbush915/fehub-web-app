import { Container } from "pixi.js";

import DefaultTemplate from "../assets/templates/default.json";
import { IEntity, TemplateItem } from "../types";
import { getEntity } from "./entity-helpers";

export function parseTemplate(stage: Container, name = "default"): IEntity[] {
  const template = getTemplateByName(name);

  const entities: IEntity[] = [];

  for (let i = 0; i < template.length; i++) {
    const entity = parseTemplateItem(template[i], entities);
    stage.addChild(entity.view);
  }

  return entities;
}

function getTemplateByName(name: string): TemplateItem[] {
  switch (name) {
    case "default": {
      return DefaultTemplate;
    }

    default: {
      throw new Error(`Unexpected template encountered: [${name}]`);
    }
  }
}

function parseTemplateItem(templateItem: TemplateItem, entities: IEntity[]): IEntity {
  // NOTE(Bryan) - Convert Kebab-case to Pascal-case.
  const type = templateItem.type
    .split("-")
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join("");

  const entity = getEntity(type, templateItem.layout, templateItem.tags, templateItem.options);
  entities.push(entity);

  if (templateItem.children?.length) {
    for (let i = 0; i < templateItem.children.length; i++) {
      const childEntity = parseTemplateItem(templateItem.children[i], entities);

      entity.children.push(childEntity);
      entity.view.addChild(childEntity.view);
    }
  }

  return entity;
}
