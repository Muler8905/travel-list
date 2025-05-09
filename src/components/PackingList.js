import { useState } from 'react';
import  Item  from './Item.js';

export default function PackingList({ items, onDeleteItem, onToggleCheckItem, onClearList }) {
  const [sortBy, setSortBy] = useState('input');
  let sortedItems;
  if (sortBy == 'input') sortedItems = items;
  if (sortBy == 'description') sortedItems = items
    .slice()
    .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy == 'packed') sortedItems = items
    .slice()
    .sort((a, b) => Number(a.packed) - Number(b.packed));

  return <div className="list">
    <ul>
      <h3>{sortedItems.map((item) => <Item item={item}
        key={item.id}
        onDeleteItem={onDeleteItem}
        onToggleCheckItem={onToggleCheckItem} />)}</h3>
    </ul>
    <div>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="input">Sort by input order</option>
        <option value="description">Sort by description</option>
        <option value="packed">Sort by packed status</option>
      </select>
    </div>
    <button className="clear-List-btn" onClick={onClearList}>Clear lists</button>
  </div>;
}
