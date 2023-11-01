import { Stat, useStats } from "../../modules/resources";
import { FullLoader } from "../atoms";
import { useMemo } from 'react';

import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale);

export const StatsTable = () => {
  const [useQuery] = useStats() // [query, refresh
  const { status, data } = useQuery()
  return <>
    {status == "loading" && <FullLoader height="200px" />}
    {status == "success" && <StatsCharts data={data.data} />}
  </>
}

interface IDataset {
  label: string;
  data: number[]
}
type ChartData = {
  labels: string[],
  datasets: IDataset[]
}
type Period = string
type Value = number
type TKPI = Record<Period, Value>
type TKPIs = Record<string, TKPI>
type Labels = string[]

const createKpiDataSet = (label: string, labels: Labels, kpiData: TKPI): IDataset => {
  const data = labels.map((p: string) => kpiData[p])
  return { label, data }
}
const createChartDataSet = (labels: Labels, KPI: TKPIs): ChartData => {
  const datasets = Object.keys(KPI).map((kpi: string) => createKpiDataSet(kpi, labels, KPI[kpi]))
  return {
    labels,
    datasets
  }
}

const tranformData = (data: Stat[]): ChartData => {
  const KPI: TKPIs = {}
  const labelsS: Set<string> = new Set()
  data.forEach((row: Stat) => {
    const { kpi, period, value } = row
    KPI[kpi] = KPI[kpi] ?? {}
    KPI[kpi][period] = value
    labelsS.add(period)
  })
  const labels = [...labelsS].sort()
  const chartDataSet = createChartDataSet(labels, KPI)
  return chartDataSet
}

const StatsCharts = ({ data }: { data: Stat[] }) => {
  const chartData = useMemo(() => {
    return tranformData(data)
  }, [data])

  return <>
    <Line
      data={chartData}
    />
  </>
}
