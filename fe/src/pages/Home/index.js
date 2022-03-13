import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import {
  Container, ListContainer, ModuleCard, Header,
} from './styles';
import api from '../../api';
import { AuthContext } from '../../Context/AuthContext';

export default function Home() {
  const [modules, setModules] = useState([]);

  const { isAdmin, authenticated } = useContext(AuthContext);

  useEffect(() => {
    const loadModules = async () => {
      const response = await api.get('/modules');

      setModules(response.data);
    };

    loadModules();
  }, [modules]);

  function handleModuleDelete(id) {
    api.delete(`/modules/${id}`);

    const filteredModules = modules.filter((module) => module.id !== id);

    setModules(filteredModules);
  }

  return (
    <Container>
      <Header>
        <h1>Conheça nossos módulos!</h1>
        { isAdmin && <Link to="/modules/new">Novo módulo</Link>}
      </Header>

      <ListContainer>
        {modules.map((module) => (
          <ModuleCard key={module.id} isAdmin={isAdmin}>
            <div className="card-info">

              <h2>{module.name}</h2>
              <div>
                <span>
                  {module.total_classes === '1' ? `${module.total_classes} aula` : `${module.total_classes} aulas`}
                </span>
                <Link to={`/modules/${module.id}`}>Saiba mais!</Link>
              </div>
            </div>

            {authenticated && isAdmin && (

              <div className="card-actions">
                <Link to={`/modules/edit/${module.id}`}>Editar</Link>
                <button type="button" onClick={() => handleModuleDelete(module.id)}>Excluir</button>
              </div>
            )}
          </ModuleCard>
        ))}
      </ListContainer>
    </Container>
  );
}
