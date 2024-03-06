import React from 'react';
import {Layout, Spinner} from '@ui-kitten/components';

const LoadingIndicator = () => {
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Spinner status="primary" size="giant" />
    </Layout>
  );
};

export default LoadingIndicator;
