import { FC, useState } from "react"
import { IUser } from "../../../../types/api"
import { Button } from "antd"
import ModalForm from "./ModalForm"

interface EditProps {
  user: IUser
}

const Edit: FC<EditProps> = ({ user }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>Изменить</Button>
      <ModalForm isOpen={open} close={() => setOpen(false)} user={user} />
    </>
  )
}

export default Edit
