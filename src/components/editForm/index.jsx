import './index.scss'
import { useState } from 'react'

export default function EditForm({todo, edit, cancel}) {

	// const editValue = ref({...props.todo})

	const categories = ["business", "personal"];
	// const [editValue, setEditValue] = useState({...props.todo})
	
	const [category, setCategory] = useState(todo.category)
	const [title, setTitle] = useState(todo.title)
	const [content, setContent] = useState('')
	const createdAt = todo.createdAt
	const finishedAt = todo.finishedAt
	
	const send = () => {
		edit({
			id: todo.id,
			category,
			title,
			content,
			createdAt,
			finishedAt
		})
		// emit('edit', editValue.value)
	}

	const reset = () => {
		cancel()
	}
	
	return (
		<form onSubmit={(e) => e.preventDefault()}  className='edit-form'>

			<textarea name="title" className="title" placeholder="Title?" value={title} onChange={(e) => setTitle(e.target.value)}/>
			<div className="main-content">
				<textarea name="content" className="content" placeholder="Doing something?" v-value={content} onChange={(e) => setContent(e.target.value)}/>
				<div className="options category">
					{
						categories.map( (value, index) => {
							return(
							<div key={index}>
								<label>
									<input type="radio" name="category" value={value} checked={value === category} onChange={(e) => setCategory(e.target.value)} />
									<span className={"bubble " + value}></span>
									<div>{ value ? value.toUpperCase() : '' }</div>
								</label>
							</div>			
							);
						})
					}
				</div>
	
				<div className="date"> 
					Begin: {createdAt ? new Date(createdAt).toLocaleString() : '--/--/--' }   |
					Finish: { finishedAt ? new Date(finishedAt).toLocaleString() : '--/--/--' } <br/>
				</div>
			</div>
	
			<div className="action" >
				<button className="edit" onClick={send}>Edit</button>
				<button className="delete" onClick={reset}>Cancel</button>
			</div>
		</form>
	)
}