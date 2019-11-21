import React, { useCallback, useEffect, useState } from 'react';
import { FaList, FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '~/services/api';
import Panel from '~/components/Panel';
import { Container, Form, Icon, Err, SubmitButton, List } from './styles';

export default function Main() {
  const [repo_name, setRepoName] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('repositories');

    if (data) {
      setRepositories(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const data = localStorage.getItem('repositories');
    if (data !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }, [repositories]);

  const handleInputChange = useCallback(e => {
    setRepoName(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();

      try {
        const duplicated_repos = repositories.filter(
          repo => repo.name === repo_name
        );
        if (duplicated_repos.length > 0) {
          throw new Error('Repositório duplicado');
        }

        setLoading(true);

        const response = await api.get(`/repos/${repo_name}`);
        const data = {
          name: response.data.full_name,
        };

        setRepositories([...repositories, data]);
        setRepoName('');
        setLoading(false);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [repositories, repo_name]
  );

  return (
    <Container>
          <Icon>
            <FaGithub color="#7B7A7A" size="30"/>
          </Icon>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={repo_name}
          onChange={handleInputChange}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFFFFF" size={14} />
          ) : (
            <FaPlus color="#FFFFFF" size={14} />
          )}
        </SubmitButton>
      </Form>

        <h1>
          <FaList />
          Repositórios
        </h1>

      <List>
        {repositories.map(repository => (
          <li key={repository.name}>
            <span>{repository.name}</span>
            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
