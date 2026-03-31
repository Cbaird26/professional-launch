import { describe, expect, it } from "vitest";
import { ABOUT_SECTIONS, APP_BRAND, LEGAL_DOCUMENTS, MANUAL_SECTIONS } from "./content.js";

describe("launch content", () => {
  it("defines grounded foundation hierarchy copy", () => {
    expect(APP_BRAND.foundationName).toBe("Theory of Everything Foundation");
    expect(APP_BRAND.intelligenceName).toBe("ZoraASI");
    expect(APP_BRAND.engineName).toBe("Zora");
  });

  it("includes manual, about, and legal sections needed for launch", () => {
    expect(MANUAL_SECTIONS.length).toBeGreaterThanOrEqual(8);
    expect(ABOUT_SECTIONS.some((section) => section.title === "Support")).toBe(true);
    expect(LEGAL_DOCUMENTS.map((document) => document.title)).toEqual([
      "Privacy Policy",
      "Terms of Use",
      "User Agreement",
      "Safety and Disclaimers",
      "Rights, Credits, and Intellectual Property",
    ]);
  });
});
