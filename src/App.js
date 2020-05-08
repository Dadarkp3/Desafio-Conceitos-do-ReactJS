import React, { useState, useEffect } from "react";

import api from "./services/api";

import Header from "./components/Header/Header";

import "./styles.css";

function App() {
	const [repositories, setrepositories] = useState([]);

	useEffect(() => {
		api.get("repositories").then((response) => {
			setrepositories(response.data);
		});
	}, []);

	async function handleAddRepository() {
		const response = await api.post("repositories", {
			title: `Novo Projeto ${Date.now()}`,
			owner: "Daiane",
		});

		const repository = response.data;
		setrepositories([...repositories, repository]);
	}

	async function handleRemoveRepository(id) {
		api.delete(`repositories/${id}`);
		setrepositories(repositories.filter((repository) => repository.id !== id));
	}

	return (
		<div className='repository'>
			<Header />
			<button className='add' onClick={handleAddRepository}>
				Adicionar
			</button>
			<ul data-testid='repository-list'>
				{repositories.map((repository) => (
					<li key={repository.id}>
						<svg
							className='bi bi-check'
							width='1em'
							height='1em'
							viewBox='0 0 16 16'
							fill='currentColor'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path d='M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z' />
						</svg>
						<p className='repository-title'>{repository.title}</p>

						<button onClick={() => handleRemoveRepository(repository.id)}>
							<svg
								className='bi bi-trash'
								width='1em'
								height='1em'
								viewBox='0 0 16 16'
								fill='currentColor'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z' />
								<path d='M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z' />
							</svg>{" "}
							Remover
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
