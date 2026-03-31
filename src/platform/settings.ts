import type { LaunchDestination, LaunchSection, MobileSettings, PersistedShellState } from "./types";
import { getPrefersReducedMotion } from "./runtime";

export const SHELL_STATE_STORAGE_KEY = "professional-launch-shell-state";
export const DEFAULT_LAUNCH_SECTION: LaunchSection = "HOME";
export const DEFAULT_LAUNCH_DESTINATION: LaunchDestination = "HOME";

export function getDefaultMobileSettings(): MobileSettings {
  const prefersReducedMotion = getPrefersReducedMotion();

  return {
    safeMode: true,
    reducedMotion: prefersReducedMotion,
    hapticsEnabled: true,
    brightnessEffectsEnabled: false,
    onboardingCompleted: false,
  };
}

export function normalizeMobileSettings(value?: Partial<MobileSettings> | null): MobileSettings {
  const defaults = getDefaultMobileSettings();

  return {
    safeMode: value?.safeMode ?? defaults.safeMode,
    reducedMotion: value?.reducedMotion ?? defaults.reducedMotion,
    hapticsEnabled: value?.hapticsEnabled ?? defaults.hapticsEnabled,
    brightnessEffectsEnabled: value?.brightnessEffectsEnabled ?? defaults.brightnessEffectsEnabled,
    onboardingCompleted: value?.onboardingCompleted ?? defaults.onboardingCompleted,
  };
}

export function serializeShellState(state: PersistedShellState) {
  return JSON.stringify(state);
}

export function deserializeShellState(raw: string | null, defaultDeviceId: string): PersistedShellState | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<PersistedShellState>;
    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    const activeSection = parsed.activeSection;
    const lastAppTab = parsed.lastAppTab;
    const launchDestination = parsed.launchDestination;
    const acceptedTermsVersion = parsed.acceptedTermsVersion;
    const acceptedPrivacyVersion = parsed.acceptedPrivacyVersion;

    return {
      activeSection:
        activeSection === "HOME" ||
        activeSection === "APP" ||
        activeSection === "MANUAL" ||
        activeSection === "ABOUT" ||
        activeSection === "LEGAL" ||
        activeSection === "SETTINGS"
          ? activeSection
          : DEFAULT_LAUNCH_SECTION,
      lastAppTab: typeof lastAppTab === "string" ? lastAppTab : defaultDeviceId,
      launchDestination: launchDestination === "RESUME_APP" ? "RESUME_APP" : DEFAULT_LAUNCH_DESTINATION,
      acceptedTermsVersion: typeof acceptedTermsVersion === "string" ? acceptedTermsVersion : null,
      acceptedPrivacyVersion: typeof acceptedPrivacyVersion === "string" ? acceptedPrivacyVersion : null,
      settings: normalizeMobileSettings(parsed.settings),
    };
  } catch {
    return null;
  }
}
