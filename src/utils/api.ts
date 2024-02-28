import { IUser } from "../types/api";
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3001/'
});

export const USERS_KEY = 'users'

export const fetchUsers = async (url: string): Promise<IUser[]> => {
  const { data } = await instance.get<IUser[]>(url)
  return data
};

export const fetchDeleteUser = async (id: IUser['id']) => {
  const { data } = await instance.delete(`users/${id}`)
  return data
}

export const fetchEditUser = async (user: IUser) => {
  const { data } = await instance.put(`users/${user.id}`, user)
  return data
}