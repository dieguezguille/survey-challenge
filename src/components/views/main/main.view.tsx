import { Button, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Image from 'mui-image';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../../../contexts/app.context';
import { RoutesEnum } from '../../../enums/routes.enum';
import Balance from '../../common/balance/balance';
import { SurveyImageWrapper } from '../../styled/survey-image-wrapper/survey-image-wrapper';

const MainView: React.FC = () => {
    const { survey, getDailySurvey } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        getDailySurvey();
    }, [getDailySurvey]);

    return (
        <Container>
            <Stack spacing={6}>
                <Balance currencyName="QUIZ" />
                {survey && (
                    <Stack alignItems="center" spacing={4}>
                        <h2>
                            Today&apos;s survey is called{' '}
                            <i>&apos;{survey.title}&apos;</i>
                        </h2>
                        <SurveyImageWrapper>
                            <Image src={survey.image} showLoading />
                        </SurveyImageWrapper>
                        <Button
                            color="secondary"
                            variant="outlined"
                            onClick={() => navigate(RoutesEnum.SURVEY)}
                        >
                            Start Survey
                        </Button>
                    </Stack>
                )}
            </Stack>
        </Container>
    );
};

export default MainView;
