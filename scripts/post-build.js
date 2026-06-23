import fs from "fs";
import path from "path";

const distIndexDts = path.resolve("dist/index.d.ts");
const content = 'export * from "./src/index";\n';

try {
  fs.writeFileSync(distIndexDts, content, "utf-8");
  console.log("✓ Root TypeScript entry created at dist/index.d.ts");
} catch (error) {
  console.error("✗ Error writing root declaration file:", error.message);
  process.exit(1);
}
