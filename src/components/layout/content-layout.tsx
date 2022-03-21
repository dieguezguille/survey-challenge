import { Outlet } from 'react-router-dom';

import AppBarMenu from '../common/appbar-menu/appbar-menu';

const ContentLayout: React.FC = () => {
    return (
        <>
            <AppBarMenu />
            <Outlet />
        </>
    );
};

export default ContentLayout;
