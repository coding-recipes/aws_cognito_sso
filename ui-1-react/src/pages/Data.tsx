import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import { getStats } from "../api";

function useStats() {
  return useQuery("stats", getStats);
}


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
  const { status, data, error, isFetching } = useStats();

  return status == "success" && <>
    <div>status: {status}</div>
    <div>len: {data?.length}</div>
  </>
}