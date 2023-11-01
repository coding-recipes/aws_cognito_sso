import React, { useMemo } from "react"
import { Table, Tbody, Tr, Th, Td, TableContainer, Link } from '@chakra-ui/react'
import { config, Config } from "../../config"

export const InfoTableUI = () => {
  return <>
    <TableContainer>
      <Table size="sm">
        <Tbody>
          <InfoTableUIBody />
        </Tbody>
      </Table>
    </TableContainer>
  </>
}

export const InfoTableUIBody = () => {
  const ui_info: Config["ui_info"] = useMemo(() => {
    return config().ui_info
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return <>
    <Tr><Th>Framework</Th><Td>{ui_info.framework}</Td></Tr>
    <Tr><Th>Repo</Th>
      <Td>
        <Link href={ui_info.repo} isExternal onClick={handleClick}>{ui_info.repo}</Link>
      </Td>
    </Tr>
  </>
}