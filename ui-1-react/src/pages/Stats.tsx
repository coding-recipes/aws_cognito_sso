import { Button } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "react-query";
import { getStats } from "../modules/resources";

export const StatsPage = () => {
  return <div>
    <div>
      Stats Page
    </div>

    <div>
      <DataTable />
    </div>
  </div>
}

function DataTable() {
  const queryClient = useQueryClient()
  const queryKey = "stats"
  const { status, data, error, isFetching } = useQuery(queryKey, getStats);

  const refresh = () => {
    queryClient.invalidateQueries(queryKey)
  }

  return status == "success" && <>
    <div>status: {status}</div>
    <div>len: {data?.length}</div>
    <div><Button onClick={refresh}>Refresh</Button></div>
    <div>{JSON.stringify(data)}</div>
  </>
}