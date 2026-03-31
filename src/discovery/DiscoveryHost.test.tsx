import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import DiscoveryHost from "./DiscoveryHost";

describe("DiscoveryHost", () => {
  it("renders the shared ZoraASI Bridge wrapper for every imported mode", () => {
    const decision = renderToStaticMarkup(<DiscoveryHost mode="DECISION" />);
    const intent = renderToStaticMarkup(<DiscoveryHost mode="INTENT" />);
    const navigation = renderToStaticMarkup(<DiscoveryHost mode="NAVIGATION" />);
    const autopilot = renderToStaticMarkup(<DiscoveryHost mode="AUTOPILOT" />);
    const research = renderToStaticMarkup(<DiscoveryHost mode="RESEARCH" />);

    expect(decision).toContain("ZoraASI Bridge");
    expect(decision).toContain("Professional Launch");
    expect(decision).toContain("Coherence Engine Warp Core");
    expect(decision).toContain("Option A");
    expect(decision).toContain("Target X");
    expect(decision).toContain("Autopilot Optimize");

    expect(intent).toContain("Target Outcome");
    expect(intent).toContain("Future Viability");
    expect(intent).toContain("Target Z");
    expect(intent).toContain("Autopilot Optimize");

    expect(navigation).toContain("Target X");
    expect(navigation).toContain("Target Y");
    expect(navigation).toContain("Target Z");
    expect(navigation).toContain("Alignment");
    expect(navigation).toContain("Autopilot Optimize");

    expect(autopilot).toContain("Navigator Inputs");
    expect(autopilot).toContain("Top Rank");
    expect(autopilot).toContain("Apply Route");
    expect(autopilot).toContain("Navigator Presets");
    expect(autopilot).toContain("Route Deck Baseline");
    expect(autopilot).toContain("Generated Route Deck");
    expect(autopilot).toContain("Apply Top Route");
    expect(autopilot).toContain("Selected: Custom");

    expect(research).toContain("Quick Sweep");
    expect(research).toContain("Alignment");
    expect(research).toContain("Research Mapping");
    expect(research).toContain("Autopilot Optimize");
    expect(research).toContain("No recorded runs yet.");
    expect(research).toContain("Experimental Visibility");
  });
});
