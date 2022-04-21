import React from "react";

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
  createdAt: string;
  postType?: string;
  filename?: string;
  view?: number;
  isFile?: number;
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
    posts?: PostType[];
    post?: PostType;
    totalCount?: number;
    page?: number;
    pageSize?: number;
    keyword?: string;
  };
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
