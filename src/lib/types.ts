export type formDataType = {
  fullname?: string;
  email?: string;
  username?: string;
  password?: string;
};

export type UserType = {
  _id: string;
  name: string;
  username: string;
  email: string;
  followers: string[];
  following: string[];
  bio: string;
  profileImg: string;
};

export type CommentType = {
  commentId: string;
  userId: string;
  body: string;
  likesCount: string[];
};

export type PostType = {
  _id: string;
  userId: string;
  imgUrl: string[];
  comments: CommentType[];
  description: string;
  createdAt: string;
  likes: string[];
};
