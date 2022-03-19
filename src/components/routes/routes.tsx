import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { RoutesEnum } from '../../enums/routes.enum';
import ContentLayout from '../layout/content-layout';
import ErrorView from '../views/error/error.view';
import MainView from '../views/main/main.view';
import QuizView from '../views/quiz/quiz.view';
import ResultsView from '../views/results/results.view';

const DefaultRoutes: RouteObject[] = [
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

export default () => useRoutes(DefaultRoutes);
