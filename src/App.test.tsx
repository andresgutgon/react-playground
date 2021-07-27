import React from 'react'
import { waitFor, render, screen, within } from '@testing-library/react'
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
});

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
});

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
});
