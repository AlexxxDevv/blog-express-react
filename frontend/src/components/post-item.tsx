import { FC } from "react";
import styles from './post-item.module.css';

export type PostItemProps = {
  date: string;
  data: string;
  author: string;
  onClose: () => void;
  handlePatch: (e) => void;
}

const PostItem: FC<PostItemProps> = ({date, data, author, onClose, handlePatch}) => {
  return (
    <>
      <span>{date}</span>
      <span>{data}</span>
      <span>{author}</span>
      <span onClick={onClose} className={styles.trashButton}>&#10006;</span>
      <span onClick={e => handlePatch(e)} className={styles.patchButton}>ред</span>
    </>
  )
}

export default PostItem;