/* eslint-disable no-unused-vars */
import React from 'react';

// * data type
export interface UserType {
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  pn: string;
}
export interface PostType {
  id?: number;
  title: string;
  contents: string;
  author?: string;
  createdAt?: string;
  postType?: string;
  filename?: string;
  view?: number;
  isFile?: number;
}
export interface PostQueryType {
  postType: string;
  pageSize: string;
  page: string;
  keyword: string;
}

//* React event type
export type PostEventType = React.ChangeEvent<HTMLSelectElement> &
  React.ChangeEvent<HTMLInputElement> &
  React.ChangeEvent<HTMLTextAreaElement> &
  React.MouseEvent<HTMLAnchorElement> &
  React.MouseEvent<HTMLButtonElement> &
  React.KeyboardEvent<HTMLInputElement>;

// * component props type
export interface PostListHeaderProps {
  query: URLSearchParams;
  onChange: (key: keyof PostQueryType) => (e: PostEventType) => void;
}
export interface PostListBodyProps {
  isLoading: boolean;
  postList: PostType[];
  isLogin: boolean;
  message: string;
  onDelete: (id: PostType['id']) => void;
}
export interface PostListFooterProps {
  totalPageCount: number;
  query: URLSearchParams;
  onChange: (key: keyof PostQueryType) => (e: PostEventType) => void;
  isLogin: boolean;
}
