import { IUser } from "../types/api";
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3001/'
});

export const USERS_KEY = 'users'

export const fetchUsers = async (url: string): Promise<IUser[] | unknown> => {
  try {
    const { data } = await instance.get<IUser[]>(url);
    return data;
  } catch (error) {
    return error
  }
};

export const fetchDeleteUser = async (id: IUser['id']): Promise<IUser | unknown> => {
  try {
    const { data } = await instance.delete<IUser>(`users/${id}`);
    return data;
  } catch (error) {
    return error
  }
}

export const fetchEditUser = async (user: IUser): Promise<IUser | unknown> => {
  try {
    const { data } = await instance.put<IUser>(`users/${user.id}`, user);
    return data;
  } catch (error) {
    return error
  }
}