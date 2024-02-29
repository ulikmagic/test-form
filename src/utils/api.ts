import { IUser } from "../types/api";
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3001/'
});

export const USERS_KEY = 'users'

export const fetchUsers = async (): Promise<IUser[]> => {
  try {
    const { data } = await instance.get<IUser[]>(USERS_KEY);
    return data;
  } catch (error) {
    throw error
  }
};

export const fetchDeleteUser = async (id: IUser['id']): Promise<IUser> => {
  try {
    const { data } = await instance.delete<IUser>(`${USERS_KEY}/${id}`);
    return data;
  } catch (error) {
    throw error
  }
}

export const fetchEditUser = async (user: IUser): Promise<IUser> => {
  try {
    const { data } = await instance.put<IUser>(`${USERS_KEY}/${user.id}`, user);
    return data;
  } catch (error) {
    throw error
  }
}