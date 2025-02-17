import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FC } from "react";

type MyInputFileProps = {
  accept: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void ;
}

const MyInputFile: FC<MyInputFileProps> = ({accept, onChange}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Добавьте картинку</Label>
      <Input accept={accept} onChange={(e) => {onChange(e)}} id="picture" type="file" />
    </div>
  )
}

export default MyInputFile;