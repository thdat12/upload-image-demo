import { PostContext, PostType } from "@/app/lib/context/postContext";
import { useContext } from "react";

import styles from "./styles.module.scss";

export default function PostList() {
  const { posts, setPosts } = useContext(PostContext);

  const handleRemovePost = async (id: string) => {
    const check = confirm("Are you sure you want to delete?");
    if (check) {
      const res = await fetch("/api/posts", {
        method: "DELETE",
        body: JSON.stringify({
          id,
        }),
      });
      if (!res.ok) {
        alert("Delete post failed");
      }
      const { result } = await res.json();
      setPosts(posts.filter((post) => post?.id !== result?.id));
    }
  };

  return (
    <>
      {posts?.length > 0 && (
        <div className={styles.container}>
          <div className={styles.helperTxt}>
            * Double click to delete the post
            <span>{posts?.length}/5</span>
          </div>
          {posts.map((post: PostType, index) => (
            <div
              key={index}
              className={styles.postWrapper}
              onDoubleClick={() => handleRemovePost(post?.id)}
            >
              <picture>
                <img
                  src={`data:image/${
                    post?.fileNm?.split(".").reverse()[0]
                  };base64, ${post?.fileData}`}
                  alt=""
                />
              </picture>
              <div className={styles.comment}>{post?.message}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
