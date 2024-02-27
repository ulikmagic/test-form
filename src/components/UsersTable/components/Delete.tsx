import { Button } from "antd"
import { FC } from "react"

interface DeleteProps {
  id: string | number
}

const Delete: FC<DeleteProps> = ({ id }) => (
  <Button>Удалить</Button>
)

export default Delete
