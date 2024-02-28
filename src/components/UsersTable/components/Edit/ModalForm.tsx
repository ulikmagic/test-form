import { fetchEditUser } from "../../../../utils/api";
import { IUser } from "../../../../types/api";
import { Button, Form, Input, Modal, notification } from "antd"
import { FC, useContext, useState } from "react";
import { UpdateDataContext } from "../..";

interface ModalFormProps {
  user: IUser
  isOpen: boolean
  close: () => void
}

const ModalForm: FC<ModalFormProps> = ({ user, isOpen, close }) => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const updateData = useContext(UpdateDataContext);

  const sendRequest = async (data: Omit<IUser, 'id'>) => {
    setIsLoading(true)

    try {
      await fetchEditUser({ ...data, id: user.id })
      notification.open({
        message: `Редактирование прошло успешно!`,
        type: 'success',
      })
      updateData()
    } catch {
        notification.open({
          message: 'Произошла ошибка',
          type: 'error',
        })
    } finally {
      setIsLoading(false)
      close()
    }
  }

  return (
    <Modal
        title={`Редактирование пользователя - ${user.name}`}
        confirmLoading={isLoading}
        open={isOpen}
        footer={null}
        onCancel={close}
      >
        <Form
          initialValues={user}
          form={form}
          onFinish={sendRequest}
          disabled={isLoading}
        >
          <Form.Item<IUser>
            label="Имя"
            name="name"
            rules={[{ required: true, message: 'Поле "Имя" не должен быть пустым' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IUser>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Поле "email" не должен быть пустым' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IUser>
            label="Телефон"
            name="phone"
            rules={[{ required: true, message: 'Поле "phone" не должен быть пустым' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>Изменить</Button>
          </Form.Item>
        </Form>
      </Modal>
  )
}

export default ModalForm
