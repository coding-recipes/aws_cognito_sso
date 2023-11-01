import { InfoTableServerBody } from "./infoTableServer";
import { InfoTableUIBody } from "./infoTableUI";
import { Table, Tbody, Tr, Th, Td, TableContainer, Divider } from '@chakra-ui/react'
import styles from './info.module.css'
import { useState } from "react";
import { FaInfo } from 'react-icons/fa'
import { TbArrowsDiagonalMinimize2 } from 'react-icons/tb'


export const InfoPanel = () => {
  const [collapsed, setcollapsed] = useState(false)
  const toggle = () => setcollapsed(!collapsed)
  return <div
    className={`${styles.info_panel} ${collapsed ? styles.collapsed : styles.full}`}
    onClick={toggle}
  >
    {collapsed && <InfoIcon />}
    {!collapsed && <InfoTable />}
  </div>
}

const InfoIcon = () => {
  return <div className={styles.appear}>
    <FaInfo size={20} />
  </div>
}
const CollapseIcon = () => {
  return <TbArrowsDiagonalMinimize2 size={20} className={styles.collapse_icon} />
}

const InfoTable = () => {
  return <>
    <div className={`${styles.info_table} ${styles.appear}`}    >
      <TableContainer className={styles.info_table_container}>
        <Table size="sm">
          <Tbody>
            <Tr>
              <Th>UI Info</Th>
              <Td style={{ textAlign: "right" }}><CollapseIcon /></Td>
            </Tr>
            <InfoTableUIBody />
            <Tr>
              <Th colSpan={2} className={styles.info_table_divider}><Divider /></Th>
            </Tr>
            <Tr>
              <Th colSpan={2} style={{ textAlign: "center" }}>Server Info</Th>
            </Tr>
            <InfoTableServerBody />
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  </>
}
