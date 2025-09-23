import React from 'react';
import styled from 'styled-components';
import ArticleImage from 'components/ArticleImage';
import { media } from 'utils/media';

interface HeaderProps {
  title: string;
  imageUrl: string;
  readTime: string;
}

export default function Header({ title, imageUrl, readTime }: HeaderProps) {
  return (
    <HeaderContainer>
      <ArticleImage src={imageUrl} />
      <Title>{title}</Title>
      <DetailsContainer>{readTime}</DetailsContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90rem;
  margin-bottom: 8rem;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 4.8rem;
  line-height: 5.6rem;
  margin-bottom: 28px;

  ${media('<=tablet')} {
    font-size: 3.5rem;
    line-height: 4.8rem;
  }
`;

const DetailsContainer = styled.div`
  font-size: 1.6rem;
  color: var(--text-lighter);
`;
