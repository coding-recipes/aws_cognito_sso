import { Heading } from '@chakra-ui/react'
import { StatsChart } from "../components/stats";

export const StatsPage = () => {
  return <>
    <Heading as="h1" size="lg" textAlign="left" paddingBottom={8}>Stats</Heading>
    <StatsChart />
  </>
}