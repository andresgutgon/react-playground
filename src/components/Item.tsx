import cn from 'classnames'

type Props = {
  text: string,
  resolved: boolean,
  onDelete: (text: string) => () => void
}
function Item ({ text, resolved, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div
        className={
          cn({
            'line-through': resolved,
            'text-gray-400': resolved
          })
        }
      >
        {text}
      </div>
      <button data-testid='remove-todo' onClick={onDelete(text)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-red-600 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export default Item
