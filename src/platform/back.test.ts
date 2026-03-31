import { describe, expect, it } from "vitest";
import { resolveShellBackAction } from "./back";

describe("shell back action resolver", () => {
  it("prioritizes closing overlays before leaving the current tab", () => {
    expect(
      resolveShellBackAction({
        activeSection: "APP",
        activeDeviceId: "decision",
        defaultDeviceId: "sculptor",
        settingsOpen: true,
        onboardingVisible: false,
        hasDiscoveryBackAction: false,
      }),
    ).toBe("close-settings");
  });

  it("returns to the default tab before exiting the app", () => {
    expect(
      resolveShellBackAction({
        activeSection: "APP",
        activeDeviceId: "research",
        defaultDeviceId: "sculptor",
        settingsOpen: false,
        onboardingVisible: false,
        hasDiscoveryBackAction: false,
      }),
    ).toBe("go-default-tab");
  });

  it("returns to home before exiting when leaving utility sections", () => {
    expect(
      resolveShellBackAction({
        activeSection: "LEGAL",
        activeDeviceId: "sculptor",
        defaultDeviceId: "sculptor",
        settingsOpen: false,
        onboardingVisible: false,
        hasDiscoveryBackAction: false,
      }),
    ).toBe("go-home");
  });
});
