import { Table, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'
import { uiInfo } from "../../config"
import { MaskedLink } from "./utils"

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

export const InfoTableUIBody = ({ maskLink = false }: { maskLink?: boolean }) => {
  return <>
    <Tr><Th>Framework</Th><Td>{uiInfo.framework}</Td></Tr>
    <Tr><Th>Repo</Th>
      <Td>
        <MaskedLink mask={maskLink} link={uiInfo.repo} />
      </Td>
    </Tr>
  </>
}