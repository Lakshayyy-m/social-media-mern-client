export type formDataType = {
  fullname?: string;
  email?: string;
  username?: string;
  password?: string;
};

export type UserType = {
  name: string;
  username: string;
  email: string;
  followers: string[];
  following: string[];
  bio: string;
  profileImg: string;
};
