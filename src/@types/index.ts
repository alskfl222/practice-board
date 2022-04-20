// * data type
export interface UserType<T> {
  name: T;
  email: T;
  password: T;
  pn: T;
}
export interface PostType {
  id: number;
  title: string;
  contents: string;
  author: string;
  createdAt: Date;
  postType?: string;
  filename?: string;
}
export interface PostQueryType {
  postType: string;
  pageSize: number;
  page: number;
}

// * api response type
export interface ResponseType {
  status: number;
  msg: string;
}

export interface SigninResponseType extends ResponseType {
  data?: {
    token: string;
  };
}
export interface PostResponseType extends ResponseType {
  data?: {
    posts: PostType[],
    totalCount: number,
    page: number,
    pageSize: number,
    keyword: string,
  }
}

// * components type
export interface InputTextLineType {
  name: string;
  type: string;
  placeholder: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export interface SendButtonType {
  disabled?: boolean;
  children: string;
}
