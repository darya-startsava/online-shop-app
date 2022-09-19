import React from 'react';
import { useNavigate } from 'react-router-dom';

const withNavigate = (WrappedComponent) =>
  function Wrapper(props) {
    const navigate = useNavigate();
    return <WrappedComponent {...props} navigate={navigate} />;
  };
export default withNavigate;
