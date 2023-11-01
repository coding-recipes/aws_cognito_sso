import { useCurrentUser } from "../../modules/resources";
import { FullLoader } from "../atoms";
import { Table, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'

export const UserProfile = () => {
  const [useQuery] = useCurrentUser() // [query, refresh
  const { status, data } = useQuery();

  return <>
    {status == "loading" && <FullLoader height="200px" />}
    {status == "success" && <>
      <TableContainer>
        <Table size="sm">
          <Tbody>
            <Tr>
              <Th colSpan={2} style={{ textAlign: "center" }}>Identity</Th>
            </Tr>
            <Tr>
              <Th>Username</Th>
              <Td>{data.identity.userName}</Td>
            </Tr>
            <Tr>
              <Th>User ID</Th>
              <Td>{data.identity.sub}</Td>
            </Tr>
            <Tr>
              <Th>Client ID</Th>
              <Td>{data.identity.clientId}</Td>
            </Tr>

            <Tr>
              <Th colSpan={2} style={{ textAlign: "center" }}>Data</Th>
            </Tr>
            <Tr>
              <Th>...</Th>
              <Td>...</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
    }
  </>
}