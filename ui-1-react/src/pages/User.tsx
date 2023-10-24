import { Heading } from '@chakra-ui/react'
import { UserProfile } from "../components/user"

export const UserPage = () => {
  return <>
    <Heading as="h1" size="lg" textAlign="left" paddingBottom={8}>User Profile</Heading>
    <UserProfile />
  </>
}