import { render } from '@testing-library/react';

import OnlineIndicator from '../components/common/online-indicator/online-indicator';

describe('Online Indicator', () => {
    it('should render', () => {
        const { queryByLabelText } = render(<OnlineIndicator isOnline />);
        const indicator = queryByLabelText('online-indicator');

        expect(indicator).toBeInTheDocument();
    });

    it('should show a green indicator when online', () => {
        const { queryByLabelText } = render(<OnlineIndicator isOnline />);
        const indicator = queryByLabelText('online-indicator');

        const connectedStyle =
            'width: 10px; height: 10px; background-color: rgb(102, 187, 106);';

        expect(indicator).toHaveStyle(connectedStyle);
    });

    it('should show a red indicator when offline', () => {
        const { queryByLabelText } = render(
            <OnlineIndicator isOnline={false} />
        );
        const indicator = queryByLabelText('online-indicator');

        const disconnectedStyle =
            'width: 10px; height: 10px; background-color: rgb(239, 83, 80);';

        expect(indicator).toHaveStyle(disconnectedStyle);
    });
});
