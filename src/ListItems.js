import React, { Component } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { FaCheckCircle, FaPlus, FaTrash } from 'react-icons/fa';
import './ListItems.css';
import firebase from '@firebase/app';
import Button from './components/CustomButtons/Button.js';

class ListItems extends Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
			newItem: '',
			docPrefixName: props.docPrefixName,
			collection: firebase.firestore().collection(props.collectionName)
		};

		this.updateInput = this.updateInput.bind(this);
	}

	componentDidMount() {
		this.setState({ list: this.props.items.sort(this.compare) });
	}

	compare = function(a, b) {
		// Use toUpperCase() to ignore character casing
		const orderA = a.order;
		const orderB = b.order;

		let comparison = 0;
		if (orderA > orderB) {
			comparison = 1;
		} else if (orderA < orderB) {
			comparison = -1;
		}
		return comparison;
	};

	updateInput(event) {
		this.setState({ newItem: event.target.value });
	}

	addItem = function(itemName) {
		if (itemName.trim() !== '') {
			let newList = this.state.list;
			let index = 1;
			if (newList.length > 0) {
				index =
					newList.reduce(
						(max, p) => (p.key > max ? p.key : max),
						newList[0].key
					) + 1;
			}

			var newItem = {
				key: index,
				name: itemName,
				checked: false,
				order: index
			};

			this.state.collection
				.doc(this.state.docPrefixName + index)
				.set(newItem)
				.then();

			newList.push(newItem);
			this.setState({ list: newList });
			localStorage.setItem('list', JSON.stringify(newList));
			this.setState({ newItem: '' });
		}
	};

	checkItem = function(key) {
		let newList = this.state.list;
		let objIndex = newList.findIndex(obj => obj.key === key);
		newList[objIndex].checked = !newList[objIndex].checked;
		this.setState({ list: newList });
	};

	removeItem = function(key) {
		let list = this.state.list;
		var filteredList = list.filter(function(e) {
			return e.key !== key;
		});

		this.state.collection
			.doc(this.state.docPrefixName + key)
			.delete()
			.then();

		this.setState({ list: filteredList });
	};

	removeAllItems = function() {
		const collection = this.state.collection.get();

		collection.then(documents => {
			//TODO:  Needs try catch handling
			documents.docs.map(document => {
				var item = document.data();
				this.state.collection
					.doc(this.state.docPrefixName + item.key)
					.delete()
					.then();
			});
		});

		this.setState({ list: [] });
	};

	onSortEnd = ({ oldIndex, newIndex }) => {
		if (oldIndex !== newIndex) {
			this.state.collection
				.where('order', '==', oldIndex + 1)
				.get()
				.then(function(querySnapshot) {
					querySnapshot.forEach(function(doc) {
						firebase
							.firestore()
							.collection('supermarket-list')
							.doc(doc.id)
							.update({
								order: newIndex + 1
							});
					});
				});

			this.state.collection
				.where('order', '==', newIndex + 1)
				.get()
				.then(function(querySnapshot) {
					querySnapshot.forEach(function(doc) {
						firebase
							.firestore()
							.collection('supermarket-list')
							.doc(doc.id)
							.update({
								order: oldIndex + 1
							});
					});
				});
		}
	};

	render() {
		return (
			<div>
				<ReactSortable
					animation={200}
					onEnd={this.onSortEnd}
					list={this.state.list}
					setList={newState => this.setState({ list: newState })}
				>
					{this.state.list.map(item => (
						<div key={item.key} className={item.checked ? 'item-checked' : ''}>
							<span onDoubleClick={() => this.checkItem(item.key)}>
								{item.name}
								<FaCheckCircle
									className={
										'icon green ' + (!item.checked ? 'hidden-icon' : '')
									}
								/>
							</span>
							<Button type="button" color="primary">
								Primary
							</Button>
							<Button type="button" color="info">
								Info
							</Button>
							<Button type="button" color="success">
								Success
							</Button>
							<Button type="button" color="danger">
								Danger
							</Button>
							<Button type="button" color="warning">
								Warning
							</Button>
							<Button type="button" color="rose">
								Rose
							</Button>
							<FaTrash
								className={'icon red right'}
								onDoubleClick={() => this.removeItem(item.key)}
							></FaTrash>
						</div>
					))}
				</ReactSortable>
				<div className="add-item">
					<input
						type="text"
						value={this.state.newItem}
						onChange={this.updateInput}
					/>
					<FaPlus
						className={'icon'}
						onClick={() => {
							this.addItem(this.state.newItem);
						}}
					></FaPlus>
				</div>
				<div
					className="clear-items"
					onDoubleClick={() => {
						this.removeAllItems();
					}}
				>
					<label>Remove All</label>
					<FaTrash className={'icon'}></FaTrash>
				</div>
			</div>
		);
	}
}

export default ListItems;
