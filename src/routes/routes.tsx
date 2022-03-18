import { RouteObject, useRoutes } from 'react-router-dom';
import { RoutesEnum } from '../enums/routes.enum';

const DefaultRoutes: RouteObject[] = [
    {
        path: RoutesEnum.BASE,
        element: <div>BASE (Router)</div>,
        children: [
            {
                path: RoutesEnum.NO_MATCH,
                element: <div>NO MATCH (Router)</div>,
            },
        ],
    },
];

export default () => useRoutes(DefaultRoutes);
