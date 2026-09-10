export type Category = { id: number; name: string; sortOrder: number; createdAt: string };
export type TemplateVariable = { id?: number; name: string; defaultValue: string; description: string; sortOrder: number };
export type CheatSheetType = 'single' | 'command_set';
export type CheatSheetStep = { id?: number; cheatsheetId?: number; sortOrder: number; title: string; description: string; content: string };
export type CheatSheet = { id: number; categoryId: number; categoryName: string; title: string; description: string; type: CheatSheetType; content: string; steps: CheatSheetStep[]; tags: string[]; templateVariables: TemplateVariable[]; createdAt: string; updatedAt: string };
export type CheatSheetInput = { id?: number; categoryId: number; title: string; description: string; type: CheatSheetType; content: string; steps: CheatSheetStep[]; tags: string[]; templateVariables: TemplateVariable[] };
