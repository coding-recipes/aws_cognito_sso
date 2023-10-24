import { Flex, Container } from '@chakra-ui/react'
import style from './layout.module.css'
import { Navigation } from './navigation'
import { UserWidget } from '../user'

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  return <>
    <div className='app-layout'>
      <LayoutHeader />
      <LayoutContent children={children} />
    </div>
  </>
}

const LayoutHeader = () => {
  return <>
    <Flex className={style.header} alignItems="center">
      <Flex direction='row' className={style.header_content} >
        <Flex direction='row' gap={16}>
          <h1>Cognito SSO demo - React UI</h1>
          <Navigation />
        </Flex>
        <UserWidget />
      </Flex>
    </Flex>
  </>
}

const LayoutContent = ({ children }: { children?: React.ReactNode }) => {
  return <>
    <Container w={"100%"} maxW={"900px"} padding={10}>
      {children}
    </Container>
  </>
}


