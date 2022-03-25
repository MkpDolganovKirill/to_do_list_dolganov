let allTasks = [];
let valueInput = '';
let input = null;

window.onload = async () => {
	input = document.getElementById('input-task');
	input.addEventListener('change', updateValue);
	const resp = await fetch('http://localhost:8000/allTasks', {
		method: 'GET'
	})
	let result = await resp.json();
	if (allTasks) {
		allTasks = result.data;
		allTasks.forEach(element => {
			element.isEdit = false;
		});
	}
	saveToSessionStorage();
	render();
}

const onClickButton = async () => {
	if (valueInput !== '') {
		allTasks.push({
			text: valueInput,
			isCheck: false,
			isEdit: false
		});

		const resp = await fetch('http://localhost:8000/createTask', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({
				text: valueInput,
				isCheck: false
			})
		});
		let result = await resp.json();
		allTasks = result.data;
		if (allTasks) {
			allTasks = result.data;
			allTasks.forEach(element => {
				element.isEdit = false;
			});
		};
	} else {
		alert("You can't add empty task!");
	};

	

	saveToSessionStorage();
	valueInput = '';
	input.value = '';
	render();
};

const deleteAllTAsksButton = () => {
	allTasks.forEach(async (element) => {
		await fetch(`http://localhost:8000/deleteTask?id=${element.id}`, {
			method: 'DELETE'
		});
	});
	allTasks.splice(0, allTasks.length);
	render();
};

const updateValue = (event) => {
	valueInput = event.target.value;
};

render = () => {
	sortedTasks();
	saveToSessionStorage();
	const content = document.getElementById('content-page');
	while (content.firstChild) {
		content.removeChild(content.firstChild);
	};
	allTasks.map((item, index) => {
		const container = document.createElement('div');
		container.id = `task=${index}`;
		container.className = 'container-list';
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = item.isCheck;

		checkbox.onclick = () => {
			onChangeCheckBox(index);
		};

		container.appendChild(checkbox);
		const text = document.createElement('p');
		text.innerText = item.text;
		text.className = item.isCheck ? 'text-task done-text' : 'text-task';
		item.isEdit ? text.classList.add('edit-text') : '';
		text.id = `text=${index}`;

		const inputEdit = document.createElement('input');
		inputEdit.value = item.text;
		inputEdit.className = item.isEdit ? 'edit' : 'noEdit';

		const imageEdit = document.createElement('img');
		imageEdit.src = 'icons/edit.svg';
		imageEdit.className = item.isCheck ? 'icons-hidden' : 'icons';

		const imageCancel = document.createElement('img');
		imageCancel.src = 'icons/close.svg';
		imageCancel.className = item.isEdit ? 'icons' : 'icons-hidden';

		const imageComplete = document.createElement('img');
		imageComplete.src = 'icons/checkmark.svg';
		imageComplete.className = item.isEdit ? 'icons' : 'icons-hidden';

		const imageDelete = document.createElement('img');
		imageDelete.src = 'icons/delete.svg';
		imageDelete.className = 'icons';
		
		imageDelete.onclick = () => {
			deleteElement(index);
		};

		imageEdit.onclick = () => {
			editImageClick(index);
		};

		imageCancel.onclick = () => {
			editImageClick(index);
		};

		imageComplete.onclick = () => {
			saveEditFromInput(index, inputEdit);
		};

		container.appendChild(text);
		container.appendChild(inputEdit);
		container.appendChild(imageEdit);
		container.appendChild(imageCancel);
		container.appendChild(imageComplete);
		container.appendChild(imageDelete);
		content.appendChild(container);
	})
}

const onChangeCheckBox = async (index) => {
	allTasks[index].isCheck = !allTasks[index].isCheck;
	const resp = await fetch(`http://localhost:8000/updateTask`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'Access-Control-Allow-Origin': '*'
		},
		body: JSON.stringify({
			id: allTasks[index].id,
			text: allTasks[index].text,
			isCheck: allTasks[index].isCheck
		})
	});
	render();
};

const editImageClick = (index) => {
	allTasks[index].isEdit = !allTasks[index].isEdit;
	render();

};

const saveEditFromInput = async (index, inputEdit) => {
	if (inputEdit.value !== '') {
		allTasks[index].text = inputEdit.value;
		const resp = await fetch(`http://localhost:8000/updateTask`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({
				id: allTasks[index].id,
				text: inputEdit.value,
				isCheck: allTasks[index].isCheck
			})
		});

		allTasks[index].isEdit = !allTasks[index].isEdit;
	} else {
		deleteElement(index);
	};
	render();
};

const deleteElement = async (index) => {
	const resp = await fetch(`http://localhost:8000/deleteTask?id=${allTasks[index].id}`, {
		method: 'DELETE'
	});
	let result = await resp.json();
	allTasks = result.data;
	render();
};

const sortedTasks = () => {
	allTasks.sort((a, b) => {
		if (a.isCheck < b.isCheck) {
			return -1;
		} else if (a.isCheck > b.isCheck) {
			return 1;
		}
		return 0;
	});
};

const saveToSessionStorage = () => {
	sessionStorage.setItem('tasks', JSON.stringify(allTasks));
}