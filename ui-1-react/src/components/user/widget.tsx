import { Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'
import { FaRegUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuth } from '../../modules/auth'
import style from './user.module.css'

export const UserWidget = () => {
  const { signOut } = useAuth()
  return (
    <div className={style.userwidget_menu}>
      <Menu >
        <MenuButton className={style.userwidget_button}>
          <FaRegUser />
        </MenuButton>
        <MenuList className={style.userwidget_list}>
          <MenuItem as={Link} to={"/user"}>Profile</MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}