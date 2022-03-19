import { Button, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import { useContext, useEffect } from 'react';
import { SurveyContext } from '../../context/survey.context';
import Image from 'mui-image';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../enums/routes.enum';
import { CustomPill, SurveyImageWrapper } from './main.view.styles';

const MainView: React.FC = () => {
    const navigate = useNavigate();
    const { balance, getBalance, getDailySurvey, survey } =
        useContext(SurveyContext);

    const handleSurveyStart = () => {
        navigate(RoutesEnum.SURVEY);
    };

    useEffect(() => {
        getBalance();
        getDailySurvey();
    }, [getBalance, getDailySurvey]);

    return (
        <Container>
            <Stack spacing={6}>
                <Stack direction="row" alignItems="center">
                    <div>
                        <strong>Welcome!</strong> Your current
                        <strong> $QUIZ</strong> balance is
                    </div>
                    <CustomPill elevation={4}>
                        <Stack alignItems="center">
                            <strong>{balance} $QUIZ</strong>
                        </Stack>
                    </CustomPill>
                </Stack>
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
                            Begin Answering
                        </Button>
                    </Stack>
                )}
            </Stack>
        </Container>
    );
};

export default MainView;
