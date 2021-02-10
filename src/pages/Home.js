import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useItems } from 'store';

import FilterBar from 'components/FilterBar/FilterBar';
import Card from 'components/Card/Card';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  const [activeCategory, setActiveCategory] = useState('all');
  const [{ items }, { fetchItems }] = useItems();

  useEffect(() => {
    fetchItems();
  }, []);

  const handleFilterByCategory = (e) => {
    const { category } = e.target.parentElement.dataset;
    setActiveCategory(category);
  };

  return (
    <StyledWrapper>
      <FilterBar handleClick={handleFilterByCategory} featuredItem={activeCategory} />
      <ContentWrapper>
        {items.map(({ id, image, price, slug, title, description, categories }) => {
          if (activeCategory === 'all') {
            return (
              <Card
                key={id}
                id={id}
                image={image}
                price={price}
                slug={slug}
                title={title}
                description={description}
              />
            );
          }
          return categories.map(({ slug: categorySlug }) =>
            categorySlug === activeCategory ? (
              <Card
                key={id}
                id={id}
                image={image}
                price={price}
                slug={slug}
                title={title}
                description={description}
              />
            ) : null,
          );
        })}
      </ContentWrapper>
    </StyledWrapper>
  );
};

export default Home;
