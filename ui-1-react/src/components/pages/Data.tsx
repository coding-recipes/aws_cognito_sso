import { useQuery, useQueryClient } from "react-query";
import { getStats } from "../../api-resources";
import { Button } from "@chakra-ui/react";

export default function Page() {
  return <div className='content-container'>
    <div>
      Data Page
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