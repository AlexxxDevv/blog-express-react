import { Input } from '@/components/ui/input';
import { FC } from 'react';

type MyInputProps = {
  type: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void ;
  value?: string;
}

const MyInput: FC<MyInputProps> = ({ type, placeholder, onChange, value }) => {
  return <Input value={value} onChange={(e) => {onChange(e)}} type={type} placeholder={placeholder} />
}

export default MyInput;