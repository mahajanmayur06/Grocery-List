import Header from './Header_';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import React, { useState } from 'react';

function App() {
	const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));
	const [newItem, setNewItem] = useState('');
	const [search, setSearch] = useState('')

	const setAndSaveItems = (listItems) => {
		setItems(listItems);
		localStorage.setItem('shoppinglist', JSON.stringify(listItems))
	}

	const addItem = (item) => {
		// if (items.some(existingItem => existingItem.item === item)) {
		// 	alert('Cannot add two same items!');
		// 	return;
		// }	
		const id = items.length ? items[items.length - 1].id + 1 : 1
		const MyNewItem = { id, checked: false, item };
		const updatedItems = [...items, MyNewItem];
		setAndSaveItems(updatedItems);
	}
	

	const handleDelete = (id) => {
		const listItems = items.filter((item) => item.id !== id);
		setAndSaveItems(listItems);
	}

	const handleCheck = (id) => {
		const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked} : item);
		setAndSaveItems(listItems);
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!newItem) return;
		console.log(newItem);
		addItem(newItem)// addItem
		setNewItem('');
	}
	return (
		<div className="App">
		<Header title= "Grocery List"/>
		<AddItem
			newItem = {newItem}
			setNewItem = {setNewItem}
			handleSubmit={handleSubmit}
		/>
		<SearchItem
			search = {search}
			setSearch = {setSearch}
		/>
		<Content
			items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
			handleCheck = {handleCheck}
			handleDelete = {handleDelete}
		/>
		<Footer length={ items.length}/>
		</div>
	);
}

export default App;
