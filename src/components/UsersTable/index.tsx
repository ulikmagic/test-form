import { Button, Flex, Layout, Table, TableProps } from "antd";
import { IUser } from "../../types/api"
import { CSSProperties, FC, memo, useMemo, useState } from "react";
import Search from "antd/es/input/Search";

interface UsersTableProps {
  users: IUser[]
  pageSize?: number
}

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
    render: () => (
      <Flex vertical gap="small">
        <Button type="primary">Изменить</Button>
        <Button>Удалить</Button>
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

const UsersTable: FC<UsersTableProps> = ({ users, pageSize = 5 }) => {
  const [search, setSearch] = useState<string>("")
  const filteredUsers = useMemo(() => searchUsers(users, search.trim()), [users, search])
  
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
          pagination={{ pageSize }}
          dataSource={filteredUsers}
        />
      </Flex>
    </Layout.Content>
  )
}

export default memo(UsersTable)
