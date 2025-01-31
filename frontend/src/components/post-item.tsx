import { FC } from "react";
import styles from './post-item.module.css';
import { User } from "./posts";

export type PostItemProps = {
  date: string;
  data: string;
  author: string;
  owner: number;
  onClose: () => void;
  handlePatch: () => void;
  user: User | undefined;
}

const PostItem: FC<PostItemProps> = ({date, data, author, owner, onClose, handlePatch, user}) => {
  return (
    <>
      <span>{date}</span>
      <span>{data}</span>
      <span>{author}</span>
      <button disabled={user?.id !== owner} onClick={onClose} className={styles.trashButton}>&#10006;</button>
      <button disabled={user?.id !== owner} onClick={()=> handlePatch()} className={styles.patchButton}>&#128396;</button>
    </>
  )
}

export default PostItem;