import { useContext, useEffect, useState } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { RoutesEnum } from '../../enums/routes.enum';
import { WalletContext } from '../context/wallet.context';
import ContentLayout from '../layout/content-layout';
import ErrorView from '../views/error/error.view';
import ForbiddenView from '../views/forbidden/forbidden.view';
import MainView from '../views/main/main.view';
import QuizView from '../views/quiz/quiz.view';
import ResultsView from '../views/results/results.view';

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
                path: RoutesEnum.QUIZ,
                element: <QuizView />,
            },
            {
                path: RoutesEnum.RESULTS,
                element: <ResultsView />,
            },
            {
                path: RoutesEnum.NO_MATCH,
                element: <ErrorView />,
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
    const { isConnected, isInvalidChain } = useContext(WalletContext);
    const [routes, setRoutes] = useState<RouteObject[]>(RestrictedRoutes);

    useEffect(() => {
        setRoutes(
            isConnected && !isInvalidChain ? DefaultRoutes : RestrictedRoutes
        );
    }, [isConnected, isInvalidChain]);

    return useRoutes(routes);
};

export default Routes;
