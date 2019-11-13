import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';

import api from '~/services/api';
import Container from '~/components/Container';
import {
  Loading,
  Owner,
  IssueList,
  StatusList,
  Filters,
  Pagination,
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    state: 'all',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const { page } = this.state;

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      loading: false,
      repository: repository.data,
      issues: issues.data,
    });
  }

  handleStatusChange = async e => {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const state = e.target.value;

    this.setState({ loading: true });
    const response = await api.get(`repos/${repoName}/issues`, {
      params: {
        per_page: 5,
        state,
      },
    });
    this.setState({
      issues: response.data,
      loading: false,
      page: 1,
      state,
    });
  };

  handlePagination = async page => {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const { state } = this.state;

    this.setState({ loading: true });
    const response = await api.get(`repos/${repoName}/issues`, {
      params: {
        per_page: 5,
        state,
        page,
      },
    });
    this.setState({
      issues: response.data,
      loading: false,
      page,
    });
  };

  render() {
    const { repository, issues, loading, state, page } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Filters>
          <StatusList value={state} onChange={this.handleStatusChange}>
            <option value="all">Todas</option>
            <option value="open">Abertas</option>
            <option value="closed">Fechadas</option>
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
            onClick={() => this.handlePagination(page - 1)}
          >
            <FaLongArrowAltLeft color="#7159c1" />
          </button>
          <button
            type="button"
            disabled={issues.length < 5}
            onClick={() => this.handlePagination(page + 1)}
          >
            <FaLongArrowAltRight color="#7159c1" />
          </button>
        </Pagination>
      </Container>
    );
  }
}
