let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
let valueInput = '';
let input = null;

window.onload = () => {
	input = document.getElementById('input-task');
	input.addEventListener('change', updateValue);
	render();
}

const onClickButton = () => {
	if (valueInput !== '') {
		allTasks.push({
			text: valueInput,
			isChecked: false,
			isEdit: false
		});
	} else {
		alert("You can't add empty task!");
	};
	saveToLocalStorage();
	valueInput = '';
	input.value = '';
	render();
};

const deleteAllTAsksButton = () => {
	allTasks.splice(0, allTasks.length);
	saveToLocalStorage();
	render();
};

const updateValue = (event) => {
	valueInput = event.target.value;
};

render = () => {
	sortedTasks();
	saveToLocalStorage();
	const content = document.getElementById('content-page');
	while (content.firstChild) {
		content.removeChild(content.firstChild)
	};
	allTasks.map((item, index) => {
		const container = document.createElement('div');
		container.id = `task=${index}`;
		container.className = 'container-list';
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = item.isChecked;

		checkbox.onclick = () => {
			onChangeCheckBox(index);
		};

		container.appendChild(checkbox);
		const text = document.createElement('p');
		text.innerText = item.text;
		text.className = item.isChecked ? 'text-task done-text' : 'text-task';
		item.isEdit ? text.classList.add('edit-text') : '';
		text.id = `text=${index}`;

		const inputEdit = document.createElement('input');
		inputEdit.value = item.text;
		inputEdit.className = item.isEdit ? 'edit' : 'noEdit';

		const imageEdit = document.createElement('img');
		imageEdit.src = 'icons/edit.svg';
		imageEdit.className = item.isEdit || item.isChecked ? 'icons-hidden' : 'icons';

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
			editImage(index);
		};

		imageCancel.onclick = () => {
			editImage(index);
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

const onChangeCheckBox = (index) => {
	allTasks[index].isChecked = !allTasks[index].isChecked;
	render();
};

const editImage = (index) => {
	allTasks[index].isEdit = !allTasks[index].isEdit;
	render();

};

const saveEditFromInput = (index, inputEdit) => {
	if (inputEdit.value !== '') {
		allTasks[index].text = inputEdit.value;
		allTasks[index].isEdit = !allTasks[index].isEdit;
	} else {
		deleteElement(index);
	}
	render();
};

const deleteElement = (index) => {
	allTasks.splice(index, 1);
	render();
};

const sortedTasks = () => {
	allTasks.sort((a, b) => {
		if (a.isChecked < b.isChecked) {
			return -1;
		} else if (a.isChecked > b.isChecked) {
			return 1;
		}
		return 0;
	});
};

const saveToLocalStorage = () => {
	localStorage.setItem('tasks', JSON.stringify(allTasks));
}