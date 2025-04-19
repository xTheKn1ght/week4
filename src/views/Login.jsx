import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useState } from 'react';

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <button onClick={() => setShowLogin(!showLogin)}>
        {showLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
      {showLogin ? <LoginForm /> : <RegisterForm />}
    </>
  );
};

export default Login;
