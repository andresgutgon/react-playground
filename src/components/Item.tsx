import cn from 'classnames'

type Props = {
  text: string,
  resolved: boolean
}
function Item ({ text, resolved }: Props) {
  return (
    <div
      className={
        cn({
          'line-through': resolved
        })
      }
    >
      <p className="w-full text-grey-darkest">{text}</p>
    </div>
  )
}

export default Item
