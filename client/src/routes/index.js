import React, { useState, useEffect, useContext } from "react";
import { Switch, Route, useLocation, useHistory, Router } from "react-router-dom";

import { Container, PlayArea } from './styles.js';
import Home from '@views/static/Home';
import NotFound from '@views/static/NotFound';

const AppRoutes = () => {
    const location = useLocation();
    const history = useHistory();

    const DynamicComp = () => {
        return Home;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <Container>
            <div className="content">
                <PlayArea id="play-area">
                    <React.Fragment>
                        <Switch>
                            <Route exact path="/" component={DynamicComp()} />
                            <Route exact path="/home" component={Home} />
                            <Route path="/*" component={NotFound} />
                        </Switch>
                    </React.Fragment>
                </PlayArea>
            </div>
        </Container>
    )
}

export default AppRoutes;
