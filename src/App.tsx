import { useState, ChangeEvent, KeyboardEvent } from 'react'
import Item from 'components/Item'
import useTodos from 'hooks/useTodos'

import { todos as initialTodos } from './todos.json'

function App() {
  const { todos, addTodo } = useTodos({ initialTodos })
  const [text, setInput] = useState('')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return

    addTodo(text)
    setInput('')
  }

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow space-y-10 p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <h1 className="text-gray-900 text-4xl font-semibold">Todo List</h1>
        <div className="flex mt-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            placeholder="Add Todo"
            value={text}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>

        <ul>
          {todos.map((todo: any, index: number) =>
            <li key={index}>
              <Item text={todo.text} resolved={todo.resolved} />
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default App;
