import {
  Button,
  Text,
  Container,
  Flex
} from '@chakra-ui/react'
import { authSignIn } from '../actions'

export const SignInPage = () => {
  return <>
    <Container height={"100%"} >
      <Flex direction={"column"} alignItems={"center"} justifyContent={"center"} height={"100%"} gap={4}>
        <Text>The application is protected!</Text>
        <Text>Please sign up or sign in with your existing user account!</Text>
        <Button onClick={() => authSignIn()}>Sign in</Button>
      </Flex>
    </Container>
  </>
}