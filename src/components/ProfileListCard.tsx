import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import { UserType } from "../lib/types";
import { NavLink } from "react-router-dom";
import profilePic from "../assets/profileImgWhite.svg";

const ProfileListCardPart = ({ user }: { user: UserType }) => {
  return (
    <NavLink to={`/user/${user._id}`} className="my-2 flex items-center gap-4">
      <img
        src={user?.profileImg === "" ? profilePic : user?.profileImg}
        alt={user.username}
        className="min-w-[60px] max-w-[60px]"
      />
      <div>
        <h3 className="text-white">{user.name}</h3>
        <h4 className="text-white text-sm italic">@{user.username}</h4>
      </div>
    </NavLink>
  );
};

const ProfileListCard = ({
  userId,
  user,
}: {
  userId?: string;
  user?: UserType;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["single-user", userId],
    queryFn: async () => {
      const response = await fetch(`/api/user/getUserWithId/${userId}`);
      const { user } = await response.json();

      return user;
    },
    enabled: !user,
  });

  //!refine this when there is actual data

  return (
    <>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <ProfileListCardPart user={user ?? data} />
      )}
    </>
  );
};

export default ProfileListCard;
