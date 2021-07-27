import { renderHook, act } from '@testing-library/react-hooks'
import useTodos from './useTodos'

const initialTodos = [
  { text: 'C Third todo', resolved: false },
  { text: 'A second resolved todo', resolved: true },
  { text: 'A first resolved todo', resolved: true },
  { text: 'B second todo', resolved: false },
  { text: 'C third resolved todo', resolved: true }
]

test('should order todos alphabeticaly and resolved todos last', () => {
  const { result } = renderHook(() => useTodos({ initialTodos }))

  expect(result.current.todos).toEqual([
    { text: 'B second todo', resolved: false },
    { text: 'C Third todo', resolved: false },
    { text: 'A first resolved todo', resolved: true },
    { text: 'A second resolved todo', resolved: true },
    { text: 'C third resolved todo', resolved: true }
  ])
})

test('should add a todo and sort the result', () => {
  const { result } = renderHook(() => useTodos({ initialTodos }))

  act(() => {
    result.current.addTodo('A This is first now')
  })

  expect(result.current.todos).toEqual([
    { text: 'A This is first now', resolved: false },
    { text: 'B second todo', resolved: false },
    { text: 'C Third todo', resolved: false },
    { text: 'A first resolved todo', resolved: true },
    { text: 'A second resolved todo', resolved: true },
    { text: 'C third resolved todo', resolved: true }
  ])
})

test('should not add todo with same text', () => {
  const { result } = renderHook(() => useTodos({ initialTodos }))

  act(() => {
    result.current.addTodo('B second todo')
  })

  expect(result.current.todos).toEqual([
    { text: 'B second todo', resolved: false },
    { text: 'C Third todo', resolved: false },
    { text: 'A first resolved todo', resolved: true },
    { text: 'A second resolved todo', resolved: true },
    { text: 'C third resolved todo', resolved: true }
  ])
})

test('should remode the todo by text', () => {
  const { result } = renderHook(() => useTodos({ initialTodos }))

  act(() => {
    result.current.removeTodo('B second todo')
  })

  expect(result.current.todos).toEqual([
    { text: 'C Third todo', resolved: false },
    { text: 'A first resolved todo', resolved: true },
    { text: 'A second resolved todo', resolved: true },
    { text: 'C third resolved todo', resolved: true }
  ])
})

test('should not remove a non-existing todo', () => {
  const { result } = renderHook(() => useTodos({ initialTodos }))

  act(() => {
    result.current.removeTodo('Do not exists')
  })

  expect(result.current.todos).toEqual([
    { text: 'B second todo', resolved: false },
    { text: 'C Third todo', resolved: false },
    { text: 'A first resolved todo', resolved: true },
    { text: 'A second resolved todo', resolved: true },
    { text: 'C third resolved todo', resolved: true }
  ])
})

test('should resolve todo', () => {
  const { result } = renderHook(() => useTodos({ initialTodos }))

  act(() => {
    result.current.resolveTodo('B second todo')
  })

  expect(result.current.todos).toEqual([
    { text: 'C Third todo', resolved: false },
    { text: 'A first resolved todo', resolved: true },
    { text: 'A second resolved todo', resolved: true },
    { text: 'B second todo', resolved: true },
    { text: 'C third resolved todo', resolved: true }
  ])
})

test('should not resolve a non-existing todo', () => {
  const { result } = renderHook(() => useTodos({ initialTodos }))

  act(() => {
    result.current.resolveTodo('Do not exists')
  })

  expect(result.current.todos).toEqual([
    { text: 'B second todo', resolved: false },
    { text: 'C Third todo', resolved: false },
    { text: 'A first resolved todo', resolved: true },
    { text: 'A second resolved todo', resolved: true },
    { text: 'C third resolved todo', resolved: true }
  ])
})

test('should un-resolve todo', () => {
  const { result } = renderHook(() => useTodos({ initialTodos }))

  act(() => {
    result.current.unresolveTodo('A first resolved todo')
  })

  expect(result.current.todos).toEqual([
    { text: 'A first resolved todo', resolved: false },
    { text: 'B second todo', resolved: false },
    { text: 'C Third todo', resolved: false },
    { text: 'A second resolved todo', resolved: true },
    { text: 'C third resolved todo', resolved: true }
  ])
})

test('should not un-resolve a non-existing todo', () => {
  const { result } = renderHook(() => useTodos({ initialTodos }))

  act(() => {
    result.current.unresolveTodo('Do not exists')
  })

  expect(result.current.todos).toEqual([
    { text: 'B second todo', resolved: false },
    { text: 'C Third todo', resolved: false },
    { text: 'A first resolved todo', resolved: true },
    { text: 'A second resolved todo', resolved: true },
    { text: 'C third resolved todo', resolved: true }
  ])
})
