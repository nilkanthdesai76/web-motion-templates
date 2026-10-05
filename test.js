const fs = require("fs");
const path = require("path");
const assert = require("assert");

const components = [
  "MagneticButton.jsx",
  "GlowCard.jsx",
  "CommandPalette.jsx",
  "AnimatedTabs.jsx",
];

console.log("Running web-motion-templates validation...");

components.forEach((file) => {
  const filePath = path.join(__dirname, "src", "components", file);
  assert(fs.existsSync(filePath), `Component file missing: ${file}`);
  const content = fs.readFileSync(filePath, "utf-8");
  assert(content.length > 100, `Component file empty: ${file}`);
  assert(content.includes("export function"), `Export function missing in ${file}`);
  console.log(`✅ ${file} verified`);
});

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf-8"));
assert.strictEqual(pkg.name, "web-motion-templates");
console.log("✅ package.json verified");

console.log("\nAll 4 web-motion-templates validated successfully!");
