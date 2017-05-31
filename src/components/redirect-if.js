import React from 'react';
import {Redirect} from 'react-router-dom';

// Higher-order component to conditionally redirect to a route based upon
// a component's props
export default (predicate, redirectTo) => WrappedComponent => {
    const RedirectIf = props => {
        const shouldRedirect = predicate(props);
        if (shouldRedirect) {
            return <Redirect to={redirectTo} />;
        }

        return <WrappedComponent {...props} />;
    }

    const displayName = WrappedComponent.displayName ||
                        WrappedComponent.name ||
                        'Component';
    RedirectIf.displayName = `RedirectIf(${displayName})`;

    return RedirectIf;
};
