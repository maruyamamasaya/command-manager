import { useEffect, useState } from 'react';
import type { Category, CheatSheet, CheatSheetInput } from '../types';
import { normalizeTags } from '../utils';
type Props = { open: boolean; categories: Category[]; item?: CheatSheet; onClose: () => void; onSave: (input: CheatSheetInput) => Promise<void> };
export function EditDialog({ open, categories, item, onClose, onSave }: Props) {
  const [categoryId, setCategoryId] = useState(0); const [title, setTitle] = useState(''); const [description, setDescription] = useState(''); const [content, setContent] = useState(''); const [tags, setTags] = useState(''); const [saving, setSaving] = useState(false);
  useEffect(() => { if (open) { setCategoryId(item?.categoryId ?? categories[0]?.id ?? 0); setTitle(item?.title ?? ''); setDescription(item?.description ?? ''); setContent(item?.content ?? ''); setTags(item?.tags.join(', ') ?? ''); } }, [open, item, categories]);
  if (!open) return null;
  async function submit(event: React.FormEvent) { event.preventDefault(); setSaving(true); try { await onSave({ id: item?.id, categoryId, title: title.trim(), description: description.trim(), content, tags: normalizeTags(tags) }); onClose(); } finally { setSaving(false); } }
  return <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><form className="modal" onSubmit={submit}>
    <h2>{item ? 'CheatSheetを編集' : '新しいCheatSheet'}</h2>
    <label>カテゴリ<select value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))} required>{categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
    <label>タイトル<input value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={120} autoFocus /></label>
    <label>説明<textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} /></label>
    <label>コマンド / 本文<textarea className="code-input" value={content} onChange={(e) => setContent(e.target.value)} rows={8} required /></label>
    <label>タグ（カンマ区切り）<input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="git, status" /></label>
    <div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>キャンセル</button><button className="primary" disabled={saving || categories.length === 0}>{saving ? '保存中…' : '保存'}</button></div>
  </form></div>;
}
