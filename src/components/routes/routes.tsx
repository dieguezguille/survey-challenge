import { useEffect, useState } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { RoutesEnum } from '../../enums/routes.enum';
import useWallet from '../../hooks/use-wallet.hook';
import ContentLayout from '../layout/content-layout';
import ForbiddenView from '../views/forbidden/forbidden.view';
import MainView from '../views/main/main.view';
import OverviewView from '../views/overview/overview.view';
import SurveyView from '../views/survey/survey.view';

const DefaultRoutes = [
    {
        path: RoutesEnum.BASE,
        element: <ContentLayout />,
        children: [
            {
                path: RoutesEnum.BASE,
                element: <Navigate to={RoutesEnum.MAIN} />,
            },
            {
                path: RoutesEnum.MAIN,
                element: <MainView />,
            },
            {
                path: RoutesEnum.SURVEY,
                element: <SurveyView />,
            },
            {
                path: RoutesEnum.OVERVIEW,
                element: <OverviewView />,
            },
            {
                path: RoutesEnum.NO_MATCH,
                element: <Navigate to={RoutesEnum.FORBIDDEN} />,
            },
        ],
    },
];

const RestrictedRoutes = [
    {
        path: RoutesEnum.BASE,
        element: <ContentLayout />,
        children: [
            {
                path: RoutesEnum.BASE,
                element: <Navigate to={RoutesEnum.FORBIDDEN} />,
            },
            {
                path: RoutesEnum.FORBIDDEN,
                element: <ForbiddenView />,
            },
            {
                path: RoutesEnum.NO_MATCH,
                element: <Navigate to={RoutesEnum.FORBIDDEN} />,
            },
        ],
    },
];

const Routes: React.FC = () => {
    const { isConnected, isInvalidChain } = useWallet();
    const [routes, setRoutes] = useState<RouteObject[]>(RestrictedRoutes);

    useEffect(() => {
        setRoutes(
            isConnected && !isInvalidChain ? DefaultRoutes : RestrictedRoutes
        );
    }, [isConnected, isInvalidChain]);

    return useRoutes(routes);
};

export default Routes;
