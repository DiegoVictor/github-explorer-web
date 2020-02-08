import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import api from '~/services/api';
import Panel from '~/components/Panel';
import {
  Container,
  Back,
  Owner,
  IssueList,
  StatusList,
  Filters,
  Pagination,
} from './styles';

export default function Repository({ match }) {
  const [repository, setRepository] = useState(null);
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [state, setState] = useState('all');

  useEffect(() => {
    (async () => {
      const repo_name = decodeURIComponent(match.params.repository);
      const { data } = await api.get(`/repos/${repo_name}`);
      setRepository(data);
    })();
  }, [match]);

  useEffect(() => {
    (async () => {
      const repo_name = decodeURIComponent(match.params.repository);
      const { data } = await api.get(`/repos/${repo_name}/issues`, {
        params: {
          state,
          per_page: 5,
          page,
        },
      });

      setIssues(data);
    })();
  }, [match, page, state]);

  const handleStatusChange = useCallback(e => {
    setPage(1);
    setState(e.target.value);
  }, []);

  const handlePagination = useCallback(
    p => {
      (async () => {
        const repo_name = decodeURIComponent(match.params.repository);
        const { data } = await api.get(`repos/${repo_name}/issues`, {
          params: {
            per_page: 5,
            state,
            page: p,
          },
        });

        setIssues(data);
        setPage(p);
      })();
    },
    [match, state]
  );

  return (
    <Container>
      {repository && (
        <Panel>
          <Owner>
            <img
              data-testid="avatar"
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </Owner>

          <Filters>
            <StatusList
              data-testid="state"
              value={state}
              onChange={handleStatusChange}
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </StatusList>
          </Filters>

          <IssueList>
            {issues.map(issue => (
              <li data-testid={`issue_${issue.id}`} key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))}
          </IssueList>

          <Pagination>
            <button
              data-testid="previous"
              type="button"
              disabled={page < 2}
              onClick={() => handlePagination(page - 1)}
            >
              <FaArrowLeft color="#7B7A7A" /> Previous
            </button>
            <button
              data-testid="next"
              type="button"
              disabled={issues.length < 5}
              onClick={() => handlePagination(page + 1)}
            >
              Next <FaArrowRight color="#7B7A7A" />
            </button>
          </Pagination>
        </Panel>
      )}
      <Back to="/" data-testid="back">
        <FaArrowLeft />
      </Back>
    </Container>
  );
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
