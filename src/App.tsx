import { Container} from '@mui/material';
import PhoneConfirmationStep from './components/PhoneConfirmationStep';
import PersonalInfoStep from './components/PersonalInfoStep';
import BankInfoStep from './components/BankInfoStep';
import ConfirmationStep from './components/ConfirmationStep';

function App() {

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <PhoneConfirmationStep />
      <PersonalInfoStep />
      <BankInfoStep />
      <ConfirmationStep />
    </Container>
  );
}

export default App;