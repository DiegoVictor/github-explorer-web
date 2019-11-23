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

      const [{ data: repo }, { data: repo_issues }] = await Promise.all([
        api.get(`/repos/${repo_name}`),
        api.get(`/repos/${repo_name}/issues`, {
          params: {
            state,
            per_page: 5,
            page,
          },
        }),
      ]);

      setRepository(repo);
      setIssues(repo_issues);
      setLoading(false);
    })();
  }, [match, page, state]);

  const handleStatusChange = useCallback(
    e => {
      (async () => {
        const repo_name = decodeURIComponent(match.params.repository);
        const state = e.target.value;

        setLoading(true);
        const { data } = await api.get(`repos/${repo_name}/issues`, {
          params: {
            per_page: 5,
            state,
          },
        });

        setLoading(false);
        setState(state);
        setIssues(data);
        setPage(1);
      })();
    },
    [match]
  );

  const handlePagination = useCallback(
    p => {
      (async () => {
        const repo_name = decodeURIComponent(match.params.repository);
        const response = await api.get(`repos/${repo_name}/issues`, {
          params: {
            per_page: 5,
            state,
            page: p,
          },
        });

        setIssues(response.data);
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
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </Owner>

          <Filters>
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </StatusList>
          </Filters>

          <IssueList>
            {issues.map(issue => (
              <li key={String(issue.id)}>
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
              type="button"
              disabled={page < 2}
              onClick={() => handlePagination(page - 1)}
            >
              <FaArrowLeft color="#7B7A7A" /> Previous
            </button>
            <button
              type="button"
              disabled={issues.length < 5}
              onClick={() => handlePagination(page + 1)}
            >
              Next <FaArrowRight color="#7B7A7A" />
            </button>
          </Pagination>
        </Panel>
      )}
      <Back to="/" data-tesid="back">
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
