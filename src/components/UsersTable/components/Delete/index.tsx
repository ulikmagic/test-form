import { fetchDeleteUser } from "../../../../utils/api"
import { IUser } from "../../../../types/api"
import { Button, Modal, notification } from "antd"
import { FC, useContext, useState } from "react"
import { UpdateDataContext } from "../.."

interface DeleteProps {
  user: IUser
}

const Delete: FC<DeleteProps> = ({ user }) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const updateData = useContext(UpdateDataContext);
  
  const sendRequest = async () => {
    setIsLoading(true)

    try {
      const response = await fetchDeleteUser(user.id)
      notification.open({
        message: `Удаление ${user.name} прошло успешно!`,
        type: 'success',
      })
      updateData()
    } catch(err) {
      notification.open({
        message: 'Произошла ошибка',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Удалить</Button>
      <Modal
        title={`Вы действительно хотите удалить данного пользователя - "${user.name}"`}
        confirmLoading={isLoading}
        open={open}
        okType="danger"
        okText="Да"
        cancelText="Нет"
        onCancel={() => setOpen(false)}
        onOk={sendRequest}
      />
    </>
  )
}

export default Delete
