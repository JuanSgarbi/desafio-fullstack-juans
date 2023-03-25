import { ReactNode } from "react";

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IProviderProps {
  children: ReactNode;
}

export interface IRegisterUser {
  email: string;
  password: string;
  phone_number: string;
  full_name: string;
}

export interface IUserInfos {
  email: string;
  phone_number: string;
  full_name: string;
  createdAt: string;
  is_client: boolean;
  id: string;
  contacts: IContacts[];
}

export interface IContacts {
  id: string;
  email: string;
  phone_number: string;
  full_name: string;
}

export interface IToken {
  token: string;
}

export interface IUpdateUser {
  email?: string;
  phone_number?: string;
  full_name?: string;
}

export interface IRegisterContact {
  email: string;
  phone_number: string;
  full_name: string;
}
