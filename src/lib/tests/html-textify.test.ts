// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { transformHtmlToIndentedText } from "../../../src/lib/html-textify";

describe("html textification", () => {
  it("builds depth-indented tree output", () => {
    const html = "<div>a<div>b<div>e</div><div>f</div></div><div>c<div>d</div></div></div>";
    const result = transformHtmlToIndentedText(html);
    expect(result).toContain("a");
    expect(result).toContain("-- b");
    expect(result).toContain("---- e");
    expect(result).toContain("-- c");
  });

  it("drops empty wrapper-only chains", () => {
    const html = "<div><div><div><div>leaf</div></div></div></div>";
    const result = transformHtmlToIndentedText(html);
    expect(result).toBe("leaf");
  });

  it("social post + comment keeps thread hierarchy", () => {
    const html = `
      <div>
        <div>
          <div>PersonA</div>
          <div>Title at CompanyA</div>
          <div>Post message phrase.</div>
        </div>
        <div>
          <div>PersonB</div>
          <div>Title at CompanyB</div>
          <div>Reply message phrase.</div>
        </div>
      </div>
    `;
    const result = transformHtmlToIndentedText(html);
    expect(result).toContain("PersonA");
    expect(result).toContain("Title at CompanyA");
    expect(result).toContain("Post message phrase.");
    expect(result).toContain("PersonB");
    expect(result).toContain("Title at CompanyB");
    expect(result).toContain("Reply message phrase.");
  });

  it("github-like profile groups nearby lines", () => {
    const html = `
      <div>
        <div>PersonC</div>
        <div>personc</div>
        <div>Edit profile</div>
        <div>404 followers</div>
        <div>656 following</div>
        <div>Location</div>
        <div>personc@example.com</div>
      </div>
    `;
    const result = transformHtmlToIndentedText(html);
    expect(result).toContain("PersonC");
    expect(result).toContain("personc");
    expect(result).toContain("Edit profile");
    expect(result).toContain("404 followers");
    expect(result).toContain("656 following");
    expect(result).toContain("Location");
    expect(result).toContain("personc@example.com");
  });
});
