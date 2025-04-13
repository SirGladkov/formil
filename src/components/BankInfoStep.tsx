import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, MenuItem, InputAdornment } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setBankInfo, setCurrentStep } from '../features/form/formSlice';
import CardInput from './CardInput';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const luhnCheck = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s+/g, '');
  if (!/^\d+$/.test(cleaned)) return false;

  let sum = 0;
  for (let i = 0; i < cleaned.length; i++) {
    let digit = parseInt(cleaned[i], 10);
    if ((cleaned.length - i) % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
};

const BankInfoStep = () => {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector((state) => state.form.currentStep);
  const bankInfo = useAppSelector((state) => state.form.bankInfo);
  const formik = useFormik({
    initialValues: {
      cardNumber: bankInfo.cardNumber || '',
      cvv: bankInfo.cvv || '',
      expiryDate: bankInfo.expiryDate || '',
      amount: bankInfo.amount || '',
      currency: bankInfo.currency || 'RUB',
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .required('Номер карты обязателен')
        .test('luhn', 'Некорректный номер карты', (value) => luhnCheck(value || '')),
      cvv: Yup.string()
        .required('CVV обязателен')
        .matches(/^\d{3,4}$/, 'CVV должен быть 3 или 4 цифры'),
      expiryDate: Yup.string()
        .required('Дата истечения обязательна')
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Некорректная дата (ММ/ГГ)'),
      amount: Yup.number()
        .required('Сумма обязательна')
        .positive('Сумма должна быть положительной'),
      currency: Yup.string().required('Валюта обязательна'),
    }),
    onSubmit: (values) => {
      dispatch(setBankInfo(values));
      dispatch(setCurrentStep(4));
    },
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        className="step-box"
        sx={{
          opacity: currentStep !== 3 ? 0.5 : 1, 
          pointerEvents: currentStep !== 3 ? 'none' : 'auto', 
        }}
      >
        <Typography variant="h6" gutterBottom>
          Банковская информация
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <CardInput
                value={formik.values.cardNumber}
                onChange={(value) => formik.setFieldValue('cardNumber', value)}
                error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                helperText={formik.touched.cardNumber && formik.errors.cardNumber ? String(formik.errors.cardNumber) : undefined}
                disabled={currentStep !== 3} 
              />
            </Box>
            <Box>
            <TextField
            fullWidth
            id="cvv"
            name="cvv"
            label="CVV"
            type="password"
            value={formik.values.cvv}
            onChange={(e) => {
                const input = e.target.value.replace(/\D/g, ''); 
                const limited = input.slice(0, 4); 
                formik.setFieldValue('cvv', limited);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.cvv && Boolean(formik.errors.cvv)}
            helperText={formik.touched.cvv && formik.errors.cvv}
            disabled={currentStep > 3}
            inputProps={{ maxLength: 4 }}
            />
            </Box>
            <Box>
              <DatePicker
                label="Дата истечения"
                views={['month', 'year']}
                value={formik.values.expiryDate ? new Date(`20${formik.values.expiryDate.split('/')[1]}-${formik.values.expiryDate.split('/')[0]}-01`) : null}
                onChange={(date) => {
                  if (date) {
                    const month = date.getMonth() + 1;
                    const year = date.getFullYear().toString().slice(-2);
                    formik.setFieldValue('expiryDate', `${month.toString().padStart(2, '0')}/${year}`);
                  } else {
                    formik.setFieldValue('expiryDate', '');
                  }
                }}
                disabled={currentStep !== 3} 
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.expiryDate && Boolean(formik.errors.expiryDate),
                    helperText: formik.touched.expiryDate && formik.errors.expiryDate,
                  },
                }}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                id="amount"
                name="amount"
                label="Сумма"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
                disabled={currentStep !== 3} 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {formik.values.currency}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box>
              <TextField
                select
                fullWidth
                id="currency"
                name="currency"
                label="Валюта"
                value={formik.values.currency}
                onChange={formik.handleChange}
                disabled={currentStep !== 3} 
              >
                <MenuItem value="RUB">RUB</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
              </TextField>
            </Box>
          </Box>
          {currentStep === 3 && (
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Продолжить
            </Button>
          )}
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default BankInfoStep;