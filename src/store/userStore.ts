import { atom, Atom } from 'jotai'

interface User{
    token: string;
    response: "success";
    doctor: {
      email: string;
      password: string;
      name: string;
      specialty?: string;
      role: string;
      _id: string;
      __v: number;
    };
  }
  

export const userAtom = atom<User>({
    token: '',
    response: "success",
    doctor: {
      email: '',
      password: '',
      name: '',
      role: '',
      _id: '',
      __v: 0,
    },
})