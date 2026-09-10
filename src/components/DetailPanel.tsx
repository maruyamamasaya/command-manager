import { Copy, Pencil, Trash2 } from 'lucide-react';
import type { CheatSheet } from '../types';
import { detectTemplateVariables } from '../utils';
type Props = { item?: CheatSheet; onCopy: (item: CheatSheet) => void; onEdit: (item: CheatSheet) => void; onDelete: (item: CheatSheet) => void };
export function DetailPanel({ item, onCopy, onEdit, onDelete }: Props) {
  if (!item) return <aside className="detail empty-detail"><p>項目を選択すると詳細が表示されます</p></aside>;
  return <aside className="detail">
    <div className="detail-actions"><button className="secondary" onClick={() => onEdit(item)}><Pencil size={15} />編集</button><button className="danger-text" onClick={() => onDelete(item)}><Trash2 size={15} />削除</button></div>
    <div className="badges"><span className="category-badge">{item.categoryName}</span>{detectTemplateVariables(item.content).length ? <span className="template-badge">Template · 変数 {detectTemplateVariables(item.content).length}</span> : null}</div><h1>{item.title}</h1><p className="description">{item.description || '説明はありません'}</p>
    <div className="code-heading"><span>コマンド / 本文</span><button className="copy-button prominent" onClick={() => onCopy(item)}><Copy size={15} />コピー</button></div>
    <pre><code>{item.content}</code></pre>
    <div className="tags detail-tags">{item.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
    <p className="timestamp">更新: {new Date(item.updatedAt).toLocaleString('ja-JP')}</p>
  </aside>;
}
