import { Link } from '@chakra-ui/react'

export const onClickStopProp = (e: React.MouseEvent) => {
  e.stopPropagation();
};

export const MaskedLink = ({ mask = false, link }: { mask?: boolean, link: string }) => {
  const text = mask ? <span>open page &rarr;</span> : link;
  return <Link href={link} isExternal onClick={onClickStopProp}>{text}</Link>
}