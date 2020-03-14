import React from 'react';
import 'App.css';
import ListItems from './ListItems.js';
import { FirestoreCollection } from 'react-firestore';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<FirestoreCollection
					path="supermarket-list"
					render={({ isLoading, data }) => {
						return isLoading ? (
							<div />
						) : (
							<div>
								<h1>Items</h1>
								<ListItems
									items={data}
									collectionName="supermarket-list"
									docPrefixName="item"
								/>
							</div>
						);
					}}
				/>
			</header>
		</div>
	);
}

export default App;
