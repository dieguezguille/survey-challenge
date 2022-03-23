import { render } from '@testing-library/react';

import { appContext } from '../__mocks__/contexts/app.context';
import Loader from '../components/common/loader/loader';
import { AppContext } from '../contexts/app.context';

const Consumer = () => {
    return (
        <AppContext.Provider value={appContext}>
            <Loader />
        </AppContext.Provider>
    );
};

describe('Loader', () => {
    it('should render when app is loading', () => {
        appContext.isLoading = true;
        const { queryByLabelText } = render(<Consumer />);
        const loader = queryByLabelText('loader');

        expect(loader).toHaveStyle('opacity: 1; visibility: visible;');
    });

    it('should not render when app is not loading', () => {
        appContext.isLoading = false;
        const { queryByLabelText } = render(<Consumer />);
        const loader = queryByLabelText('loader');

        expect(loader).toHaveStyle('opacity: 0; visibility: hidden;');
    });
});
