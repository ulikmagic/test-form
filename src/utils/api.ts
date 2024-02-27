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