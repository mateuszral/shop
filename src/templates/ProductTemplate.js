import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';

import Paragraph from 'components/Paragraph/Paragraph';
import Header from 'components/Header/Header';

import { useItems } from 'store';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${({ theme }) => theme.layout.mobileSidesPadding};

  ${({ theme }) => theme.mq.bigTablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0 60px;
  }
`;

const StyledLazyLoadImage = styled(LazyLoadImage)`
  margin: 0 auto;
  display: block;
`;

const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px 0;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  border: none;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  margin-top: 5px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%);
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const ProductTemplate = ({ match }) => {
  const [product, setProduct] = useState([]);
  const [{ items }, { fetchItems }] = useItems();

  useEffect(() => {
    if (!items.length) {
      fetchItems();
    }
    setProduct(items.filter(({ slug }) => slug === match.params.slug));
  }, [items]);

  return (
    <StyledWrapper>
      {product.length
        ? product.map(({ id, title, description, categories, price, image }) => (
            <Fragment key={id}>
              <StyledLazyLoadImage
                alt={title}
                src={`http://localhost:1337${image.formats.thumbnail.url}`}
                effect="blur"
                height="156px"
              />
              <ContentWrapper>
                <Header bold header>
                  {title} sticker - ${price}
                </Header>
                <Paragraph grey>{description}</Paragraph>
                <Paragraph bold>Categories: {categories.map(({ name }) => `${name} `)}</Paragraph>
                <StyledButton>Add to cart</StyledButton>
              </ContentWrapper>
            </Fragment>
          ))
        : null}
    </StyledWrapper>
  );
};

ProductTemplate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductTemplate;
