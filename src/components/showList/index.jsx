import './index.scss'
export default function ShowList({edit, deleteTodo, setDone, todos}){

    const editIn = (todo) => {
        console.log(todo)
        // alert(todo.id)
        edit(todo)
    }
    
    const deleteTodoIn = (todo) => {
        deleteTodo(todo)
    }
    
    const setDoneIn = (todo) => {
        setDone(todo)
    }

    const todoList = todos.map((todo) => {
        return(
        <div key={todo.id} className={"todo-item " + (todo.done && 'done')}>
            <label>
                <input type="checkbox" onClick={(e) => setDoneIn(todo)} checked={todo.done} readOnly={true}/>
                <span className={"bubble " + todo.category}></span>
            </label>

            <div className="todo-content">
                <h3 className={todo.done ? 'finished': ''}> { todo.title } </h3>
                <h4> ||| { todo.content }</h4>
                <p>{ todo.createdAt  ? " Begin at : " + new Date(todo.createdAt).toLocaleString()  : '' }  </p>
                <p>{ todo.finishedAt ? 'Finished at : '          + new Date(todo.finishedAt).toLocaleString() : '' }  </p>
            </div>

            <div className="actions">
                <button className="edit" onClick={(e) => editIn(todo)}>Detail</button>
                <button className="delete" onClick={(e) => deleteTodoIn(todo)}>Delete</button>
            </div>

        </div>)
    })

    return (
        <div className="list">
        {
            todoList
        }
        </div>
    )
}
