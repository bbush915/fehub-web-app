import Layout from "./layout";

type TemplateItem = {
  type: string;
  tags?: string[];
  layout: Layout;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
  children?: TemplateItem[];
};

export default TemplateItem;
