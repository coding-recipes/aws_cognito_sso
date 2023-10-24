import { Center, Flex, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

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

export const Wait = ({ children, sec = 1, text }: { children: React.ReactNode, sec?: number, text?: string }) => {
  const [toWait, setWait] = useState<boolean>(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setWait(false)
    }, sec * 1000)
    return () => clearTimeout(t);
  }, [])

  if (toWait) {
    return <FullLoader text={text} />
  } else {
    return children
  }
}
