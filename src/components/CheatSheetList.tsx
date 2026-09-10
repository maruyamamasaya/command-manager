import { Copy, FileCode2 } from 'lucide-react';
import type { CheatSheet } from '../types';
import { detectTemplateVariables } from '../utils';
type Props = { items: CheatSheet[]; selectedId?: number; onSelect: (item: CheatSheet) => void; onCopy: (item: CheatSheet) => void };
export function CheatSheetList({ items, selectedId, onSelect, onCopy }: Props) {
  return <section className="list-panel" aria-label="CheatSheet一覧">
    <div className="list-heading"><strong>{items.length} 件</strong><span>更新順</span></div>
    <div className="cards">{items.length === 0 ? <div className="empty"><FileCode2 size={30} /><p>該当するCheatSheetはありません</p></div> : items.map((item) =>
      <article key={item.id} className={`card ${selectedId === item.id ? 'selected' : ''}`} onClick={() => onSelect(item)}>
        <div className="card-top"><div className="badges"><span className="category-badge">{item.categoryName}</span>{detectTemplateVariables(item.content).length ? <span className="template-badge">変数 {detectTemplateVariables(item.content).length}</span> : null}</div><button className="copy-button" onClick={(event) => { event.stopPropagation(); onCopy(item); }}><Copy size={14} /> Copy</button></div>
        <h2>{item.title}</h2><p>{item.description || '説明はありません'}</p>
        <div className="tags">{item.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
      </article>)}</div>
  </section>;
}
