import { useCallback, useEffect, useState } from 'react';
import { Download, Plus, Search, Upload } from 'lucide-react';
import { open, save } from '@tauri-apps/plugin-dialog';
import { api } from './api';
import type { Category, CheatSheet, CheatSheetInput } from './types';
import { CategorySidebar } from './components/CategorySidebar';
import { CheatSheetList } from './components/CheatSheetList';
import { DetailPanel } from './components/DetailPanel';
import { EditDialog } from './components/EditDialog';

export default function App() {
  const [categories, setCategories] = useState<Category[]>([]); const [items, setItems] = useState<CheatSheet[]>([]); const [query, setQuery] = useState(''); const [categoryId, setCategoryId] = useState<number>(); const [selected, setSelected] = useState<CheatSheet>(); const [editing, setEditing] = useState<CheatSheet | undefined>(); const [dialogOpen, setDialogOpen] = useState(false); const [toast, setToast] = useState(''); const [error, setError] = useState('');
  const notify = useCallback((message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2200); }, []);
  const refresh = useCallback(async () => { try { const [nextCategories, nextItems] = await Promise.all([api.categories(), api.cheatsheets(query, categoryId)]); setCategories(nextCategories); setItems(nextItems); setSelected((current) => nextItems.find((item) => item.id === current?.id) ?? nextItems[0]); setError(''); } catch (e) { setError(String(e)); } }, [query, categoryId]);
  useEffect(() => { const timer = window.setTimeout(refresh, 120); return () => clearTimeout(timer); }, [refresh]);
  async function copy(item: CheatSheet) { try { await navigator.clipboard.writeText(item.content); notify('コピーしました'); } catch { setError('クリップボードへコピーできませんでした'); } }
  async function addCategory() { const name = window.prompt('新しいカテゴリ名'); if (!name?.trim()) return; try { const created = await api.createCategory(name.trim()); await refresh(); setCategoryId(created.id); notify('カテゴリを作成しました'); } catch (e) { setError(String(e)); } }
  async function deleteCategory(category: Category) { if (!window.confirm(`カテゴリ「${category.name}」を削除しますか？\n項目があるカテゴリは削除できません。`)) return; try { await api.deleteCategory(category.id); if (categoryId === category.id) setCategoryId(undefined); await refresh(); notify('カテゴリを削除しました'); } catch (e) { setError(String(e)); } }
  async function persist(input: CheatSheetInput) { const saved = await api.save(input); await refresh(); setSelected(saved); notify(input.id ? '更新しました' : '保存しました'); }
  async function remove(item: CheatSheet) { if (!window.confirm(`「${item.title}」を削除しますか？`)) return; try { await api.remove(item.id); await refresh(); notify('削除しました'); } catch (e) { setError(String(e)); } }
  async function exportData() { const path = await save({ defaultPath: 'cheatsheet-backup.json', filters: [{ name: 'JSON', extensions: ['json'] }] }); if (path) { await api.exportJson(path); notify('JSONを書き出しました'); } }
  async function importData() { const path = await open({ multiple: false, filters: [{ name: 'JSON', extensions: ['json'] }] }); if (typeof path === 'string' && window.confirm('現在のデータにJSONの内容を追加します。続けますか？')) { await api.importJson(path); await refresh(); notify('JSONを読み込みました'); } }
  return <div className="app-shell">
    <CategorySidebar categories={categories} selected={categoryId} onSelect={setCategoryId} onAdd={addCategory} onDelete={deleteCategory} />
    <main className="workspace"><header><div className="search"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="タイトル、説明、コマンド、タグ、カテゴリを検索" aria-label="検索" /></div><div className="header-actions"><button className="secondary compact" onClick={importData}><Upload size={15} />Import</button><button className="secondary compact" onClick={exportData}><Download size={15} />Export</button><button className="primary" onClick={() => { setEditing(undefined); setDialogOpen(true); }} disabled={!categories.length}><Plus size={17} />新規作成</button></div></header>
      {error ? <div className="error" role="alert">{error}<button onClick={() => setError('')}>×</button></div> : null}
      <div className="content-grid"><CheatSheetList items={items} selectedId={selected?.id} onSelect={setSelected} onCopy={copy} /><DetailPanel item={selected} onCopy={copy} onEdit={(item) => { setEditing(item); setDialogOpen(true); }} onDelete={remove} /></div>
    </main>
    <EditDialog open={dialogOpen} categories={categories} item={editing} onClose={() => setDialogOpen(false)} onSave={persist} />
    {toast ? <div className="toast" role="status">✓ {toast}</div> : null}
  </div>;
}
