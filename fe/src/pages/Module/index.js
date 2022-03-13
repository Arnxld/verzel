import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import api from '../../api';
import {
  Container, ListContainer, ClassCard, Header,
} from './styles';

export default function Module() {
  const [classes, setClasses] = useState([]);
  const [module, setModule] = useState([]);
  const { authenticated, isAdmin } = useContext(AuthContext);

  const { id } = useParams();

  useEffect(() => {
    async function loadClasses() {
      const { data } = await api.get(`/modules/${id}`);

      setClasses(data.classes);
      setModule(data.module);
    }

    loadClasses();
  }, [classes]);

  function handleClassDelete(classId) {
    api.delete(`/classes/${classId}`);

    const filteredModules = classes.filter((item) => item.id !== classId);

    setClasses(filteredModules);
  }

  return (
    <Container>
      <Header>
        <h1>{module.name}</h1>
        <h2>{module.total_classes === '1' ? `${module.total_classes} Aula disponível` : `${module.total_classes} Aulas disponíveis`}</h2>
      </Header>

      <ListContainer>

        {classes.map((item) => (
          <ClassCard isAdmin={isAdmin} key={item.id}>
            <div className="card-info">
              <h1>{item.name}</h1>
              <span>{item.class_date}</span>
            </div>
            {authenticated && isAdmin && (

              <div className="card-actions">
                <Link to={`/classes/edit/${item.id}`}>Editar</Link>
                <button type="button" onClick={() => handleClassDelete(item.id)}>Excluir</button>
              </div>
            )}
          </ClassCard>
        ))}
      </ListContainer>
    </Container>

  );
}
