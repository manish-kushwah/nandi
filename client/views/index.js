import React from "react";

import ErrorBoundary from '@components/ErrorBoundary';

import AppRoutes from "@routes";

const App = () => {
    return (
        <ErrorBoundary>
            <AppRoutes />
        </ErrorBoundary>
    );
};

export default App;
