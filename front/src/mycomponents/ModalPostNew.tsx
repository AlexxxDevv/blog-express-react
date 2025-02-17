import { ChangeEvent, SetStateAction, useState } from 'react';
import { baseUrl, request } from '../utils/api';
import MyTextArea from '@/shadcn/MyTextArea';
import MyInputFile from '@/shadcn/MyFileInput';
import MyButton from '@/shadcn/MyButton';

type ModalProps = {
  onClose: () => void;
}

const ModalPostNew = (props: ModalProps) => {
  const [text, setText] = useState('Напиши что-нибудь скорее');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [showHiddenText, setShowHiddenText] = useState<boolean>(false)
  const token = localStorage.getItem('accessToken');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file && file.size < 1 * 1000 * 1024) {
      setMediaFile(file);
      setShowHiddenText(false);
    }
    if (file.size > 1 * 1000 * 1024) {
      setShowHiddenText(true)
    }
  };

  const formData = new FormData();
  formData.append('text', text);
  if (mediaFile) {
    formData.append('media', mediaFile);
  }

  const handleSubmitPost = async () => {
    await request(`${baseUrl + '/post'}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    });
    props.onClose();
  }
  return (
    <>
      <p className='font-bold text-lg mb-4'>Введите текс поста или прикрипите файл</p>
      <MyTextArea className='mb-4' value={text} rows={10} cols={20} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setText(e.target.value)} />
      <MyInputFile accept="image/png, image/jpeg, image/gif, video/mp4" onChange={e => handleFileChange(e)} />
      {showHiddenText && (<span>разрешены файлы меньше 1 МБ, jpeg, png gif, mp4</span>)}
      <MyButton className='mt-4' title={'Отправить'} disabled={showHiddenText} onClick={() => handleSubmitPost()} />
    </>
  )
}

export default ModalPostNew;