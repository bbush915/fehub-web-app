import { render } from "@testing-library/react";
import React from "react";

import UnitConfiguration from ".";

jest.mock("./components/HeroConfiguration", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("./components/StatisticsConfiguration", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("./components/SkillConfiguration", () => ({
  __esModule: true,
  default: () => null,
}));

describe("<UnitConfiguration />", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<UnitConfiguration />);

    expect(getByText("Hero")).toBeDefined();
    expect(getByText("Statistics")).toBeDefined();
    expect(getByText("Skills")).toBeDefined();
  });
});
