import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { formatISO } from 'date-fns';
import { Form, ContentHeader } from './styles';
import api from '../../api';

import useErrors from '../../hooks/useErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import FormField from '../../components/FormField';
import Select from '../../components/Select';

export default function SignUp() {
  const [name, setName] = useState('');
  const [classDate, setClassDate] = useState(new Date());
  const [moduleOptions, setModuleOptions] = useState([]);
  const [module, setModule] = useState('');

  useEffect(() => {
    async function loadModuleSelect() {
      const { data } = await api.get('/modules');

      setModuleOptions(data);
      setModule(data[0]);
    }
    function roundToNearest30(date = new Date()) {
      const minutes = 30;
      const ms = 1000 * 60 * minutes;
      return new Date(Math.ceil(date.getTime() / ms) * ms);
    }

    setClassDate(roundToNearest30(new Date()));

    loadModuleSelect();
  }, []);

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
      module: module.name,
    };

    api.post('/classes', data);

    history.push('/');

    toast.success('Aula criada com sucesso!');
  }

  const isFormValid = (name && classDate && module && errors.length === 0);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <ContentHeader>
        Nova aula
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

      <FormField>
        <Select onChange={(event) => setModule(event.target.value)} value={module}>
          {moduleOptions.map((moduleOption) => (
            <option value={moduleOption.name} key={moduleOption.id}>{moduleOption.name}</option>
          ))};
        </Select>
      </FormField>

      <Button type="submit" className="submitButton" disabled={!isFormValid}>Cadastrar</Button>
    </Form>
  );
}
