import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';

import Root from 'pages/Root';

WebFont.load({
  google: {
    families: ['Montserrat:400,700', 'sans-serif'],
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
