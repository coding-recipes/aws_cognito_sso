import { Button, Text, Container, Flex } from '@chakra-ui/react'
import { useAuth } from '../../modules/auth'
import style from './auth.module.css'
import { MdKeyboardArrowRight } from 'react-icons/md'

export const ProtectedPage = () => {
  const { signIn } = useAuth()
  const authCallbackPage = window.location.pathname
  const onSignIn = () => {
    signIn(authCallbackPage)
  }
  return <>
    <Container height={"100%"} maxWidth={"unset"} className={style.protected_page} >
      <Flex direction={"column"} alignItems={"center"} justifyContent={"center"} height={"100%"} gap={4}>
        <Text fontSize='3xl'>Cognito Single Sign-On (SSO)</Text>
        <Text fontSize='2xl'>Demo App - React UI</Text>
        <Text fontSize='xl' marginTop={10}>The application is protected!</Text>
        <Text fontSize='lg'>Please use SSO login page to sign in or sign up!</Text>
        <Button
          colorScheme='white'
          variant='outline'
          size='md'
          marginTop={10}
          onClick={onSignIn}
          rightIcon={<MdKeyboardArrowRight />}
        >Go to SSO login</Button>
      </Flex>
    </Container>
  </>
}