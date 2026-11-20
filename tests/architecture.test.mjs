import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), "utf8");
}

test("architecture: localized home routes use shared LocalizedHomeScreen", () => {
  const trPage = read("src/app/(tr)/tr/page.tsx");
  const enPage = read("src/app/(en)/en/page.tsx");
  assert.match(trPage, /LocalizedHomeScreen/, "TR home should use LocalizedHomeScreen");
  assert.match(enPage, /LocalizedHomeScreen/, "EN home should use LocalizedHomeScreen");
  assert.ok(fs.existsSync(path.join(root, "src/components/layout/LocalizedHomeScreen.tsx")), "LocalizedHomeScreen component should exist");
});

test("architecture: hero type includes clarity fields", () => {
  const types = read("src/types/i18n.ts");
  assert.ok(types.includes("status: string;"), "hero type should include status");
  assert.ok(types.includes("clarityPoints: string[];"), "hero type should include clarityPoints");
});

test("design system: futuristic visual hooks are present", () => {
  const css = read("src/app/globals.css");
  for (const token of [".aurora-orb", ".scanline-overlay", ".future-card", ".status-dot", "@keyframes aurora-float"]) {
    assert.ok(css.includes(token), `globals.css missing futuristic token: ${token}`);
  }
});

test("i18n: dictionaries keep required top-level sections", () => {
  for (const file of ["src/content/i18n/tr.ts", "src/content/i18n/en.ts"]) {
    const content = read(file);
    for (const key of ["meta:", "nav:", "footer:", "home:", "legal:", "notFound:"]) {
      assert.ok(content.includes(key), `${file} missing section ${key}`);
    }
  }
});

test("seo/content: site metadata and routes are configured", () => {
  const seo = read("src/lib/seo.ts");
  const site = read("src/content/site.ts");
  assert.ok(seo.includes("createPageMetadata"), "seo helper should export createPageMetadata");
  assert.ok(site.includes("MotoCore"), "site config should define MotoCore");
  assert.ok(site.includes("localizedRoutes"), "site config should define localizedRoutes");
});
