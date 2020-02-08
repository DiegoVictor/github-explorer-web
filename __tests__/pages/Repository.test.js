import React from 'react';
import { Router } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';
import { render, fireEvent, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';

import factory from '../utils/factories';
import api from '~/services/api';
import Repository from '~/components/pages/Repository';

const history = createBrowserHistory();
const api_mock = new MockAdapter(api);
const login = faker.internet.userName();

let repository;
let name;

describe('Repository page', () => {
  beforeAll(async () => {
    repository = await factory.attrs('Repository', {
      owner: {
        login,
        avatar_url: faker.image.imageUrl(),
      },
    });
    name = repository.name;

    api_mock.onGet(`repos/${name}`).reply(200, repository);
  });

  it('should be able to go to dashboard', async () => {
    let getByTestId;
    const issues = await factory.attrsMany('Issue', 3, {
      html_url: `https://github.com/${login}/${name}/issues`,
    });

    api_mock
      .onGet(`repos/${name}/issues`, {
        params: { page: 1, per_page: 5, state: 'all' },
      })
      .reply(200, issues);

    await act(async () => {
      const component = render(
        <Router history={history}>
          <Repository match={{ params: { repository: name } }} />
        </Router>
      );

      getByTestId = component.getByTestId;
    });

    await act(async () => {
      fireEvent.click(getByTestId('back'));
    });

    expect(history.location.pathname).toBe('/');
  });

  it('should be able to see a repository data', async () => {
    let getByTestId;
    let getByText;

    const issues = await factory.attrsMany('Issue', 3, {
      html_url: `https://github.com/${login}/${name}/issues`,
    });

    api_mock
      .onGet(`repos/${name}/issues`, {
        params: { page: 1, per_page: 5, state: 'all' },
      })
      .reply(200, issues);

    await act(async () => {
      const component = render(
        <Router history={history}>
          <Repository match={{ params: { repository: name } }} />
        </Router>
      );

      getByTestId = component.getByTestId;
      getByText = component.getByText;
    });

    expect(getByText(name)).toBeInTheDocument();
    expect(getByText(repository.description)).toBeInTheDocument();
    expect(getByTestId('avatar')).toHaveAttribute(
      'src',
      repository.owner.avatar_url
    );
  });

  it('should be able to get only opened issues', async () => {
    let getByTestId;
    let queryByText;

    const opened_issue = await factory.attrs('Issue', {
      html_url: `https://github.com/${login}/${name}/issues`,
    });

    const closed_issue = await factory.attrs('Issue', {
      html_url: `https://github.com/${login}/${name}/issues`,
      status: 'closed',
    });

    api_mock
      .onGet(`repos/${name}/issues`, {
        params: { page: 1, per_page: 5, state: 'open' },
      })
      .reply(200, [opened_issue, closed_issue]);

    await act(async () => {
      const component = render(
        <Router history={history}>
          <Repository match={{ params: { repository: name } }} />
        </Router>
      );

      getByTestId = component.getByTestId;
      queryByText = component.queryByText;
    });

    await act(async () => {
      fireEvent.change(getByTestId('state'), { target: { value: 'open' } });
    });

    expect(getByTestId(`issue_${opened_issue.id}`)).toBeInTheDocument();
    expect(queryByText(`issue_${closed_issue.id}`)).not.toBeInTheDocument();
  });

  it('should be able to move to the next/previous page', async () => {
    let getByTestId;
    const issues = await factory.attrsMany('Issue', 10, {
      html_url: `https://github.com/${login}/${name}/issues`,
    });
    const first_page = issues.slice(0, 5);
    const last_page = issues.slice(-5);

    api_mock
      .onGet(`repos/${name}/issues`, {
        params: { page: 1, per_page: 5, state: 'all' },
      })
      .reply(200, first_page);
    api_mock
      .onGet(`repos/${name}/issues`, {
        params: { page: 2, per_page: 5, state: 'all' },
      })
      .reply(200, last_page);

    await act(async () => {
      const component = render(
        <Router history={history}>
          <Repository match={{ params: { repository: name } }} />
        </Router>
      );

      getByTestId = component.getByTestId;
    });

    await act(async () => {
      fireEvent.click(getByTestId('next'));
    });

    last_page.forEach(issue => {
      expect(getByTestId(`issue_${issue.id}`)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(getByTestId('previous'));
    });

    first_page.forEach(({ id }) => {
      expect(getByTestId(`issue_${id}`)).toBeInTheDocument();
    });
  });
});
