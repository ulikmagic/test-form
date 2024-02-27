import { Layout, Spin } from "antd";
import UsersTable from "./components/UsersTable";
import { IUser } from "./types/api";
import useSWR from "swr";
import { fetchUsers, USERS_KEY } from "./utils/api";
import Error from "./components/Error";

const App = () => {
  const { data = [], error, isLoading } = useSWR<IUser[]>(USERS_KEY, fetchUsers)

  return (
    <Layout style={{ height: '100vh' }}>
      {isLoading && <Spin fullscreen size="large" />}
      {error ? <Error /> : <UsersTable users={data} />}
    </Layout>
)}

export default App;
