import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import App, { DEFAULT_ACTIVE_DEVICE, TOP_LEVEL_DEVICES } from "./App.jsx";

describe("Professional Launch shell", () => {
  it("uses the required tab order with Probability Sculptor as default", () => {
    expect(DEFAULT_ACTIVE_DEVICE).toBe("sculptor");
    expect(TOP_LEVEL_DEVICES.map((device) => device.label)).toEqual([
      "Probability Sculptor",
      "Fold-Space Engine",
      "Timeline Selector",
      "Decision",
      "Intent",
      "Navigation",
      "Autopilot",
      "Research",
    ]);
  });

  it("renders the launch shell with home as the default surface", () => {
    const html = renderToStaticMarkup(createElement(App));
    expect(html).toContain("Professional Launch");
    expect(html).toContain("Theory of Everything Foundation");
    expect(html).toContain("ZoraASI");
    expect(html).toContain("Start");
    expect(html).toContain("Manual");
    expect(html).toContain("About");
    expect(html).toContain("Legal");
    expect(html).toContain("Settings");
    expect(html).toContain("Probability Sculptor");
    expect(html).toContain("Fold-Space Engine");
    expect(html).toContain("Timeline Selector");
    expect(html).toContain("Decision, Intent, Navigation, Autopilot, Research");
  });
});
