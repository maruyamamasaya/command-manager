import { useCallback, useEffect, useState } from 'react';
import { Download, Minus, Moon, Plus, Search, Sun, Trash2, Upload } from 'lucide-react';
import { open, save } from '@tauri-apps/plugin-dialog';
import { api } from './api';
import type { Category, CheatSheet, CheatSheetInput } from './types';
import { CategorySidebar } from './components/CategorySidebar';
import { CheatSheetList } from './components/CheatSheetList';
import { DetailPanel } from './components/DetailPanel';
import { EditDialog } from './components/EditDialog';
import { TemplateCopyDialog } from './components/TemplateCopyDialog';
import { detectTemplateVariables } from './utils';

export default function App() {
  const [categories, setCategories] = useState<Category[]>([]); const [items, setItems] = useState<CheatSheet[]>([]); const [query, setQuery] = useState(''); const [categoryId, setCategoryId] = useState<number>(); const [selected, setSelected] = useState<CheatSheet>(); const [editing, setEditing] = useState<CheatSheet | undefined>(); const [dialogOpen, setDialogOpen] = useState(false); const [toast, setToast] = useState(''); const [error, setError] = useState('');
  const [copyTemplate, setCopyTemplate] = useState<CheatSheet>();
  const [theme, setTheme] = useState<'dark' | 'light'>(() => localStorage.getItem('theme') === 'light' ? 'light' : 'dark');
  const [zoom, setZoom] = useState(() => Math.min(140, Math.max(80, Number(localStorage.getItem('zoom')) || 100)));
  const notify = useCallback((message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2200); }, []);
  const refresh = useCallback(async () => { try { const [nextCategories, nextItems] = await Promise.all([api.categories(), api.cheatsheets(query, categoryId)]); setCategories(nextCategories); setItems(nextItems); setSelected((current) => nextItems.find((item) => item.id === current?.id) ?? nextItems[0]); setError(''); } catch (e) { setError(String(e)); } }, [query, categoryId]);
  useEffect(() => { const timer = window.setTimeout(refresh, 120); return () => clearTimeout(timer); }, [refresh]);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('theme', theme); }, [theme]);
  useEffect(() => { document.documentElement.style.setProperty('--app-zoom', String(zoom / 100)); localStorage.setItem('zoom', String(zoom)); }, [zoom]);
  async function copyContent(content: string) { try { await navigator.clipboard.writeText(content); notify('コピーしました'); } catch { setError('クリップボードへコピーできませんでした'); throw new Error('clipboard'); } }
  function copy(item: CheatSheet) { if (detectTemplateVariables(item.content).length) setCopyTemplate(item); else void copyContent(item.content); }
  async function addCategory() { const name = window.prompt('新しいカテゴリ名'); if (!name?.trim()) return; try { const created = await api.createCategory(name.trim()); await refresh(); setCategoryId(created.id); notify('カテゴリを作成しました'); } catch (e) { setError(String(e)); } }
  async function deleteCategory(category: Category) { if (!window.confirm(`カテゴリ「${category.name}」を削除しますか？\n項目があるカテゴリは削除できません。`)) return; try { await api.deleteCategory(category.id); if (categoryId === category.id) setCategoryId(undefined); await refresh(); notify('カテゴリを削除しました'); } catch (e) { setError(String(e)); } }
  async function persist(input: CheatSheetInput) { const saved = await api.save(input); await refresh(); setSelected(saved); notify(input.id ? '更新しました' : '保存しました'); }
  async function remove(item: CheatSheet) { if (!window.confirm(`「${item.title}」を削除しますか？`)) return; try { await api.remove(item.id); await refresh(); notify('削除しました'); } catch (e) { setError(String(e)); } }
  async function removeVisible() { if (!items.length || !window.confirm(`現在表示中のCheatSheet ${items.length}件をすべて削除しますか？\nこの操作は元に戻せません。`)) return; try { const deleted = await api.removeMany(items.map((item) => item.id)); await refresh(); notify(`${deleted}件を削除しました`); } catch (e) { setError(String(e)); } }
  async function exportData() { const path = await save({ defaultPath: 'cheatsheet-backup.json', filters: [{ name: 'JSON', extensions: ['json'] }] }); if (path) { await api.exportJson(path); notify('JSONを書き出しました'); } }
  async function importData() { const path = await open({ multiple: false, filters: [{ name: 'JSON', extensions: ['json'] }] }); if (typeof path === 'string' && window.confirm('現在のデータにJSONの内容を追加します。続けますか？')) { await api.importJson(path); await refresh(); notify('JSONを読み込みました'); } }
  return <div className="app-shell">
    <CategorySidebar categories={categories} selected={categoryId} onSelect={setCategoryId} onAdd={addCategory} onDelete={deleteCategory} />
    <main className="workspace"><header><div className="search"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="タイトル、説明、コマンド、タグ、カテゴリを検索" aria-label="検索" /></div><div className="header-actions"><div className="view-controls" aria-label="表示設定"><button className="icon-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title={`${theme === 'dark' ? 'ライト' : 'ダーク'}テーマに変更`} aria-label={`${theme === 'dark' ? 'ライト' : 'ダーク'}テーマに変更`}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}</button><button className="icon-button" onClick={() => setZoom((value) => Math.max(80, value - 10))} disabled={zoom <= 80} title="縮小" aria-label="表示を縮小"><Minus size={15} /></button><button className="zoom-value" onClick={() => setZoom(100)} title="100%に戻す">{zoom}%</button><button className="icon-button" onClick={() => setZoom((value) => Math.min(140, value + 10))} disabled={zoom >= 140} title="拡大" aria-label="表示を拡大"><Plus size={15} /></button></div><button className="secondary compact bulk-delete" onClick={removeVisible} disabled={!items.length} title="表示中のCheatSheetを一括削除"><Trash2 size={15} />一括削除</button><button className="secondary compact" onClick={importData}><Upload size={15} />Import</button><button className="secondary compact" onClick={exportData}><Download size={15} />Export</button><button className="primary" onClick={() => { setEditing(undefined); setDialogOpen(true); }} disabled={!categories.length}><Plus size={17} />新規作成</button></div></header>
      {error ? <div className="error" role="alert">{error}<button onClick={() => setError('')}>×</button></div> : null}
      <div className="content-grid"><CheatSheetList items={items} selectedId={selected?.id} onSelect={setSelected} onCopy={copy} /><DetailPanel item={selected} onCopy={copy} onEdit={(item) => { setEditing(item); setDialogOpen(true); }} onDelete={remove} /></div>
    </main>
    <EditDialog open={dialogOpen} categories={categories} item={editing} onClose={() => setDialogOpen(false)} onSave={persist} />
    <TemplateCopyDialog item={copyTemplate} onClose={() => setCopyTemplate(undefined)} onCopy={copyContent} />
    {toast ? <div className="toast" role="status">✓ {toast}</div> : null}
  </div>;
}
