import { describe, expect, it } from "vitest";
import { deserializeShellState, normalizeMobileSettings } from "./settings";

describe("mobile settings", () => {
  it("normalizes missing settings to safe defaults", () => {
    const settings = normalizeMobileSettings();
    expect(settings.safeMode).toBe(true);
    expect(settings.brightnessEffectsEnabled).toBe(false);
    expect(settings.hapticsEnabled).toBe(true);
  });

  it("restores valid shell state payloads", () => {
    const restored = deserializeShellState(
      JSON.stringify({
        activeSection: "APP",
        lastAppTab: "fold",
        launchDestination: "RESUME_APP",
        acceptedTermsVersion: "2026-03-31",
        acceptedPrivacyVersion: "2026-03-31",
        settings: {
          safeMode: false,
          reducedMotion: true,
          hapticsEnabled: false,
          brightnessEffectsEnabled: true,
          onboardingCompleted: true,
        },
      }),
      "sculptor",
    );

    expect(restored?.activeSection).toBe("APP");
    expect(restored?.lastAppTab).toBe("fold");
    expect(restored?.launchDestination).toBe("RESUME_APP");
    expect(restored?.acceptedTermsVersion).toBe("2026-03-31");
    expect(restored?.settings.safeMode).toBe(false);
    expect(restored?.settings.brightnessEffectsEnabled).toBe(true);
  });
});
