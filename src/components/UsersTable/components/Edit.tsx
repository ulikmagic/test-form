import { FC } from "react"
import { IUser } from "../../../types/api"
import { Button } from "antd"

interface EditProps {
  user: IUser
}

const Edit: FC<EditProps> = ({ user }) => (
  <Button type="primary">Изменить</Button>
)

export default Edit
