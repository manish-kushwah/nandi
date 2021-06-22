import React from 'react';

import ErrorDetail from './ErrorDetail';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        error: null,
        errorInfo: null,
       };
    }
  
    static getDerivedStateFromError() {
        return {error: true};
    }
  
    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo,
        });
    }
  
    render() {
        const {children} = this.props;
        const {error, errorInfo} = this.state;

      if (error) {
        return <ErrorDetail error={error} info={errorInfo}/>;
      }
  
      return children; 
    }
  }

  export default ErrorBoundary;