import { useQuery } from "@tanstack/react-query";
import { PostType } from "../lib/types";
import { Separator } from "./ui/separator";
import Loading from "./Loading";
import { NavLink } from "react-router-dom";
import { MyError } from "../lib/MyError";

const PostsSection = ({ userId }: { userId: string }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", userId],
    queryFn: async () => {
      const response = await fetch(`/api/post/getPostsByUserId/${userId}`);
      const { posts, message } = await response.json();

      if (response.status !== 200) {
        throw new MyError(message, response.status);
      }

      return posts as PostType[];
    },
  });

  return (
    <div>
      <h1 className="w-full text-center text-white text-4xl font-semibold">
        Posts
      </h1>
      <Separator className="w-[90%] mx-auto my-10" />
      <div className="w-full grid grid-cols-2 gap-10 justify-center items-center min-h-[400px] bg-dark-2 rounded-xl scroll-auto">
        {isLoading ? (
          <div className="w-full h-full col-span-2 flex justify-center items-center">
            <Loading />
          </div>
        ) : isError ? (
          <div className="text-white text-center col-span-2">
            {error.message}
          </div>
        ) : (
          <>
            {data?.length === 0 ? (
              <div className="w-full italic text-white text-center col-span-2">
                No posts yet
              </div>
            ) : (
              data?.map((post) => (
                <NavLink to={`/`}>
                  <img src={post.imgUrl[0]} alt="Post" className="w-20" />
                </NavLink>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostsSection;
