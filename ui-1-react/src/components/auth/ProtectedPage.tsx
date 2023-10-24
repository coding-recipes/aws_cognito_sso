import {
  Button,
  Text,
  Container,
  Flex
} from '@chakra-ui/react'
import { useAuth } from '../../modules/auth/auth.context'

export const ProtectedPage = () => {
  const { signIn } = useAuth()
  return <>
    <Container height={"100%"} >
      <Flex direction={"column"} alignItems={"center"} justifyContent={"center"} height={"100%"} gap={4}>
        <Text>The application is protected!</Text>
        <Text>Please sign up or sign in with your existing user account!</Text>
        <Button onClick={() => signIn()}>Sign in</Button>
      </Flex>
    </Container>
  </>
}