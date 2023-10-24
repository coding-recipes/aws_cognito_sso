import { useQuery } from "react-query";
import { getCurrentUser } from "../../modules/resources";
import { FullLoader } from "../atoms";
import { Table, Tbody, Tr, Td, TableContainer } from '@chakra-ui/react'

const USER_QUERY_KEY = "user"

export const UserProfile = () => {
  const { status, data } = useQuery(USER_QUERY_KEY, getCurrentUser);

  return <>
    {status == "loading" && <FullLoader height="200px" />}
    {status == "success" && <>
      <TableContainer>
        <Table size="sm">
          <Tbody>
            <Tr>
              <Td><b>Identity</b></Td>
            </Tr>
            <Tr>
              <Td>Username</Td>
              <Td>{data.identity.userName}</Td>
            </Tr>
            <Tr>
              <Td>User ID</Td>
              <Td>{data.identity.sub}</Td>
            </Tr>
            <Tr>
              <Td>Client ID</Td>
              <Td>{data.identity.clientId}</Td>
            </Tr>

            <Tr>
              <Td><b>Data</b></Td>
            </Tr>
            <Tr>
              <Td>...</Td>
              <Td>...</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
    }
  </>
}