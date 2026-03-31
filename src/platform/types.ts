export type LaunchSection = "HOME" | "APP" | "MANUAL" | "ABOUT" | "LEGAL" | "SETTINGS";
export type LaunchDestination = "HOME" | "RESUME_APP";

export type MobileSettings = {
  safeMode: boolean;
  reducedMotion: boolean;
  hapticsEnabled: boolean;
  brightnessEffectsEnabled: boolean;
  onboardingCompleted: boolean;
};

export type PersistedShellState = {
  activeSection: LaunchSection;
  lastAppTab: string;
  launchDestination: LaunchDestination;
  acceptedTermsVersion: string | null;
  acceptedPrivacyVersion: string | null;
  settings: MobileSettings;
};

export type NativeExportArtifact = {
  fileName: string;
  mimeType: string;
  contents: string;
};

export type ShellBackContext = {
  activeSection: LaunchSection;
  activeDeviceId: string;
  defaultDeviceId: string;
  settingsOpen: boolean;
  onboardingVisible: boolean;
  hasDiscoveryBackAction: boolean;
};

export type ShellBackAction =
  | "close-settings"
  | "dismiss-onboarding"
  | "delegate-discovery"
  | "go-home"
  | "go-default-tab"
  | "exit";
