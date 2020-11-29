import React, { createContext } from "react";

import { dispatch } from "lib/unit-display/application";

const UnitBuilderContext = createContext<{
  dispatch: typeof dispatch;
}>({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: null as any,
});

export const UnitBuilderProvider: React.FC = ({ children }) => (
  <UnitBuilderContext.Provider value={{ dispatch }}>{children}</UnitBuilderContext.Provider>
);

export default UnitBuilderContext;
