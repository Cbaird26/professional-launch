import { describe, expect, it } from "vitest";
import { deserializePersistedProductState, serializePersistedProductState } from "./persistence";
import { DEFAULT_DECISION_OPTIONS, DEFAULT_INTENT_SCENARIO, DEFAULT_MANUAL_CONTROLS } from "./productModel";

describe("product state persistence", () => {
  it("round-trips product state", () => {
    const serialized = serializePersistedProductState({
      mode: "DECISION",
      manualControls: DEFAULT_MANUAL_CONTROLS,
      selectedNavigatorPresetId: "local-corridor",
      decisionOptions: DEFAULT_DECISION_OPTIONS,
      selectedDecisionId: DEFAULT_DECISION_OPTIONS[0].id,
      intentScenario: DEFAULT_INTENT_SCENARIO,
      lastOptimization: {
        decision: null,
        intent: null,
        navigation: null,
      },
      coherenceHoldMode: "ARRIVAL",
      advancedOpen: {
        decision: true,
        intent: false,
      },
    });

    const restored = deserializePersistedProductState(serialized);

    expect(restored).not.toBeNull();
    expect(restored?.mode).toBe("DECISION");
    expect(restored?.decisionOptions).toHaveLength(3);
    expect(restored?.manualControls.target).toEqual(DEFAULT_MANUAL_CONTROLS.target);
    expect(restored?.selectedNavigatorPresetId).toBe("local-corridor");
    expect(restored?.coherenceHoldMode).toBe("ARRIVAL");
    expect(restored?.advancedOpen.decision).toBe(true);
  });

  it("accepts autopilot as a valid persisted mode", () => {
    const restored = deserializePersistedProductState(
      serializePersistedProductState({
        mode: "AUTOPILOT",
        manualControls: DEFAULT_MANUAL_CONTROLS,
        selectedNavigatorPresetId: null,
        decisionOptions: DEFAULT_DECISION_OPTIONS,
        selectedDecisionId: DEFAULT_DECISION_OPTIONS[0].id,
        intentScenario: DEFAULT_INTENT_SCENARIO,
        lastOptimization: {
          decision: null,
          intent: null,
          navigation: null,
        },
        coherenceHoldMode: "ARRIVAL",
        advancedOpen: {
          decision: false,
          intent: false,
        },
      }),
    );

    expect(restored?.mode).toBe("AUTOPILOT");
  });
});
