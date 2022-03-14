import 'react-datepicker/dist/react-datepicker.css';
import {
  useState, useContext, useEffect, forwardRef,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { formatISO } from 'date-fns';

import api from '../../api';
import { Form, ContentHeader } from './styles';

import useErrors from '../../hooks/useErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import FormField from '../../components/FormField';

export default function SignUp() {
  const [name, setName] = useState('');
  const [classOldName, setClassOldName] = useState('');
  const [classDate, setClassDate] = useState(new Date());

  const { id } = useParams();

  useEffect(() => {
    async function loadClass() {
      const { data } = await api.get(`/classes/${id}`);
      setName(data.name);
      setClassOldName(data.name);
      setClassDate(new Date(data.class_date));
    }

    loadClass();
  }, []);

  const history = useHistory();

  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) { // state update é assíncrono, por isso fazer a validação no target
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleDateChange(date) {
    if ((date - Date.now()) < 0) {
      setError({ field: 'date', message: 'Horário inválido' });
    } else {
      removeError('date');
    }

    setClassDate(date);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      name,
      class_date: formatISO(classDate),
    };

    api.put(`/classes/${id}`, data);

    history.push('/');

    toast.success('Aula atualizada com sucesso!');
  }

  const isFormValid = (name && errors.length === 0);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <ContentHeader>Atualizar classe: {classOldName}</ContentHeader>
      <FormField error={getErrorMessageByFieldName('name')}>
        <Input
          type="text"
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByFieldName('name')}
        />
      </FormField>

      <FormField error={getErrorMessageByFieldName('date')}>

        <DatePicker
          onChange={(date) => handleDateChange(date)}
          selected={classDate}
          showTimeSelect
          minDate={Date.now()}
          className="custom-date-picker"
          onChangeRaw={(e) => e.preventDefault()}
        />
      </FormField>
      <Button className="submitButton" type="submit" disabled={!isFormValid}>Atualizar</Button>
    </Form>
  );
}
