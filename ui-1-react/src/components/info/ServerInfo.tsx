import { useQuery } from "react-query";
import { getServerInfo } from "../../modules/resources";
import { FullLoader } from "../atoms";
import { Table, Tbody, Tr, Td, TableContainer, Link } from '@chakra-ui/react'
import { config } from '../../config'
import { useMemo } from "react";

const USER_QUERY_KEY = "server"

export const ServerInfoComponent = () => {
  const { status, data } = useQuery(USER_QUERY_KEY, getServerInfo);

  const swagger = useMemo(() => {
    const { api_url } = config()
    if (!data) return ""
    return `${api_url}${data.swagger}`
  }, [data, config])


  return <>
    {status == "loading" && <FullLoader height="200px" />}
    {status == "success" && <>
      <TableContainer>
        <Table size="sm">
          <Tbody>
            <Tr><Td><b>Identity</b></Td></Tr>
            <Tr><Td>Language</Td><Td>{data.language}</Td></Tr>
            <Tr><Td>Framework</Td><Td>{data.framework}</Td></Tr>
            <Tr><Td>Version</Td><Td>{data.version}</Td></Tr>
            <Tr><Td>Swagger</Td>
              <Td>
                <Link href={swagger} isExternal>{swagger}</Link>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
    }
  </>
}