import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from 'assets/styles/globalStyles';

import { theme } from 'assets/styles/theme';

import Navigation from 'components/molecules/Navigation/Navigation';

const MainTemplate = ({ children }) => (
  <>
    <Helmet lang="pl" title="Stickers shop" />
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <Navigation />
      {children}
    </ThemeProvider>
  </>
);

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainTemplate;
