import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setPersonalInfo, setCurrentStep } from '../features/form/formSlice';

const PersonalInfoStep = () => {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector((state) => state.form.currentStep);
  const personalInfo = useAppSelector((state) => state.form.personalInfo);

  const formik = useFormik({
    initialValues: personalInfo,
    validationSchema: Yup.object({
      firstName: Yup.string().required('Имя обязательно'),
      lastName: Yup.string().required('Фамилия обязательна'),
      address: Yup.string().required('Адрес обязателен'),
      city: Yup.string().required('Город обязателен'),
      zipCode: Yup.string().required('Почтовый индекс обязателен'),
    }),
    onSubmit: (values) => {
      dispatch(setPersonalInfo(values));
      dispatch(setCurrentStep(3));
    },
  });

  return (
    <Box
    className="step-box"
    sx={{
      opacity: currentStep !== 2 ? 0.5 : 1, 
      pointerEvents: currentStep !== 2 ? 'none' : 'auto',
    }}
  >
  <Typography variant="h6" gutterBottom>
    Личная информация
  </Typography>
  <form onSubmit={formik.handleSubmit}>
    <Box display="flex" flexDirection="column" gap={2}>
      <Box>
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="Имя"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          disabled={currentStep !== 2} 
        />
      </Box>
      <Box>
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Фамилия"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          disabled={currentStep !== 2}
        />
      </Box>
          <Box>
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Адрес"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              disabled={currentStep !== 2}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              id="city"
              name="city"
              label="Город"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
              disabled={currentStep !== 2}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              id="zipCode"
              name="zipCode"
              label="Почтовый индекс"
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
              helperText={formik.touched.zipCode && formik.errors.zipCode}
              disabled={currentStep !== 2}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              id="company"
              name="company"
              label="Компания (необязательно)"
              value={formik.values.company || ''}
              onChange={formik.handleChange}
              disabled={currentStep !== 2}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              id="additionalInfo"
              name="additionalInfo"
              label="Дополнительная информация (необязательно)"
              value={formik.values.additionalInfo || ''}
              onChange={formik.handleChange}
              disabled={currentStep !== 2}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              id="comment"
              name="comment"
              label="Комментарий (необязательно)"
              value={formik.values.comment || ''}
              onChange={formik.handleChange}
              disabled={currentStep !== 2}
            />
          </Box>
        </Box>
        {currentStep === 2 && (
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
  );
};

export default PersonalInfoStep;