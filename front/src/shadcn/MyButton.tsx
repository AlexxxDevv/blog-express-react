import { Button } from '../components/ui/button'
import { FC } from 'react'

type MyButtonProps = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const MyButton: FC<MyButtonProps> = ({title, onClick, disabled, className}) => {
  return (
    <Button  disabled={disabled} className={`cursor-pointer ${className || ''}`} variant={'outline'} onClick={onClick}>{title}</Button>
  )
}

export default MyButton;