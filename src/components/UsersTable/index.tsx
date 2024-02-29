import { Flex, Layout, Spin, Table, TableProps } from "antd";
import { IUser } from "../../types/api"
import { createContext, memo, useMemo, useState } from "react";
import Search from "antd/es/input/Search";
import { fetchUsers, USERS_KEY } from "../../utils/api";
import useSWR from "swr";
import Error from "../Error";
import Edit from "./components/Edit";
import Delete from "./components/Delete";
import { AxiosError } from "axios";

const columns: TableProps<IUser>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Номер телефона',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Действия',
    key: 'action',
    render: (_, record) => (
      <Flex vertical gap="small">
        <Edit user={record} />
        <Delete user={record} />
      </Flex>
    ),
  },
];

const searchUsers = (users: IUser[], value: string) => {
  if(!value.length) return users

  return users.filter(user => user.name.toLowerCase().includes(value.toLowerCase()))
}

export const UpdateDataContext = createContext(() => {});

const UsersTable = () => {
  // Используем ключ USERS_KEY для кэширования данных и избежания повторных запросов к серверу с помощью useSWR.
  const { data = [], error, isLoading, mutate } = useSWR<IUser[], AxiosError>(USERS_KEY, fetchUsers) 
  const [search, setSearch] = useState<string>("")
  const filteredUsers = useMemo(() => searchUsers(data, search.trim()), [data, search])

  if(error) return <Error />
  return (
    <UpdateDataContext.Provider value={mutate}>
      <Layout.Content style={{ padding: '20px 50px' }}>
        <Flex vertical gap={20}>
          <Search
            placeholder="Поиск по имени"
            size="large"
            allowClear
            enterButton="Поиск"
            style={{ width: 500 }}
            onSearch={setSearch}
            loading={isLoading}
          />
          <Table
            columns={columns}
            pagination={{ pageSize: 5 }}
            dataSource={filteredUsers}
            loading={{ spinning: isLoading, indicator: <Spin size="large" /> }}
            rowKey='id'
          />
        </Flex>
      </Layout.Content>
    </UpdateDataContext.Provider>
  )
}

export default memo(UsersTable)
