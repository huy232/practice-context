import "./App.css"
import { useRef } from "react"
import { useStore, actions } from "./Store"

function App() {
	const [state, dispatch] = useStore()
	const { todos, todoInput } = state
	const inputRef = useRef()

	const handleAdd = () => {
		dispatch(actions.addTodo(todoInput))
		dispatch(actions.setTodoInput(""))
		inputRef.current.focus()
	}

	const handleDelete = (index) => {
		dispatch(actions.deleteTodo(index))
	}

	const handleUpdate = (index) => {
		dispatch(actions.updateTodo({ todoInput, index }))
		dispatch(actions.setTodoInput(""))
		inputRef.current.focus()
	}

	return (
		<div>
			<input
				ref={inputRef}
				value={todoInput}
				placeholder="Enter todo..."
				onChange={(e) => {
					dispatch(actions.setTodoInput(e.target.value))
				}}
			/>
			<button onClick={handleAdd}>Add</button>
			{todos.map((todo, index) => (
				<li key={index}>
					{todo}
					<button onClick={() => handleDelete(index)}>Delete</button>
					<button onClick={() => handleUpdate(index)}>Update</button>
				</li>
			))}
		</div>
	)
}

export default App
