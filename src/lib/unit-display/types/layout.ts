import DisplayParameters from "./display-parameters";

type Layout = {
  default: Partial<DisplayParameters>;
  adjustments?: Record<string, Partial<DisplayParameters> | undefined>;
};

export default Layout;
