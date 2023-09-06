import { useState } from 'react';
import './App.css';

function App() {
	const [cards, setCards] = useState([
		{
			file: '',
			deck: '',
			descriptionEn: '',
			descriptionRu: '',
			descriptionUa: '',
		}
	]);

	const handleAddRow = () => {
		setCards([...cards, {
			file: '',
			description: '',
		}]);
	};

	const onChangeInput = (e, cardI) => {
		if (e.target.name === 'file') {
			const newState = cards.map((tableRow, ind) => {
				if (ind === cardI) {
					return {
						...tableRow,
						file: e.target.files[0],
						fileUrl: window.URL.createObjectURL(e.target.files[0]),
					};
				}
		
				return tableRow;
			});
			setCards(newState);
		} else {
			const newState = cards.map((tableRow, ind) => {
				if (ind === cardI) {
					return {
						...tableRow,
						[e.target.name]: e.target.value
					};
				}
		
				return tableRow;
			});
			setCards(newState);
		}
	};

	const saveCards = async () => {
		// const cardsFormData = [];
		// cards.forEach(card => {
		// 	const formData = new FormData();
		// 	if (card.image) formData.append('file', card.image);
		// 	Object.entries(card).map(([key, value]) => formData.append(key, value));

		// 	cardsFormData.push(formData);
		// });
		const formData = new FormData();
		console.log(cards[0].file);
		if (cards[0].file) formData.append('file', cards[0].file);
		Object.entries(cards[0]).map(([key, value]) => formData.append(key, value));

		await fetch(`http://localhost:4000//metaphorical-cards`, {
			method: 'POST',
			body: formData,
			headers: {
				'Content-Type': 'multipart/form-data; boundary=something',
			},
		});
	};

	return (
		<div className='adminPanel'>
			<button className='addRemoveRowTable' onClick={handleAddRow}>+</button>

			<table className='menstrualCycleTable adminCardTable'>
				<thead>
					<tr>
						<td><span>Image</span></td>
						<td><span>Description</span></td>
					</tr>
				</thead>
				<tbody>
					{cards.map((card, cardI) => (
						<tr key={cardI}>
							<td className='adminCardTableFile'>
								<input type='file' name='file' onChange={(e) => onChangeInput(e, cardI)} />
									{(card && card.file) && 
										<img src={card.fileUrl} alt={card.fileUrl.name} className='previewCard' />
									}
							</td>
							<td>
								<textarea name='description' value={card.description} rows='5' onChange={(e) => onChangeInput(e, cardI)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<button className='submit savePage' onClick={saveCards}>Save</button>
		</div>
	)
}

export default App;
