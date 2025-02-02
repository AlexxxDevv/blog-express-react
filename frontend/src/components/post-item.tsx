import { FC } from "react";
import styles from './post-item.module.css';
import { User } from "./posts";
import { baseUrl } from "../utils/api";

export type PostItemProps = {
  date: string;
  media: string;
  data: string;
  author: string;
  owner: number;
  onClose: () => void;
  handlePatch: () => void;
  user: User | undefined;
}

const PostItem: FC<PostItemProps> = ({date, data, author, owner, onClose, handlePatch, user, media}) => {
  return (
    <>
      <span>{date}</span>
      <span>{data}</span>
      {media ? ( <span>{media.endsWith('.mp4') ? (
            <video className={styles.media} src={`http://${baseUrl}/${media.slice(10)}`} controls width="100%" />
          ) : (
            <img className={styles.media} src={`http://${baseUrl}/${media.slice(10)}`} alt="Post media" width="100%" />
          )}</span>) : (<span>Здесь может быть медиафайл</span>)}
      <span>{author}</span>
      <button disabled={user?.id !== owner} onClick={onClose} className={styles.trashButton}>&#10006;</button>
      <button disabled={user?.id !== owner} onClick={()=> handlePatch()} className={styles.patchButton}>&#128396;</button>
    </>
  )
}

export default PostItem;