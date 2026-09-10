export function normalizeTags(value: string): string[] {
  return [...new Set(value.split(',').map((tag) => tag.trim()).filter(Boolean))];
}

const templateVariablePattern = /\{\{([A-Z][A-Z0-9_]*)\}\}/g;

export function detectTemplateVariables(content: string): string[] {
  return [...new Set([...content.matchAll(templateVariablePattern)].map((match) => match[1]))];
}

export function expandTemplate(content: string, values: Record<string, string>): string {
  return content.replace(templateVariablePattern, (placeholder, name: string) =>
    Object.prototype.hasOwnProperty.call(values, name) ? values[name] : placeholder,
  );
}
