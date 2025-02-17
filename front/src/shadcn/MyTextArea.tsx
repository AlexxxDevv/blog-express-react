import { Textarea } from "@/components/ui/textarea"
import { FC } from "react";

type MyTextAreaProps = {
  value: string;
  rows: number;
  cols: number;
  className: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void ;
}

const MyTextArea: FC<MyTextAreaProps> = ({value, rows, cols,  onChange, className}) => {
  return <Textarea className={className} value={value} rows={rows} cols={cols} onChange={(e) => {onChange(e)}} placeholder="Оставьте свое сообщение" />
}

export default MyTextArea;
