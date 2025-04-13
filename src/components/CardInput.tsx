import { TextField, InputAdornment } from '@mui/material';
import { useState, useEffect } from 'react';

interface CardInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

const CardInput = ({ value, onChange, error, helperText, disabled }: CardInputProps) => {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    const formatted = value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
    setDisplayValue(formatted);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    const limited = input.slice(0, 16);
    onChange(limited);
  };

  return (
    <TextField
      fullWidth
      label="Card Number"
      value={displayValue}
      onChange={handleChange}
      error={error}
      helperText={helperText}
      disabled={disabled}
      inputProps={{ maxLength: 19 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {value.length > 0 ? (
              <img
                src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${
                  value.startsWith('4') ? 'visa' : 
                  value.startsWith('5') ? 'mastercard' : 
                  value.startsWith('3') ? 'amex' : 'credit-card'
                }.png`}
                alt="card"
                height="20"
              />
            ) : null}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CardInput;