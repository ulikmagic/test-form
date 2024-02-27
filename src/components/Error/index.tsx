import { Flex, Result } from "antd"

const Error = () => (
  <Flex justify="center" align="center" style={{  height: '100%' }}>
    <Result status="error" title="Произошла ошибка!" />
  </Flex>
)

export default Error
