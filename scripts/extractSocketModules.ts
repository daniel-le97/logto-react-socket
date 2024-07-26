import * as fs from "fs";

export function extractDeclaredModules(filePath: string) {
  try {
    let content = "";
    if (!fs.existsSync(filePath)) {
      throw new Error("unable to find file: " + filePath);
    }

    content = fs.readFileSync(filePath, "utf-8");
    // Regular expression to match module declarations
    const moduleRegex = /declare\s+module\s+['"]([^'"]+)['"]\s*\{/g;

    // Array to store matched modules
    const declaredModules: string[] = [];

    // Extract all module declarations
    let match;
    while ((match = moduleRegex.exec(content)) !== null) {
      declaredModules.push(match[1]);
    }

    fs.writeFileSync(
      "./node_modules/.tmp/externals.json",
      JSON.stringify(declaredModules, null, 2)
    );
    return declaredModules;
  } catch (err) {
    console.error("Error reading or parsing file:", err);
    return [];
  }
}

extractDeclaredModules("./node_modules/@socketsupply/socket/index.d.ts");
