import NextLink from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import styled from 'styled-components';

type AnchorProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export default function Link({ href, children, ...rest }: AnchorProps) {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <Anchor {...rest}>{children}</Anchor>
    </NextLink>
  );
}

const Anchor = styled.a`
  display: inline;
  width: fit-content;
  text-decoration: none;

  background: linear-gradient(rgb(var(--primary)), rgb(var(--primary)));
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 100% 0px;
  transition: 100ms;
  transition-property: background-size, text-decoration, color;
  color: rgb(var(--primary));

  &:hover {
    background-size: 100% 100%;
    text-decoration: none;
    color: rgb(var(--background));
  }

  &:active {
    color: rgb(var(--background));
    background-size: 100% 100%;
  }
`;
