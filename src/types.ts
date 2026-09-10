export type Category = { id: number; name: string; sortOrder: number; createdAt: string };
export type CheatSheet = { id: number; categoryId: number; categoryName: string; title: string; description: string; content: string; tags: string[]; createdAt: string; updatedAt: string };
export type CheatSheetInput = { id?: number; categoryId: number; title: string; description: string; content: string; tags: string[] };
