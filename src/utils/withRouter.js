import React from 'react';
import { useParams } from 'react-router-dom';

const withRouter = (WrappedComponent) =>
  function Wrapper(props) {
    const params = useParams();
    return <WrappedComponent {...props} params={params} />;
  };

export default withRouter;
