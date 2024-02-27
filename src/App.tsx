import { Button } from 'antd';
import useSWR from 'swr';
import { fetcher } from './utils/api';
import { useEffect } from 'react';
import { IUser } from './types/api';

const App = () => {
  const { data, error, isLoading } = useSWR<IUser[]>('https://jsonplaceholder.typicode.com/users', fetcher)

  useEffect(() => console.log(data), [data])
  return (
    <div className="App">
      {Array.isArray(data) && data.map(item =>
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.phone}</p>
          <p>{item.email}</p>
        </div>  
      )}
    </div>
  );
}

export default App;
