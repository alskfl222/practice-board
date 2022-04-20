// * data type
export interface UserType<T> {
  name: T;
  email: T;
  password: T;
  pn: T;
}

// * api response type
export interface LoginResponseType {
  status: number;
  msg: string;
  data?: {
    token: string;
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
