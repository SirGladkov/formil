import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material';

const steps = ['Phone Confirmation', 'Personal Info', 'Bank Info', 'Confirmation'];

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Форма заказа
      </Typography>
      <Stepper activeStep={currentStep - 1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepIndicator;