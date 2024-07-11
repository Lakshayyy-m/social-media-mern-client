import { UserType } from "../lib/types";
import profilePic from "../assets/profileImgWhite.svg";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useState } from "react";
import { cn } from "../lib/utils";
import ProfileListCard from "./ProfileListCard";
import PostsSection from "./PostsSection";
import Button from "./InteractiveButton";
import { UseMutateFunction } from "@tanstack/react-query";

const Profile = ({
  user,
  self,
  logout,
}: {
  user: UserType;
  self: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logout: UseMutateFunction<any, Error, void, unknown>;
}) => {
  const [isFollowersActive, setIsFollowersIsActive] = useState(true);

  return (
    <main className="p-4 flex max-lg:flex-col min-h-[200px]">
      <section className="lg:w-[50%] flex flex-col gap-20">
        <div className="flex max-lg:flex-col max-lg:justify-center lg:items-center gap-11 max-lg:mb-16">
          <img
            src={user?.profileImg === "" ? profilePic : user?.profileImg}
            alt={user.name}
            className="w-[120px] max-lg:m-auto"
          />
          <div className="flex flex-col gap-2">
            <h5 className="text-white italic">@{user.username}</h5>
            <div>
              <h2 className="text-4xl max-md:text-2xl font-semibold text-white">
                {user.name}
              </h2>
              {self && (
                <Button className="text-white" onClick={() => logout()}>
                  Logout
                </Button>
              )}
            </div>
            <h3 className="text-white italic">
              {user.bio.length === 0 ? "No bio added" : user.bio}
            </h3>
          </div>
        </div>
        <div className="w-full px-10 max-lg:hidden">
          <Tabs
            defaultValue="followers"
            className="w-full bg-dark-1 min-h-[400px] rounded-xl"
          >
            <TabsList className=" w-full bg-dark-2">
              <TabsTrigger
                value="followers"
                className={cn("w-full", {
                  "text-white": !isFollowersActive,
                })}
                onClick={() => setIsFollowersIsActive(true)}
              >
                Followers
              </TabsTrigger>
              <TabsTrigger
                value="following"
                className={cn("w-full", {
                  "text-gray-200": isFollowersActive,
                })}
                onClick={() => setIsFollowersIsActive(false)}
              >
                Following
              </TabsTrigger>
            </TabsList>
            <TabsContent value="followers">
              {user.followers.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[400px]">
                  <h2 className="text-2xl font-semibold text-white">
                    No followers yet.
                  </h2>
                  <h3 className="text-white italic">
                    When someone follows you, they will appear here.
                  </h3>
                </div>
              ) : (
                <div className="scroll-auto">
                  {user.followers.map((follower: string) => (
                    <ProfileListCard userId={follower} key={follower} />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="following">
              {user.following.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[400px]">
                  <h2 className="text-2xl font-semibold text-white">
                    No followings yet.
                  </h2>
                  <h3 className="text-white italic">
                    When you follows someone, they will appear here.
                  </h3>
                </div>
              ) : (
                <div className="scroll-auto">
                  {user.following.map((following: string) => (
                    <ProfileListCard userId={following} key={following} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <section className="lg:w-[50%]">
        <PostsSection userId={user._id} />
      </section>
    </main>
  );
};

export default Profile;
