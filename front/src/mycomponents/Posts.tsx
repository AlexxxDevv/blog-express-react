import { FC, useEffect, useState } from "react";
import { baseUrl, request } from "../utils/api"
import PostItem from "./PostItem";
import { Post, User } from "@/common/types";
const bgColors = [
  'hsl(263, 55%, 52%)', // --color-primary
  'hsl(217, 19%, 35%)', // --color-primary-dark
  'hsl(219, 29%, 14%)', // --color-primary-blackish
  'hsl(0, 0%, 81%)',    // --color-gray-100
];

export type PostProps = {
  post: Post[] | undefined;
  sendData: (val: number) => void;
  user: User | undefined;
}

const Posts: FC<PostProps> = ({ post, sendData, user }) => {
  const token = localStorage.getItem('accessToken');
  const [posts, setPosts] = useState<Post[]>();
  const fetchData = () => {
    request(`${baseUrl + '/post'}`)
      .then(data => {
        setPosts(data)
      });
  }
  useEffect(() => {
    if (post) { setPosts(post) }
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
        <ul className='grid gap-8 mt-5'>
          {posts.map((post, index) => {
            const bgColor = bgColors[index % 4]; // Цикл из 4 цветов
            const textClass = index % 4 === 3 ? 'text-dark' : 'text-white';
            return (
              <li
                style={{ backgroundColor: bgColor }}
                className={`${textClass} rounded-lg p-8 relative`}
                key={post.id}
              >
                <PostItem
                  user={user}
                  handlePatch={() => sendData(post.id)}
                  onClose={() => handleDeletePostItem(post.id)}
                  date={new Date(post.createdAt).toLocaleString()}
                  data={post.text}
                  author={post.owner.username}
                  owner={post.owner.id}
                  media={post.media}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  )
}

export default Posts;