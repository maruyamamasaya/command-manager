export function normalizeTags(value: string): string[] {
  return [...new Set(value.split(',').map((tag) => tag.trim()).filter(Boolean))];
}

const templateVariablePattern = /\{\{([A-Z][A-Z0-9_]*)\}\}/g;

export function detectTemplateVariables(content: string): string[] {
  return [...new Set([...content.matchAll(templateVariablePattern)].map((match) => match[1]))];
}

export function detectTemplateVariablesInContents(contents: string[]): string[] {
  return [...new Set(contents.flatMap(detectTemplateVariables))];
}

export function expandTemplate(content: string, values: Record<string, string>): string {
  return content.replace(templateVariablePattern, (placeholder, name: string) =>
    Object.prototype.hasOwnProperty.call(values, name) ? values[name] : placeholder,
  );
}
