import { createContext, useState } from "react";

type PostProviderProps = {
  children: React.ReactNode;
};

export type PostType = {
  id: string;
  fileNm: string;
  fileData: string;
  message: string;
};

const PostContext = createContext({
  posts: [] as PostType[],
  setPosts: (post: any) => {},
});

const PostProvider: React.FC<PostProviderProps> = ({
  children,
}: PostProviderProps) => {
  const [posts, setPosts] = useState<PostType[]>([]);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};
export { PostContext, PostProvider };
