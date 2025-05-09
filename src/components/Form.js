import { useState } from 'react';

export default function Form({ onAddItem }) {
  const [description, setDescription] = useState(" ");
  const [quantity, setQuantity] = useState(1);

  function hundleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
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
  </form>;
}
