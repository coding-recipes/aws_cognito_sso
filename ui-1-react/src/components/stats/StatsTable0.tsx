import { Button } from "@chakra-ui/react";
import { Stat, useStats } from "../../modules/resources";
import { FullLoader } from "../atoms";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react'


export const StatsTable = () => {
  const [useQuery, refresh] = useStats() // [query, refresh
  const { status, data } = useQuery()

  return <>
    {status == "loading" && <FullLoader height="200px" />}
    {
      status == "success" && <>
        <StatsButtons {...{ refresh }} />
        <StatsTable2 data={data.data} />
      </>
    }
  </>
}

const StatsButtons = ({ refresh }: { refresh: VoidFunction }) => {
  return <>
    <div>
      <Button onClick={refresh} colorScheme='blue' variant='outline' size={"sm"}>Refresh</Button>
    </div>
  </>
}


const StatsTable2 = ({ data }: { data: Stat[] }) => {
  return <>
    <TableContainer>
      <Table variant="striped" size='sm' width={"500px"}>
        <TableCaption>Nice KPI values</TableCaption>
        <Thead>
          <Tr>
            <Th width={"50px"}>#</Th>
            <Th width={"350px"}>KPI</Th>
            <Th width={"50px"}>Period</Th>
            <Th width={"50px"}>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            data.map((stat) => {
              return <TableRow key={stat.id} data={stat} />
            })
          }
        </Tbody>
      </Table>
    </TableContainer>
  </>
}

const TableRow = ({ data }: { data: Stat }) => {
  return <>
    <Tr>
      <Td>{data.id}</Td>
      <Td>{data.kpi}</Td>
      <Td>{data.period}</Td>
      <Td isNumeric>{data.value}</Td>
    </Tr>
  </>
}