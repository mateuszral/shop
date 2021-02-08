import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useItems } from 'store';

import Card from 'components/Card/Card';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  padding: ${({ theme }) => theme.layout.mobileSidesPadding};

  ${({ theme }) => theme.mq.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.mq.bigTablet} {
    width: 80%;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Home = () => {
  const [{ items }, { fetchItems }] = useItems();

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <StyledWrapper>
      <ContentWrapper>
        {items.length
          ? items.map(({ id, image, price, slug, title, description, categories }) => (
              <Card
                key={id}
                id={id}
                image={image}
                price={price}
                slug={slug}
                title={title}
                description={description}
                categories={categories}
              />
            ))
          : null}
      </ContentWrapper>
    </StyledWrapper>
  );
};

export default Home;
