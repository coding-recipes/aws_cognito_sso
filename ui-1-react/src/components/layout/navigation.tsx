import { Stack, Button } from '@chakra-ui/react'
import { Link as DLink } from 'react-router-dom'
import style from './layout.module.css'

export const Navigation = () => {
  return <Stack direction='row' className={style.header_links} gap={8}>
    <HeaderButton to={"/stats"} text="Stats" />
    <HeaderButton to={"/user"} text="User" />
  </Stack>
}


const HeaderButton = ({ text, to, isActive = false }: { text: string, to: string, isActive?: boolean }) => {
  return <Button as={DLink} to={to} size='sm' color="white" variant='link' isActive={isActive}>{text}</Button>
}
