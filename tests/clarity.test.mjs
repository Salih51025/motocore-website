import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), "utf8");
}

test("3-second clarity: TR hero contains core understanding signals", () => {
  const tr = read("src/content/i18n/tr.ts");
  const required = [
    "DİJİTAL MOTOSİKLET GARAJI",
    "MotoCore",
    "Motosikletin için kişisel dijital garaj.",
    "Konsept vitrin • Uygulama geliştirme aşamasında",
    "3D garajda incele",
    "Renk ve parça kişiselleştir",
    "Bakım takibini planla",
  ];
  for (const signal of required) {
    assert.ok(tr.includes(signal), `TR hero missing clarity signal: ${signal}`);
  }
});

test("3-second clarity: EN hero contains core understanding signals", () => {
  const en = read("src/content/i18n/en.ts");
  const required = [
    "DIGITAL MOTORCYCLE GARAGE",
    "MotoCore",
    "A personal digital garage for your motorcycle.",
    "Concept showcase • App in development",
    "Inspect in a 3D garage",
    "Customize colors and parts",
    "Plan maintenance tracking",
  ];
  for (const signal of required) {
    assert.ok(en.includes(signal), `EN hero missing clarity signal: ${signal}`);
  }
});

test("3-second clarity: hero UI renders status and clarity points", () => {
  const hero = read("src/components/sections/home/HeroSection.tsx");
  assert.ok(hero.includes("hero.status"), "HeroSection should render hero.status");
  assert.ok(hero.includes("hero.clarityPoints"), "HeroSection should render hero.clarityPoints");
  assert.ok(hero.includes("status-dot"), "HeroSection should include status indicator styling hook");
  assert.ok(hero.includes("What MotoCore offers") || hero.includes("aria-label"), "Hero clarity strip should have accessible labeling");
});

test("3-second clarity: audit model exists for both locales", () => {
  const clarity = read("src/content/clarity.ts");
  assert.ok(clarity.includes("tr:"), "clarity audit should define TR");
  assert.ok(clarity.includes("en:"), "clarity audit should define EN");
  assert.ok(clarity.includes("requiredHeroSignals"), "clarity audit should define required hero signals");
  assert.ok(clarity.includes("getClarityAudit"), "clarity audit should export getter");
});
