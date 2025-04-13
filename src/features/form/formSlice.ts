import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  currentStep: number;
  phone: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: string;
    company?: string;
    additionalInfo?: string;
    comment?: string;
  };
  bankInfo: {
    cardNumber: string;
    cvv: string;
    expiryDate: string;
    amount: string;
    currency: string;
  };
}

const initialState: FormState = {
  currentStep: 1,
  phone: '',
  personalInfo: {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    company: '',
    additionalInfo: '',
    comment: '',
  },
  bankInfo: {
    cardNumber: '',
    cvv: '',
    expiryDate: '',
    amount: '',
    currency: 'RUB',
  },
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setPersonalInfo: (state, action: PayloadAction<Partial<FormState['personalInfo']>>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    setBankInfo: (state, action: PayloadAction<Partial<FormState['bankInfo']>>) => {
      state.bankInfo = { ...state.bankInfo, ...action.payload };
    },
    resetForm: () => initialState,
  },
});

export const { setCurrentStep, setPhone, setPersonalInfo, setBankInfo, resetForm } = formSlice.actions;
export default formSlice.reducer;