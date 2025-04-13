import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setPhone, setCurrentStep } from '../features/form/formSlice';

const PhoneConfirmationStep = () => {
  const dispatch = useAppDispatch();
  const phone = useAppSelector((state) => state.form.phone);
  const currentStep = useAppSelector((state) => state.form.currentStep);
  const [error, setError] = useState('');

  const mockApiRequest = (phoneNumber: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(phoneNumber.startsWith('+7') && phoneNumber.length >= 12);
      }, 500);
    });
  };

  const formik = useFormik({
    initialValues: {
      phone: phone,
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required('Номер телефона обязателен')
        .min(12, 'Номер должен содержать минимум 12 символов'),
    }),
    onSubmit: async (values) => {
      try {
        const isValid = await mockApiRequest(values.phone);
        if (isValid) {
          dispatch(setPhone(values.phone));
          dispatch(setCurrentStep(2));
          setError('');
        } else {
          setError('Некорректный номер. Введите номер в формате +7XXXXXXXXXX');
        }
      } catch {
        setError('Произошла ошибка. Попробуйте снова.');
      }
    },
  });
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ''); 
    const formatted = input.length > 0 ? `+7${input.slice(1, 11)}` : '';
    formik.setFieldValue('phone', formatted);
  };

  return (
    <Box
      className="step-box"
      sx={{
        opacity: currentStep > 1 ? 0.5 : 1,
        pointerEvents: currentStep > 1 ? 'none' : 'auto',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Подтверждение номера телефона
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Номер телефона"
          type="tel"
          value={formik.values.phone}
          onChange={handlePhoneChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          placeholder="+7XXXXXXXXXX"
          disabled={currentStep > 1}
        />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {currentStep === 1 && (
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Подтвердить номер
          </Button>
        )}
      </form>
    </Box>
  );
};

export default PhoneConfirmationStep;