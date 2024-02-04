import Header from './Header_';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import apiRequest from './apiRequest';
import React, { useState, useEffect } from 'react';

function App() {
	const API_URL = 'http://localhost:3500/items'
	const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);
	const [newItem, setNewItem] = useState('');
	const [search, setSearch] = useState('')
	const [fetchError, setFetchError] = useState(null);
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {

		const fetchItems = async () => {
			try {
				const response = await fetch(API_URL)
				if (!response.ok) throw Error('Did not received expected data')
				const listItems = await response.json();
				console.log(listItems);
				setItems(listItems)
				setFetchError(null);
			} catch (err){
				setFetchError(err.message)
			} finally{
				setIsLoading(false)
			}
		} 
		setTimeout( () =>{
			(async () => await fetchItems())();
		}, 2000)
	}, []) // asynchronous in nature, if it has dependency is will run at load time else will be loaded at any changes,
	// useEffect checks for dependency, if that changes then useEffect runs

	// const setAndSaveItems = (listItems) => {
	// 	setItems(listItems);
	// 	localStorage.setItem('shoppinglist', JSON.stringify(listItems))
	// } // making prgram more efficient

	const addItem = async (item) => {
		if (items.some(existingItem => existingItem.item === item)) {
			alert('Cannot add two same items!');
			return;
		}	
		const id = items.length ? items[items.length - 1].id + 1 : 1
		const MyNewItem = { id, checked: false, item };
		const listItems = [...items, MyNewItem];
		setItems(listItems);

		const postOptions = {
			method : 'POST',
			headers :{
				'Content-type' : 'application/json'
			},
			body : JSON.stringify(MyNewItem)
		}
		const result = await apiRequest(API_URL, postOptions)
		if (result) setFetchError(result);
	}
	

	const handleDelete = async (id) => {
		const listItems = items.filter((item) => item.id !== id);
		setItems(listItems);

		const deleteOptions = { method : 'DELETE'};
		const reqUrl = `${API_URL}/${id}`
		const result = await apiRequest(reqUrl, deleteOptions)
		if (result) setFetchError(result);
	}

	const handleCheck = async (id) => {
		const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked} : item);
		setItems(listItems);

		const myItem = listItems.filter((item) => item.id === id)
		const updateOptions = {
			method : 'PATCH',
			headers : {
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify({ checked : myItem[0].checked })
		};
		const reqUrl = `${API_URL}/${id}`
		const result = await apiRequest(reqUrl,updateOptions);
		if (result) setFetchError(result)
	}
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!newItem) return;
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
		<main>
			{isLoading && <p>Loading Items...</p>}
			{fetchError && <p style={{ color : 'red'}}>{`Error : ${fetchError}`}</p>}
			{
				!fetchError && !isLoading && <Content
					items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
					handleCheck = {handleCheck}
					handleDelete = {handleDelete}
				/>
			}
		</main>
		<Footer length={ items.length}/>
		</div>
	);
}

export default App;
