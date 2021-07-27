import { useReducer } from 'react'

type Todo = {
  text: string,
  resolved: boolean
}

type State = Array<Todo>
type Action =
  | { type: 'addTodo', todo: Todo }
function reducer (state: State, action: Action) {
  switch (action.type) {
    case 'addTodo':
      return [...state, action.todo]
    default:
      throw new Error();
  }
}
type Props = {
  initialTodos: Array<Todo>
}
type ReturnType = {
  todos: Array<Todo>,
  addTodo: (todo: Todo) => void
}
const useTodos = ({ initialTodos }: Props): ReturnType => {
  const [todos, dispatch] = useReducer(reducer, initialTodos)
  const addTodo = (todo: Todo) => {
    dispatch({ type: 'addTodo', todo })
  }
  return {
    todos,
    addTodo
  }
}

export default useTodos
