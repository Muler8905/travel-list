import './index.css';
import { useState } from 'react';

export default function App() {

  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter(item => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item))
  }
  function handleClearList(){
    const confirmed = window.confirm("Are you sure you want to delete all items?");
   if (confirmed) setItems([]);
  }

  return <div className="app">
    <Logo />
    <Form onAddItem={handleAddItems} />
    <PackingList 
    items={items}    
    onDeleteItem={handleDeleteItem}
    onToggleCheckItem={handleToggleItem}
    onClearList = {handleClearList} 
    />
    <Stats items={items} />
  </div>
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>
}


function Form({ onAddItem }) {
  const [description, setDescription] = useState(" ");
  const [quantity, setQuantity] = useState(1);

  function hundleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() }
    onAddItem(newItem);

    // console.log(newItem);
    setDescription("");
    setQuantity(1);
  }


  return <form className="add-form" onSubmit={hundleSubmit}>
    <h3> What Do You Need For Your 😎 Trip?</h3>
    <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
      {Array.from({ length: 20 }, (_, i) => i + 1).
        map(num => <option value={num} key={num}>{num}</option>)}
    </select>
    <input type="text" placeholder="Items..." required
      value={description} onChange={(e) => setDescription(e.target.value)} />
    <button>Add</button>
  </form>
}

function PackingList({ items, onDeleteItem, onToggleCheckItem, onClearList }) {
  const[sortBy, setSortBy] = useState('input');
  let sortedItems;
  if(sortBy == 'input') sortedItems = items;
  if(sortBy == 'description')sortedItems = items
  .slice()
  .sort((a,b) =>a.description.localeCompare(b.description));
  if(sortBy == 'packed')sortedItems = items
  .slice()
  .sort((a,b)=>Number(a.packed)- Number(b.packed));


  return <div className="list">
    <ul >
      <h3>{sortedItems.map((item) =>
        <Item item={item}
          key={item.id}
          onDeleteItem={onDeleteItem}
          onToggleCheckItem={onToggleCheckItem}
        />)}</h3>
    </ul>
    <div>
      <select value = {sortBy} onChange ={(e) => setSortBy(e.target.value)}>
        <option value="input" >Sort by input order</option>
        <option value="description" >Sort by description</option>
        <option value="packed" >Sort by packed status</option>
      </select>    
    </div>
    <button className="clear-List-btn"  onClick ={onClearList}>Clear lists</button>
     </div>
}

function Item({ item, onDeleteItem, onToggleCheckItem}) {
  return <li>
    <input type="checkbox" value={item.packed}
      onChange={() => onToggleCheckItem(item.id)} />
    <span style={item.packed ? { textDecoration: "line-through" } : {}}>
      {item.quantity} {item.description}
    </span>
    < button onClick={() => onDeleteItem(item.id)}>❌</button>
  </li>
}
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats"><em>Start adding some items to your pack list 🚀.</em></p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return <footer className="stats">
    <em>
      {percentage === 100 ? "You got everything! Ready to go ✈" : `
       You have ${numItems} items on list, And You already packed 
       ${numPacked} (${percentage}%).`}</em>
  </footer>
}