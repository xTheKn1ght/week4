import useForm from '../hooks/formHooks';
import { useAuthentication } from '../hooks/apiHooks';

const LoginForm = () => {
  const initValues = { username: '', password: '' };
  const { postLogin } = useAuthentication();

  const doLogin = async () => {
    try {
      const result = await postLogin(inputs);
      console.log(result);
      localStorage.setItem('token', result.token);
      window.location.href = '/'; // or use navigate('/')
    } catch (e) {
      console.error('Login failed:', e.message);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(doLogin, initValues);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label>Username</label>
      <input name="username" type="text" onChange={handleInputChange} />
      <label>Password</label>
      <input name="password" type="password" onChange={handleInputChange} />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
