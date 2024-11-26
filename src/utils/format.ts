export function formatCode(codeLines: string[]) {
  return codeLines
    .map((line, index) => {
      const finalLine = line.trim();
      // Basic indentation logic
      if (line.includes("{")) {
        return finalLine;
      }
      if (line.includes("}")) {
        return finalLine;
      }
      return `${finalLine}`;
    })
    .join("\n");
}
