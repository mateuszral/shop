import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Paragraph from 'components/Paragraph/Paragraph';

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

const StyledImg = styled.img`
  margin: auto;
  max-width: 100%;
  height: auto;
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
              <div>
                <StyledImg
                  alt={title}
                  src={`http://localhost:1337${image.formats.thumbnail.url}`}
                />
              </div>
              <ContentWrapper>
                <Paragraph bold>
                  {title} - ${price}
                </Paragraph>
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
