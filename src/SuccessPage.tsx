import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Спасибо за ваш заказ!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Ваш заказ успешно обработан. Мы свяжемся с вами в ближайшее время.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
        >
          Вернуться на главную
        </Button>
      </Box>
    </Container>
  );
};

export default SuccessPage;