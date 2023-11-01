import { useServerInfo } from "../../modules/resources";
import { Loader } from "../atoms";
import { Table, Tbody, Tr, Td, Th, TableContainer, Link } from '@chakra-ui/react'
import { config } from '../../config'
import { useMemo } from "react";

export const InfoTableServer = () => {
  return <>
    <TableContainer>
      <Table size="sm">
        <Tbody>
          <InfoTableServerBody />
        </Tbody>
      </Table>
    </TableContainer>
  </>
}

export const InfoTableServerBody = () => {
  const [useQuery] = useServerInfo() // [query, refresh
  const { status, data } = useQuery();

  const swagger = useMemo(() => {
    const { api_url } = config()
    if (!data) return ""
    return `${api_url}${data.swagger}`
  }, [data, config])

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };


  return <>
    {status == "loading" && <Tr><Td colSpan={2} style={{ textAlign: "center" }}><Loader /></Td></Tr>}
    {status == "success" && <>
      <Tr><Th>Language</Th><Td>{data.language}</Td></Tr>
      <Tr><Th>Framework</Th><Td>{data.framework}</Td></Tr>
      <Tr><Th>Version</Th><Td>{data.version}</Td></Tr>
      <Tr><Th>Swagger</Th>
        <Td>
          <Link href={swagger} isExternal onClick={handleClick}>{swagger}</Link>
        </Td>
      </Tr>
      <Tr><Th>Repo</Th>
        <Td>
          <Link href={data.repo} isExternal onClick={handleClick}>{data.repo}</Link>
        </Td>
      </Tr>

    </>
    }
  </>
}