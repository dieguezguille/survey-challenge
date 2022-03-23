import { Outlet } from 'react-router-dom';

import AppBarMenu from '../common/appbar-menu/appbar-menu';
import Loader from '../common/loader/loader';

const ContentLayout: React.FC = () => {
    return (
        <>
            <AppBarMenu />
            <Loader />
            <Outlet />
        </>
    );
};

export default ContentLayout;
