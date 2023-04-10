// import { ref, onMounted, computed, watch, onBeforeMount } from 'vue'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

import AddnewForm from './components/addnewForm/';
import ShowList from './components/showList/';
import NotiBox from './components/notificationBox/';
import EditForm from './components/editForm/';

// watch(name, (newVal) => {
// 	localStorage.setItem('name', newVal);
// });

// watch(todos,  (newVal) => localStorage.setItem('todos', JSON.stringify(newVal)) ,
// 	{ deep: true }
// );

export default function App() {
	const [todos, setTodos] = useState([]);
	const [name, setName] = useState('');

	const [notification, setNotification] = useState('');
	const [notiType, setNotiType] = useState('waiting');

	const [add, setadd] = useState(false);
	const [edit, setedit] = useState('');
	const [deleteTodo, setDelete] = useState('');

	const waitForRespone = () => setNotification('Processing ....');

	const hasError = () => {
		setNotification('Error has occurred! ');
		setNotiType('error');
		// notification.value = 'Error has occurred! ';
		// notiType.value = 'error'
	};

	const getData = () => {
		axios
			.get('https://641d13f31a68dc9e461685d0.mockapi.io/api/todos/note')
			.then((respone) => {
				if (respone.status === 200) {
					setTodos(respone.data);
					console.log(respone.data);
				}
			})
			.catch((error) => console.error(error));
	};

	const postData = (title, content, category) => {
		waitForRespone();
		const newVal = {
			title,
			content,
			category,
			done: false,
			createdAt: new Date(),
			finishedAt: '',
		};
		axios
			.post('https://641d13f31a68dc9e461685d0.mockapi.io/api/todos/note', newVal)
			.then((respone) => {
				if (respone.status === 201) {
					setNotiType('add');
					setNotification('Add new successfully');
					setadd(false);
					// add.value = false;
					console.log(respone);
					setTodos([...todos, respone.data]);
					//   todos.value.push(respone.data);
					// getData();
				}
			})
			.catch((error) => console.error(error));
	};

	const putData = (todo) => {
		waitForRespone();
		console.log('Modify data: ' + JSON.stringify(todo));
		axios
			.put(`https://641d13f31a68dc9e461685d0.mockapi.io/api/todos/note/${todo.id}`, todo)
			.then((respone) => {
				if (respone.status === 200) {
					setedit('');
					// edit.value = '';
					setNotiType('edit');
					// notiType.value = 'edit';
					setNotification('Change saved');
					// notification.value = 'Change saved';
					var index = todos.findIndex((obj) => obj.id === todo.id);
					todos[index] = todo;
					console.log(todos[index]);
					// getData()
				}
			})
			.catch((error) => console.error(error));
	};

	const beforeDelete = (todo) => {
		setNotiType('deleteConfirm');
		setNotification('Do you want to delete this note?');
		setDelete(todo);
		// deleteTodo.value = todo
	};

	const deleteData = () => {
		waitForRespone();
		// console.log(todo);
		axios
			.delete(`https://641d13f31a68dc9e461685d0.mockapi.io/api/todos/note/${deleteTodo.id}`)
			.then((respone) => {
				if (respone.status === 200) {
					// alert('Delete successfully!');
					setNotiType('delete');
					setNotification('Delete successfully');
					todos.splice(
						todos.findIndex((obj) => obj.id === deleteTodo.id),
						1,
					);
					setDelete('');
				}
			})
			.catch((error) => console.error(error));
	};

	const checkDone = (todo) => {
		todo.done = !todo.done;
		todo.finishedAt = todo.done ? new Date() : '';
		putData(todo);
	};

	const closeNoti = () => {
		setNotification('');
		setNotiType('waiting');
	};

	const setEdit = (todo) => {
		setedit(todo);
		// edit.value = todo;
	};

	const clearEdit = () => {
		setedit('');
	};

	//   const setAdd = (value) => {
	//     console.log(value);
	//     setadd(value);
	//     // add.value = value;
	//   };
	const cancelAdd = () => {
		setadd(false);
	};

	useEffect(() => {
		getData();
		// console.log(add);
		setNotiType('edit');
		setNotification(<div style={{textAlign: 'center'}}>
			<h2>Welcome to my todo list app! </h2> <br/>
			<h3>
				What can you do here? <br/><br/>
				*** Add new item ***<br/>
				*** Modify already had one (Detail button) ***<br/>
				*** Delete if you don't need it ***<br/>
				*** And once you'd done, remember to check from the list *** <br/>
			</h3>
			<p>Have fun!!</p>
		</div>)
	}, []);

	useEffect(() => {
		localStorage.setItem('name', name);
	}, [name]);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [JSON.stringify(todos)]);

	return (
		<div className="app">
			<section className="greeting">
				<h1 className="title">
					Hey, 
					<input
						type="text"
						placeholder="(input your name here)"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</h1>
			</section>

			<section className="create-todo">
				{!add ? (
					<input type="submit" value="Add todo" onClick={() => setadd(true)} />
				) : (
					<fieldset>
						<legend>
							<h2>Create todo</h2>
						</legend>
						<AddnewForm addNew={postData} cancelAdd={cancelAdd}>
							{' '}
						</AddnewForm>
					</fieldset>
				)}
			</section>

			<section className="todo-list">
				{todos.length ? (
					<fieldset>
						<legend>
							<h2>TODO list</h2>
						</legend>
						<ShowList todos={todos} deleteTodo={beforeDelete} setDone={checkDone} edit={setEdit}></ShowList>
					</fieldset>
				) : (
					<></>
				)}
				{edit ? (
					<fieldset>
						<EditForm edit={putData} cancel={clearEdit} todo={edit}>
							{' '}
						</EditForm>
					</fieldset>
				) : (
					<></>
				)}
			</section>
			<NotiBox notiType={notiType} notification={notification} closeNoti={closeNoti} confirmDelete={deleteData}>
				{' '}
			</NotiBox>
		</div>
	);
}
