import { Button, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import { useContext, useEffect } from 'react';
import { SurveyContext } from '../../context/survey.context';
import Image from 'mui-image';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../enums/routes.enum';
import { SurveyImageWrapper } from '../../styled/survey-image-wrapper/survey-image-wrapper';
import Balance from '../../common/balance/balance';

const MainView: React.FC = () => {
    const navigate = useNavigate();
    const { getDailySurvey, survey } = useContext(SurveyContext);

    const handleSurveyStart = () => {
        navigate(RoutesEnum.SURVEY);
    };

    useEffect(() => {
        getDailySurvey();
    }, [getDailySurvey]);

    return (
        <Container>
            <Stack spacing={6}>
                <Balance />
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
                            onClick={handleSurveyStart}
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
