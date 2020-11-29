import { render } from "@testing-library/react";
import React from "react";

import Header from ".";

describe("<Header />", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<Header />);

    expect(getByText("Unit Builder")).toBeDefined();
  });
});
