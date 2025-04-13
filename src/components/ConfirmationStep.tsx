import { Box, Typography, Button, Paper } from '@mui/material';
import { useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';

const ConfirmationStep = () => {
  const navigate = useNavigate();
  const currentStep = useAppSelector((state) => state.form.currentStep);
  const formData = useAppSelector((state) => state.form);

  const maskCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s+/g, '');
    if (cleaned.length < 8) return cleaned;
    return `${cleaned.substring(0, 2)}** **** **** ${cleaned.substring(cleaned.length - 4)}`;
  };

  const handleSubmit = () => {
    navigate('/success');
  };

  return (
    <Box
    className="step-box"
    sx={{
        opacity: currentStep < 4 ? 0.5 : 1,
        pointerEvents: currentStep < 4 ? 'none' : 'auto',
    }}
    >
    <Typography variant="h6" gutterBottom>
        Подтверждение заказа
    </Typography>
    <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
        Номер телефона
        </Typography>
        <Typography variant="body1">{formData.phone}</Typography>
    </Paper>
    <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
        Личная информация
        </Typography>
        <Box display="flex" flexDirection="column" gap={1}>
      <Box>
        <Typography variant="body2">Имя</Typography>
        <Typography variant="body1">{formData.personalInfo.firstName}</Typography>
      </Box>
          <Box>
            <Typography variant="body2">Фамилия</Typography>
            <Typography variant="body1">{formData.personalInfo.lastName}</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Адрес</Typography>
            <Typography variant="body1">{formData.personalInfo.address}</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Город</Typography>
            <Typography variant="body1">{formData.personalInfo.city}</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Почтовый индекс</Typography>
            <Typography variant="body1">{formData.personalInfo.zipCode}</Typography>
          </Box>
        </Box>
      </Paper>
      <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Банковская информация
        </Typography>
        <Box display="flex" flexDirection="column" gap={1}>
          <Box>
            <Typography variant="body2">Номер карты</Typography>
            <Typography variant="body1">{maskCardNumber(formData.bankInfo.cardNumber)}</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Дата истечения</Typography>
            <Typography variant="body1">{formData.bankInfo.expiryDate}</Typography>
          </Box>
          <Box>
            <Typography variant="body2">Сумма</Typography>
            <Typography variant="body1">
              {formData.bankInfo.amount} {formData.bankInfo.currency}
            </Typography>
          </Box>
        </Box>
        </Paper>
        {currentStep === 4 && (
            <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{ mt: 2 }}
            >
            Всё верно
            </Button>
        )}
        </Box>
  );
};

export default ConfirmationStep;