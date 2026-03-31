import type { PersistedProductState } from "./types";
import { loadStoredString, saveStoredString } from "../../platform/storage";
import { DEFAULT_MANUAL_CONTROLS } from "./productModel";

export const PRODUCT_STATE_STORAGE_KEY = "professional-launch-product-state";
const VALID_MODES = new Set(["DECISION", "INTENT", "NAVIGATION", "AUTOPILOT", "RESEARCH"]);
const VALID_HOLD_MODES = new Set(["ARRIVAL", "INDEFINITE"]);
const DEFAULT_LAST_OPTIMIZATION = {
  decision: null,
  intent: null,
  navigation: null,
};

export function serializePersistedProductState(state: PersistedProductState) {
  return JSON.stringify(state);
}

export function deserializePersistedProductState(raw: string | null) {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<PersistedProductState>;

    if (
      !parsed ||
      typeof parsed !== "object" ||
      typeof parsed.mode !== "string" ||
      !VALID_MODES.has(parsed.mode) ||
      !Array.isArray(parsed.decisionOptions) ||
      typeof parsed.selectedDecisionId !== "string" ||
      !parsed.intentScenario ||
      typeof parsed.coherenceHoldMode !== "string" ||
      !VALID_HOLD_MODES.has(parsed.coherenceHoldMode) ||
      !parsed.advancedOpen
    ) {
      return null;
    }

    return {
      ...parsed,
      manualControls: parsed.manualControls ?? DEFAULT_MANUAL_CONTROLS,
      selectedNavigatorPresetId: typeof parsed.selectedNavigatorPresetId === "string" ? parsed.selectedNavigatorPresetId : null,
      lastOptimization:
        parsed.lastOptimization && typeof parsed.lastOptimization === "object"
          ? {
              decision: parsed.lastOptimization.decision ?? null,
              intent: parsed.lastOptimization.intent ?? null,
              navigation: parsed.lastOptimization.navigation ?? null,
            }
          : DEFAULT_LAST_OPTIMIZATION,
    } as PersistedProductState;
  } catch {
    return null;
  }
}

export function loadPersistedProductState() {
  return loadStoredString(PRODUCT_STATE_STORAGE_KEY).then((raw) => deserializePersistedProductState(raw));
}

export function savePersistedProductState(state: PersistedProductState) {
  return saveStoredString(PRODUCT_STATE_STORAGE_KEY, serializePersistedProductState(state));
}
