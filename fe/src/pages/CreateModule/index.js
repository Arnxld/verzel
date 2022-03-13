import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, ContentHeader } from './styles';
import api from '../../api';

import useErrors from '../../hooks/useErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import FormField from '../../components/FormField';

export default function SignUp() {
  const [name, setName] = useState('');

  const history = useHistory();

  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      name,
    };

    api.post('/modules', data);

    history.push('/');
  }

  const isFormValid = (name && errors.length === 0);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <ContentHeader>
        Novo módulo
      </ContentHeader>
      <FormField error={getErrorMessageByFieldName('name')}>
        <Input
          type="text"
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByFieldName('name')}
        />
      </FormField>

      <Button type="submit" disabled={!isFormValid}>Cadastrar</Button>
    </Form>
  );
}
