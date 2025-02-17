import { FC } from "react";
import { baseUrl } from "../utils/api";
import { User } from "@/common/types";
import MyIconButton from "./MyIconButton";
import { Edit, Trash2 } from "lucide-react";

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

const PostItem: FC<PostItemProps> = ({ date, data, author, owner, onClose, handlePatch, user, media }) => {
  return (
    <>
      <div className="mb-4 grid items-center grid-cols-[40px_1fr] gap-x-2 gap-y-0">
        {media ? (<div>{media.endsWith('.mp4') ? (
          <video className='' src={`${baseUrl}/${media.slice(10)}`} controls width="100%" />
        ) : (
          <img className='rounded-full border-2 border-white/50 h-10 w-10' src={`${baseUrl}/${media.slice(10)}`} alt="Post media" width="100%" />
        )}</div>) : (<img className='rounded-full border-2 border-white/50 h-10 w-10' src="noavatar.jpg" alt="картинка обозначающая отсутсиве аватара" />)}
        <span className="font-bold text-left">{author}</span>
      </div>
      <p className="mb-4 text-left">{data}</p>
      <p className="mb-4 text-right text-sm">{date}</p>
      {user && user?.id === owner && <div className="absolute right-3 top-3 flex gap-1">
        <MyIconButton onClick={onClose}>{<Trash2 className="h-4 w-4" />}</MyIconButton>
        <MyIconButton onClick={() => handlePatch()}><Edit className="h-4 w-4" /></MyIconButton>
      </div>}
    </>
  )
}

export default PostItem;