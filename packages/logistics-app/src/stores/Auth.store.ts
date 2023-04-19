import { makeAutoObservable } from "mobx"
import Cookie from 'mobx-cookie';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

class AuthStore {
  cookie = new Cookie('workout@user');
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
    const { value } = this.cookie;
    if (value) this.user = JSON.parse(value);
  }

  login(user: IUser) {
    this.cookie.set(JSON.stringify(user));
    this.user = user;
  }

  logout() {
    this.cookie.remove();
    this.user = null;
  }
}

export const authStore = new AuthStore();