import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

const ProfileListCard = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["single-user", userId],
    queryFn: async () => {
      const response = await fetch(`/api/user/getUserWithId/${userId}`);
      const { user } = await response.json();

      return user;
    },
  });

  //!refine this when there is actual data

  return (
    <>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>User: {data?.name}</div>
      )}
    </>
  );
};

export default ProfileListCard;
