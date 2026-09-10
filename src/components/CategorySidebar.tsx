import { Folder, Plus, Trash2 } from 'lucide-react';
import type { Category } from '../types';

type Props = { categories: Category[]; selected?: number; onSelect: (id?: number) => void; onAdd: () => void; onDelete: (category: Category) => void };
export function CategorySidebar({ categories, selected, onSelect, onAdd, onDelete }: Props) {
  return <aside className="sidebar">
    <div className="brand"><span className="brand-mark">›_</span><span>CheatSheet</span></div>
    <div className="section-title"><span>カテゴリ</span><button className="icon-button" onClick={onAdd} aria-label="カテゴリを追加"><Plus size={16} /></button></div>
    <nav aria-label="カテゴリ">
      <button className={`category ${selected === undefined ? 'active' : ''}`} onClick={() => onSelect(undefined)}><Folder size={16} />すべて</button>
      {categories.map((category) => <div className="category-row" key={category.id}>
        <button className={`category ${selected === category.id ? 'active' : ''}`} onClick={() => onSelect(category.id)}><Folder size={16} />{category.name}</button>
        <button className="category-delete" onClick={() => onDelete(category)} aria-label={`${category.name}を削除`}><Trash2 size={14} /></button>
      </div>)}
    </nav>
    <p className="local-note">● ローカルデータのみ</p>
  </aside>;
}
