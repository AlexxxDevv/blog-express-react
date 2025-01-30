import { FC, useEffect, useState } from "react";
import { baseUrl, request } from "../utils/api"
import PostItem from "./post-item";
import styles from './posts.module.css';

export type User = {
  id: number;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export type Post = {
  id: number;
  createdAt: string;
  updatedAt: string;
  text: string;
  owner: User;
}

export type PostProps = {
  post: Post[] | undefined;
}

const Posts: FC<PostProps> = ({ post }) => {
  console.log(post)
  const token = localStorage.getItem('accessToken');
  const [posts, setPosts] = useState<Post[]>()
  const fetchData = () => {
    request(`${baseUrl + '/post'}`)
      .then(data => {
        setPosts(data)
      });
  }
  useEffect(() => {
    if(post){setPosts(post)}
    fetchData()
  }, [post])

  const handleDeletePostItem = async (id: number) => {
    await request(`${baseUrl + '/post/' + id}`, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`,
      },
    });
    fetchData()
  }
  return (
    <>
      {posts && (
        <ul className={styles.postList}>
          {posts.map(post => (
            <li className={styles.postitem} key={post.id}><PostItem onClose={() => handleDeletePostItem(post.id)} date={post.createdAt} data={post.text} author={post.owner.username} /></li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Posts;