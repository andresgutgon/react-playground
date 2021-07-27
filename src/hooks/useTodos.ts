import { useReducer } from 'react'

export type Todo = {
  text: string,
  resolved: boolean
}

const sortTodos = (locale: string) => (todos: Array<Todo>): Array<Todo> => {
  return todos.sort((a: Todo, b: Todo) => {
    if (a.resolved === b.resolved) {
      return a.text.localeCompare(
        b.text,
        locale,
        { sensitivity: 'base' }
      )
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

function toggleTodo (
  state: State,
  text: string,
  resolved: boolean,
  locale: string
): Array<Todo> {
  const todo = findTodo(state, text)

  if (!todo) return state

  return sortTodos(locale)([
    ...filterTodo(state, text),
    { text: todo.text, resolved }
  ])
}

type Action =
  | { type: 'addTodo', todo: Todo }
  | { type: 'reset', todos: Array<Todo> }
  | { type: 'removeTodo', text: string }
  | { type: 'resolveTodo', text: string }
  | { type: 'unresolveTodo', text: string }
const reducer = (locale: string) => (state: State, action: Action) => {
  switch (action.type) {
    case 'addTodo':
      const alreadyCreated = existingTodo(state, action.todo.text)

      if (alreadyCreated) return state

      return sortTodos(locale)([...state, action.todo])
    case 'removeTodo':
      return filterTodo(state, action.text)
    case 'resolveTodo':
      return toggleTodo(state, action.text, true, locale)
    case 'unresolveTodo':
      return toggleTodo(state, action.text, false, locale)
    case 'reset':
      return action.todos
    default:
      throw new Error();
  }
}

type Props = { locale: string, initialTodos: Array<Todo> }
type ReturnType = {
  todos: Array<Todo>,
  reset: () => void,
  addTodo: (text: string) => void,
  removeTodo: (text: string) => () => void,
  resolveTodo: (text: string) => void,
  unresolveTodo: (text: string) => void
}
const useTodos = ({ initialTodos, locale }: Props): ReturnType => {
  const [todos, dispatch] = useReducer(reducer(locale), initialTodos, sortTodos(locale))
  const addTodo = (text: string) => {
    dispatch({
      type: 'addTodo',
      todo : { text, resolved: false }
    })
  }
  const removeTodo = (text: string) => () => {
    dispatch({ type: 'removeTodo', text })
  }
  const resolveTodo = (text: string) => {
    dispatch({ type: 'resolveTodo', text })
  }
  const unresolveTodo = (text: string) => {
    dispatch({ type: 'unresolveTodo', text })
  }
  const reset = () => {
    dispatch({ type: 'reset', todos: initialTodos })
  }
  return {
    todos,
    reset,
    addTodo,
    removeTodo,
    resolveTodo,
    unresolveTodo
  }
}

export default useTodos
