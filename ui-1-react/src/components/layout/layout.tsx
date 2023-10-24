import { Flex } from '@chakra-ui/react'
import { UserWidget } from '../../auth'
import { Navigation } from './navigation'
import style from './layout.module.css'

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  return <>
    <div className='app-layout'>
      <LayoutHeader />
      <LayoutContent children={children} />
      {/* <LayoutFooter /> */}
    </div>
  </>
}



export const LayoutHeader = () => {
  return <>
    <Flex className={style.header} alignItems="center">
      <Flex direction='row' className={style.header_content} >
        <h1>Cognito SSO demo - React UI</h1>
        <Navigation />
        <UserWidget />
      </Flex>
    </Flex>
  </>
}

export const LayoutFooter = () => {
  return <>
    <div className='layout-footer'>
      <h1>Footer</h1>
    </div>
  </>
}

export const LayoutContent = ({ children }: { children?: React.ReactNode }) => {
  return <>
    <div className='layout-content'>
      {children}
    </div>
  </>
}


