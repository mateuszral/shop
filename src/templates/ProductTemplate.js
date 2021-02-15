import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/blur.css';

import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Header from 'components/atoms/Header/Header';
import BoxShadow from 'components/atoms/BoxShadow/BoxShadow';
import Button from 'components/atoms/Button/Button';

import { useItems } from 'store';

import { routes } from 'routes';

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

const ProductTemplate = ({ match }) => {
  const [product, setProduct] = useState([]);
  const [{ items }, { fetchItems, addToCart }] = useItems();
  const history = useHistory();

  useEffect(() => {
    if (!items.length) {
      fetchItems();
    }
    setProduct(items.filter(({ slug }) => slug === match.params.slug));
  }, [items]);

  const handleAddToCart = (data) => {
    addToCart(data);
    history.push(routes.cart);
  };

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
                <Header>
                  {title} sticker - ${price}
                </Header>
                <Paragraph grey>{description}</Paragraph>
                <Paragraph bold>Categories: {categories.map(({ name }) => `${name} `)}</Paragraph>
                <Button onClick={() => handleAddToCart({ id, title, description, price, image })}>
                  Add to cart
                  <BoxShadow />
                </Button>
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
