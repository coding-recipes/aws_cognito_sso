import { Heading } from '@chakra-ui/react'
import { ServerInfoComponent } from "../components/info"

export const ServerInfoPage = () => {
  return <>
    <Heading as="h1" size="lg" textAlign="left" paddingBottom={8}>Server Info</Heading>
    <ServerInfoComponent />
  </>
}