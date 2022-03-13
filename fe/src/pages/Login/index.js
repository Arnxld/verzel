import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form, ContentHeader } from './styles';

import useErrors from '../../hooks/useErrors';
import { AuthContext } from '../../Context/AuthContext';

import Input from '../../components/Input';
import Button from '../../components/Button';
import FormField from '../../components/FormField';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { authenticated, handleLogin } = useContext(AuthContext);

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

    handleLogin({ username, password });
  }

  const isFormValid = (username && password && errors.length === 0);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <ContentHeader>Faça seu login</ContentHeader>
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

      <Button type="submit" disabled={!isFormValid}>Entrar</Button>

      <div className="not-registered">
        <span>Não possui conta? </span>
        <Link to="/register">Cadastre-se</Link>
      </div>
    </Form>
  );
}
