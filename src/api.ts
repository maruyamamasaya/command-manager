import { invoke } from '@tauri-apps/api/core';
import type { Category, CheatSheet, CheatSheetInput } from './types';

export const api = {
  categories: () => invoke<Category[]>('list_categories'),
  createCategory: (name: string) => invoke<Category>('create_category', { name }),
  deleteCategory: (id: number) => invoke<void>('delete_category', { id }),
  cheatsheets: (query = '', categoryId?: number) => invoke<CheatSheet[]>('list_cheatsheets', { query, categoryId }),
  save: (input: CheatSheetInput) => invoke<CheatSheet>('save_cheatsheet', { input }),
  remove: (id: number) => invoke<void>('delete_cheatsheet', { id }),
  exportJson: (path: string) => invoke<void>('export_json', { path }),
  importJson: (path: string) => invoke<void>('import_json', { path }),
};
