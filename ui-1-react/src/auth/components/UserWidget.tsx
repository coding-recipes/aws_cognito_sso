import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from '@chakra-ui/react'
import { FaRegUser } from 'react-icons/fa'
import style from './auth.module.css'
import { Link } from 'react-router-dom'
import { authSignOut } from '../actions'

export const UserWidget = () => {
  return (
    <div className={style.userwidget_menu}>
      <Menu >
        <MenuButton className={style.userwidget_button}>
          <FaRegUser />
        </MenuButton>
        <MenuList className={style.userwidget_list}>
          <MenuItem as={Link} to={"/user"}>Profile</MenuItem>
          <MenuDivider />
          <MenuItem onClick={authSignOut}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}