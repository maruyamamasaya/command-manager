import { useEffect, useMemo, useState } from 'react';
import type { Category, CheatSheet, CheatSheetInput, TemplateVariable } from '../types';
import { detectTemplateVariables, normalizeTags } from '../utils';
type Props = { open: boolean; categories: Category[]; item?: CheatSheet; onClose: () => void; onSave: (input: CheatSheetInput) => Promise<void> };
export function EditDialog({ open, categories, item, onClose, onSave }: Props) {
  const [categoryId, setCategoryId] = useState(0); const [title, setTitle] = useState(''); const [description, setDescription] = useState(''); const [content, setContent] = useState(''); const [tags, setTags] = useState(''); const [variables, setVariables] = useState<TemplateVariable[]>([]); const [saving, setSaving] = useState(false);
  const detectedNames = useMemo(() => detectTemplateVariables(content), [content]);
  const detectedVariables = detectedNames.map((name, sortOrder) => variables.find((variable) => variable.name === name) ?? { name, defaultValue: '', description: '', sortOrder });
  useEffect(() => { if (open) { setCategoryId(item?.categoryId ?? categories[0]?.id ?? 0); setTitle(item?.title ?? ''); setDescription(item?.description ?? ''); setContent(item?.content ?? ''); setTags(item?.tags.join(', ') ?? ''); setVariables(item?.templateVariables ?? []); } }, [open, item, categories]);
  if (!open) return null;
  function updateVariable(name: string, changes: Partial<TemplateVariable>) { setVariables((current) => { const existing = current.find((variable) => variable.name === name) ?? { name, defaultValue: '', description: '', sortOrder: detectedNames.indexOf(name) }; return [...current.filter((variable) => variable.name !== name), { ...existing, ...changes }]; }); }
  async function submit(event: React.FormEvent) { event.preventDefault(); setSaving(true); try { await onSave({ id: item?.id, categoryId, title: title.trim(), description: description.trim(), content, tags: normalizeTags(tags), templateVariables: detectedVariables }); onClose(); } finally { setSaving(false); } }
  return <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><form className="modal" onSubmit={submit}>
    <h2>{item ? 'CheatSheetを編集' : '新しいCheatSheet'}</h2>
    <label>カテゴリ<select value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))} required>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
    <label>タイトル<input value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={120} autoFocus /></label>
    <label>説明<textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} /></label>
    <label>コマンド / 本文<textarea className="code-input" value={content} onChange={(e) => setContent(e.target.value)} rows={8} required /></label>
    {detectedVariables.length ? <section className="variable-editor" aria-label="検出された変数"><h3>検出された変数</h3>{detectedVariables.map((variable) => <div className="variable-row" key={variable.name}><strong>{variable.name}</strong><label>デフォルト値<input value={variable.defaultValue} onChange={(e) => updateVariable(variable.name, { defaultValue: e.target.value })} /></label><label>説明<input value={variable.description} onChange={(e) => updateVariable(variable.name, { description: e.target.value })} /></label><label>表示順<input type="number" min="0" value={variable.sortOrder} onChange={(e) => updateVariable(variable.name, { sortOrder: Number(e.target.value) })} /></label></div>)}<p className="secret-warning">パスワード・トークン等の秘密情報は保存しないでください。</p></section> : null}
    <label>タグ（カンマ区切り）<input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="git, status" /></label>
    <div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>キャンセル</button><button className="primary" disabled={saving || categories.length === 0}>{saving ? '保存中…' : '保存'}</button></div>
  </form></div>;
}
