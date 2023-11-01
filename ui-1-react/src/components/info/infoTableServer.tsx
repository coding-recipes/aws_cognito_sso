import { useServerInfo } from "../../modules/resources";
import { Loader } from "../atoms";
import { Table, Tbody, Tr, Td, Th, TableContainer } from '@chakra-ui/react'
import { config } from '../../config'
import { useMemo } from "react";
import { MaskedLink } from "./utils"

export const InfoTableServer = () => {
  return <>
    <TableContainer>
      <Table size="sm">
        <Tbody>
          <Tr>
            <Th colSpan={2} style={{ textAlign: "center" }}>Server Info</Th>
          </Tr>
          <InfoTableServerBody />
        </Tbody>
      </Table>
    </TableContainer>
  </>
}

export const InfoTableServerBody = ({ maskLink = false }: { maskLink?: boolean }) => {
  const [useQuery] = useServerInfo() // [query, refresh
  const { status, data } = useQuery();

  const swagger = useMemo(() => {
    const { api_url } = config()
    if (!data) return ""
    return `${api_url}${data.swagger}`
  }, [data, config])

  return <>
    {status == "loading" && <Tr><Td colSpan={2} style={{ textAlign: "center" }}><Loader /></Td></Tr>}
    {status == "success" && <>
      <Tr><Th>Language</Th><Td>{data.language}</Td></Tr>
      <Tr><Th>Framework</Th><Td>{data.framework}</Td></Tr>
      <Tr><Th>Version</Th><Td>{data.version}</Td></Tr>
      <Tr><Th>Swagger</Th>
        <Td>
          <MaskedLink mask={maskLink} link={swagger} />
        </Td>
      </Tr>
      <Tr><Th>Repo</Th>
        <Td>
          <MaskedLink mask={maskLink} link={data.repo} />
        </Td>
      </Tr>

    </>
    }
  </>
}