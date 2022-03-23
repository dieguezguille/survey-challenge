import { StyledOnlineIndicator } from './online-indicator.styles';

type OnlineIndicatorProps = {
    isOnline: boolean;
};

const OnlineIndicator: React.FC<OnlineIndicatorProps> = ({ isOnline }) => {
    return (
        <StyledOnlineIndicator
            aria-label="online-indicator"
            isOnline={isOnline}
        />
    );
};

export default OnlineIndicator;
