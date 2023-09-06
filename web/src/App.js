import { useState } from 'react';
import axios from 'axios';

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

	const onChangeInput = async (e, cardI) => {
		if (e.target.name === 'file') {
			const file = e.target.files[0]
			const formData = new FormData();
			if (file) formData.append('file', file);

			const resp = await axios.post(`http://localhost:4000/file`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data; boundary=something',
				}
			});

			const newState = cards.map((tableRow, ind) => {
				if (ind === cardI) {
					return {
						...tableRow,
						file: resp.data[0],
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
		await fetch(`http://localhost:4000/`, {
			method: 'POST',
			body: JSON.stringify(cards),
			headers: {
				'Content-Type': "application/json",
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
