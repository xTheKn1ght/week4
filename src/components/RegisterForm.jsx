import useForm from '../hooks/formHooks';
import { useUser } from '../hooks/apiHooks';

const RegisterForm = () => {
  const initValues = { username: '', password: '', email: '' };
  const { postUser } = useUser();

  const doRegister = async () => {
    try {
      const result = await postUser(inputs);
      console.log('Registered:', result);
    } catch (e) {
      console.error('Registration failed:', e.message);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(doRegister, initValues);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <label>Username</label>
      <input name="username" type="text" onChange={handleInputChange} />
      <label>Email</label>
      <input name="email" type="email" onChange={handleInputChange} />
      <label>Password</label>
      <input name="password" type="password" onChange={handleInputChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
