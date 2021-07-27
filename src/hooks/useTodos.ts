import { useReducer } from 'react'

type Todo = {
  text: string,
  resolved: boolean
}

function sortTodos (todos: Array<Todo>): Array<Todo> {
  return todos.sort((a: Todo, b: Todo) => {
    if (a.resolved === b.resolved) {
      if (a.text < b.text) { return -1 }
      if (a.text > b.text) { return 1 }
      return 0
    }

    return Number(a.resolved) - Number(b.resolved)
  })
}

type State = Array<Todo>

function findTodo (state: State, text: string): Todo | undefined {
  return state.find((todo: Todo) => todo.text === text)
}

function filterTodo (state: State, text: string): Array<Todo> {
  return state.filter((todo: Todo) => todo.text !== text)
}

function existingTodo (state: State, text: string): boolean {
  return !!findTodo(state, text)
}

function toggleTodo (state: State, text: string, resolved: boolean): Array<Todo> {
  const todo = findTodo(state, text)

  if (!todo) return state

  return sortTodos([
    ...filterTodo(state, text),
    { text: todo.text, resolved }
  ])
}

type Action =
  | { type: 'addTodo', todo: Todo }
  | { type: 'removeTodo', text: string }
  | { type: 'resolveTodo', text: string }
  | { type: 'unresolveTodo', text: string }
function reducer (state: State, action: Action) {
  switch (action.type) {
    case 'addTodo':
      const alreadyCreated = existingTodo(state, action.todo.text)

      if (alreadyCreated) return state

      return sortTodos([...state, action.todo])
    case 'removeTodo':
      return filterTodo(state, action.text)
    case 'resolveTodo':
      return toggleTodo(state, action.text, true)
    case 'unresolveTodo':
      return toggleTodo(state, action.text, false)
    default:
      throw new Error();
  }
}

type Props = { initialTodos: Array<Todo> }
type ReturnType = {
  todos: Array<Todo>,
  addTodo: (text: string) => void,
  removeTodo: (text: string) => void,
  resolveTodo: (text: string) => void,
  unresolveTodo: (text: string) => void
}
const useTodos = ({ initialTodos }: Props): ReturnType => {
  const [todos, dispatch] = useReducer(reducer, initialTodos, sortTodos)
  const addTodo = (text: string) => {
    dispatch({
      type: 'addTodo',
      todo : { text, resolved: false }
    })
  }
  const removeTodo = (text: string) => {
    dispatch({ type: 'removeTodo', text })
  }
  const resolveTodo = (text: string) => {
    dispatch({ type: 'resolveTodo', text })
  }
  const unresolveTodo = (text: string) => {
    dispatch({ type: 'unresolveTodo', text })
  }
  return {
    todos,
    addTodo,
    removeTodo,
    resolveTodo,
    unresolveTodo
  }
}

export default useTodos
