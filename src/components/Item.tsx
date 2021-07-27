import cn from 'classnames'

type Props = {
  id: number,
  text: string,
  resolved: boolean,
  onDelete: (text: string) => () => void,
  onToggle: () => void
}
function Item ({ id, text, resolved, onToggle, onDelete }: Props) {
  const idFor = `todo-${id}`
  return (
    <div
        data-testid={`todo-item-${id}`}
        className="flex items-center justify-between"
      >
      <label htmlFor={idFor} className='inline-flex items-center'>
        <input
          id={idFor}
          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
          type="checkbox"
          onChange={onToggle}
          checked={resolved}
        />
        <span
          data-testid='todo-label'
          className={
            cn('ml-2', {
              'line-through': resolved,
              'text-gray-400': resolved
            })
          }
        >
          {text}
        </span>
      </label>
      <button data-testid='remove-todo' onClick={onDelete(text)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-red-600 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export default Item
