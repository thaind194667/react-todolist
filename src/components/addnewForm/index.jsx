
import { useState } from 'react'
import './index.scss'

export default function AddnewForm(  { addNew, cancelAdd } ) {

  	const categories = ["business", "personal"];

	const [category, setCategory] = useState(null);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const sent = () => {
		addNew(title, content, category);
		setContent('')
		setTitle('')
		setCategory(null);
	}

	const cancel = () => {
		cancelAdd()
	}

	const categoryList = categories.map( (value, index) => {
		return(
		<div key={index}>
			<label>
				<input type="radio" name="category" value={value} onChange={(e) => setCategory(e.target.value)} />
				<span className={"bubble " + value}></span>
				<div>{ value ? value.toUpperCase() : '' }</div>
			</label>
		</div>			
		);
	})

	return (
	<div>
		<form className="add-form" onSubmit={(e) => e.preventDefault()}>
			<h3 className="form-header"><b>Making new note</b></h3>

			Title:
			<textarea name="title" 
				className="input-field" 
				placeholder="Title?" 
				value={title} 
				onChange={(e) => setTitle(e.target.value)} />

			Content:
			<textarea name="content" 
				className="input-field" 
				placeholder="Doing something?" 
				value={content} 
				onChange={(e) => setContent(e.target.value)} />

			<h3>
				<b>Category?</b>
			</h3>
			<div className="options">
				{categoryList}
			</div>
			<div className="btn-field">
				<button  className="add" onClick={sent} >
					Add todo
				</button>

				<button className="cancel" onClick={cancel}>
					Cancle
				</button>
			</div>
		</form>
	</div>
	)
}