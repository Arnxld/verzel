import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, ContentHeader } from './styles';
import api from '../../api';

import useErrors from '../../hooks/useErrors';
// import { AuthContext } from '../../Context/AuthContext';

import Input from '../../components/Input';
import Button from '../../components/Button';
import FormField from '../../components/FormField';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  // const { authenticated, handleLogin } = useContext(AuthContext);

  // console.log(authenticated);

  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  function handleNameChange(event) {
    setUsername(event.target.value);

    if (!event.target.value) { // state update é assíncrono, por isso fazer a validação no target
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);

    if (event.target.value === '') {
      setError({
        field: 'password',
        message: 'Senha obrigatória',
      });
    } else {
      removeError('password');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      username,
      password,
    };

    api.post('/signup', data);

    history.push('/login');

    toast.success('Conta criada, faça seu login!');
  }

  const isFormValid = (username && password && errors.length === 0);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <ContentHeader>Crie sua conta</ContentHeader>
      <FormField error={getErrorMessageByFieldName('name')}>
        <Input
          type="text"
          placeholder="Nome *"
          value={username}
          onChange={handleNameChange}
          error={getErrorMessageByFieldName('name')}
        />
      </FormField>

      <FormField error={getErrorMessageByFieldName('password')}>
        <Input
          type="password"
          placeholder="*******"
          value={password}
          onChange={handlePasswordChange}
          error={getErrorMessageByFieldName('password')}
        />
      </FormField>

      <Button type="submit" className="submitButton" disabled={!isFormValid}>Cadastrar</Button>

      <div className="not-registered">
        <span>Já possui uma conta? </span>
        <Link to="/login">Entre aqui!</Link>
      </div>
    </Form>
  );
}
