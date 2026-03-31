import { describe, expect, it } from "vitest";
import {
  applyPracticalInputsToControls,
  DEFAULT_DECISION_OPTIONS,
  DEFAULT_INTENT_SCENARIO,
  DEFAULT_MANUAL_CONTROLS,
  evaluateAutoRoutes,
  evaluateDecisionOptions,
  evaluateEngineControls,
  findMatchingPresetId,
  generateInsight,
  inferPracticalInputsFromEngine,
  mapPracticalInputsToEngine,
  optimizeDecisionOption,
  optimizeIntentScenario,
  optimizeManualControls,
} from "./productModel";
import presets from "../data/presets.json";

describe("productModel", () => {
  it("maps practical inputs into bounded engine controls", () => {
    const controls = mapPracticalInputsToEngine({
      alignment: 0.7,
      complexity: 0.6,
      timeHorizon: 0.4,
      stability: 0.8,
    });

    expect(controls.coherence).toBeGreaterThanOrEqual(0);
    expect(controls.coherence).toBeLessThanOrEqual(1);
    expect(controls.energy).toBeGreaterThanOrEqual(0);
    expect(controls.energy).toBeLessThanOrEqual(1);
    expect(controls.curvature).toBeGreaterThanOrEqual(0);
    expect(controls.curvature).toBeLessThanOrEqual(1);
    expect(controls.ethics).toBeGreaterThanOrEqual(-1);
    expect(controls.ethics).toBeLessThanOrEqual(1);
    expect(controls.instability).toBeGreaterThanOrEqual(0);
    expect(controls.instability).toBeLessThanOrEqual(1);
  });

  it("ranks decision options by comparative viability", () => {
    const evaluations = evaluateDecisionOptions(DEFAULT_DECISION_OPTIONS);

    expect(evaluations).toHaveLength(3);
    expect(evaluations[0].evaluation.decisionScore).toBeGreaterThanOrEqual(evaluations[1].evaluation.decisionScore);
    expect(evaluations[1].evaluation.decisionScore).toBeGreaterThanOrEqual(evaluations[2].evaluation.decisionScore);
  });

  it("returns grounded insight text for stronger scenarios", () => {
    expect(
      generateInsight({
        foldScore: 0.82,
        stability: 0.73,
        riskScore: 0.18,
        constraints: {
          topologyStable: true,
          returnPathAvailable: true,
        },
      }),
    ).toContain("aligned");
  });

  it("evaluates the default intent scenario", () => {
    const intent = DEFAULT_INTENT_SCENARIO;
    const controls = mapPracticalInputsToEngine(intent.inputs);
    expect(controls.target).toHaveLength(3);
  });

  it("auto-ranks route variants from navigator inputs", () => {
    const baseline = evaluateEngineControls("Navigator Baseline", DEFAULT_MANUAL_CONTROLS);
    const routes = evaluateAutoRoutes(DEFAULT_MANUAL_CONTROLS);

    expect(routes).toHaveLength(6);
    expect(routes[0].evaluation.decisionScore).toBeGreaterThanOrEqual(routes[1].evaluation.decisionScore);
    expect(routes[0].evaluation.foldScore).toBeGreaterThanOrEqual(baseline.foldScore);
    expect(routes[0].evaluation.constraints.riskScore).toBeLessThanOrEqual(baseline.constraints.riskScore);
  });

  it("keeps practical and raw navigation controls synchronized", () => {
    const inferred = inferPracticalInputsFromEngine(DEFAULT_MANUAL_CONTROLS);
    const applied = applyPracticalInputsToControls(
      {
        ...inferred,
        alignment: 0.82,
        complexity: 0.44,
      },
      DEFAULT_MANUAL_CONTROLS,
    );

    expect(applied.coherence).toBeCloseTo(0.82);
    expect(applied.ethics).toBeCloseTo(0.64);
    expect(applied.energy).toBeCloseTo(0.58);
    expect(applied.target).toEqual(DEFAULT_MANUAL_CONTROLS.target);
  });

  it("optimizes the selected decision and intent baselines immediately", () => {
    const optimizedDecision = optimizeDecisionOption(DEFAULT_DECISION_OPTIONS[1]);
    const optimizedIntent = optimizeIntentScenario(DEFAULT_INTENT_SCENARIO);

    expect(optimizedDecision.option.overrides).toBeDefined();
    expect(optimizedDecision.summary?.routeName).toBeTruthy();
    expect(optimizedDecision.option.overrides?.target).toEqual(optimizedDecision.summary?.optimizedTarget);

    expect(optimizedIntent.intent.overrides).toBeDefined();
    expect(optimizedIntent.summary?.routeName).toBeTruthy();
    expect(optimizedIntent.intent.overrides?.target).toEqual(optimizedIntent.summary?.optimizedTarget);
  });

  it("optimizes navigation controls and matches presets deterministically", () => {
    const optimizedNavigation = optimizeManualControls(DEFAULT_MANUAL_CONTROLS);
    const preset = presets[0];
    const presetControls = {
      energy: preset.energy,
      curvature: preset.curvature,
      coherence: preset.coherence,
      ethics: preset.ethics,
      instability: preset.instability,
      eta: preset.eta,
      target: preset.target,
    };

    expect(optimizedNavigation.summary?.routeName).toBeTruthy();
    expect(findMatchingPresetId(presetControls, presets)).toBe(preset.id);
    expect(findMatchingPresetId({ ...presetControls, energy: presetControls.energy + 0.01 }, presets)).toBeNull();
  });
});
