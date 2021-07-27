import React from 'react'
import { getByText, getByTestId, waitFor, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

let blankSlate

test('Show a text input', () => {
  render(<App />);
  const inputNode = screen.getByPlaceholderText('Add Todo')

  expect(inputNode).toBeInTheDocument();
})

test('Show a list of todos', () => {
  render(<App />);
  const todoList = screen.getByTestId('todo-list')
  const { getAllByRole } = within(todoList)
  const items = getAllByRole("listitem")

  expect(items.length).toBe(4)
})

test('On key enter add a new todo', () => {
  render(<App />);
  const inputNode = screen.getByPlaceholderText('Add Todo')

  // Change text in input
  userEvent.type(inputNode, 'Another todo')
  // Press enter
  userEvent.type(inputNode, '{enter}')

  // Clear text input
  expect((inputNode as HTMLInputElement).value).toBe('')

  const todoList = screen.getByTestId('todo-list')
  const { getAllByRole } = within(todoList)
  const items = getAllByRole("listitem")

  expect(items.length).toBe(5)
})

test('Delete all todos and see blank slate', async () => {
  render(<App />);
  const todoList = screen.getByTestId('todo-list')
  const { getAllByTestId } = within(todoList)
  const todoRemoveButtons = getAllByTestId("remove-todo")

  await waitFor(() => {
    todoRemoveButtons.forEach((button) => {
      userEvent.click(button)
    })
    blankSlate = screen.getByTestId('blank-slate')
    return expect(blankSlate).toBeInTheDocument()
  })
})

test('Check a todo item', async () => {
  render(<App />);
  const item = screen.getByTestId('todo-item-3')
  const { getByLabelText } = within(item)
  const checkbox = getByLabelText('Use Tailwind')

  userEvent.click(checkbox)

  const todoList = screen.getByTestId('todo-list')
  const { getAllByRole } = within(todoList)
  const items = getAllByRole("listitem")

  const newTodoPosition = items[1]
  const label = getByTestId(newTodoPosition, 'todo-label')
  expect(label.textContent).toBe('Use Tailwind')
});
