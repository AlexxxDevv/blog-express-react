import { FC, ReactNode } from 'react';

export type MyIconButtonProps = {
  onClick: () => void;
  children: ReactNode;
}

const MyIconButton: FC<MyIconButtonProps> = ({ onClick, children }) => {
  return (
    <button className="cursor-pointer" onClick={onClick}>
      {children}
    </button>
  );
};

export default MyIconButton;