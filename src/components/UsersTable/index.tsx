import { Button, Flex, Layout, Spin, Table, TableProps } from "antd";
import { IUser } from "../../types/api"
import { CSSProperties, memo, useMemo, useState } from "react";
import Search from "antd/es/input/Search";
import { fetchUsers, USERS_KEY } from "../../utils/api";
import useSWR from "swr";
import Error from "../Error";
import Edit from "./components/Edit";
import Delete from "./components/Delete";

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
        <Delete id={record.id} />
      </Flex>
    ),
  },
];

const ContentStyle: CSSProperties = {
  padding: '20px 50px'
};

const searchUsers = (users: IUser[], value: string) => {
  if(!value.length) return users

  return users.filter(user => user.name.toLowerCase().includes(value.toLowerCase()))
}

const UsersTable = () => {
  const { data = [], error, isLoading } = useSWR<IUser[]>(USERS_KEY, fetchUsers)
  const [search, setSearch] = useState<string>("")
  const filteredUsers = useMemo(() => searchUsers(data, search.trim()), [data, search])
  
  if(isLoading) return <Spin fullscreen size="large" />
  if(error) return <Error />
  return (
    <Layout.Content style={ContentStyle}>
      <Flex vertical gap={20}>
        <Search
          placeholder="Поиск по имени"
          size="large"
          allowClear
          enterButton="Поиск"
          style={{ width: 500 }}
          onSearch={setSearch}
        />
        <Table
          columns={columns}
          pagination={{ pageSize: 5 }}
          dataSource={filteredUsers}
        />
      </Flex>
    </Layout.Content>
  )
}

export default memo(UsersTable)
