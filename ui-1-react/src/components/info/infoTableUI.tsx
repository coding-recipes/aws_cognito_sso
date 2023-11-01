import React from "react"
import { Table, Tbody, Tr, Th, Td, TableContainer, Link } from '@chakra-ui/react'
import { uiInfo } from "../../config"

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
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return <>
    <Tr><Th>Framework</Th><Td>{uiInfo.framework}</Td></Tr>
    <Tr><Th>Repo</Th>
      <Td>
        <Link href={uiInfo.repo} isExternal onClick={handleClick}>open page &rarr;</Link>
      </Td>
    </Tr>
  </>
}