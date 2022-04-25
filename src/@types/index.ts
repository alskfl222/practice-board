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
