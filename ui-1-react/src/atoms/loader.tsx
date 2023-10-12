import { Center, Flex, Spinner, Text } from '@chakra-ui/react';

export const Loader = () => {
  return <Spinner
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="blue.500"
    size="xl"
  />
}

export const FullLoader = ({ text }: { text?: string }) => {
  return <Center h={"100%"}>
    <Flex direction="column" align="center" justify="center" gap={5}>
      <Loader />
      {
        text && <Text fontSize='lg'>{text}</Text>
      }
    </Flex>
  </Center>
}