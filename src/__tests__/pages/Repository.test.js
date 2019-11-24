import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { render, fireEvent, act } from "@testing-library/react";
import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';

import api from '~/services/api';
import Repository from "~/components/pages/Repository";

const history = createBrowserHistory();
const api_mock = new MockAdapter(api);

const id = faker.random.number();
const description = faker.lorem.words(10);
const login = faker.internet.userName();
const avatar_url = faker.image.imageUrl();

function generateIssuesPage() {
  const issues = [];
  for(let i = 0; i < 5; i += 1) {
    issues.push({
      id: faker.random.number(),
      user: {
        avatar_url,
        login
      },
      html_url: `https://github.com/${login}/test/issues/`,
      title: faker.name.title(),
      labels: [
        {
          id: faker.random.number(),
          name: faker.lorem.word()
        }
      ]
    });
  }
  return issues;
}

api_mock.onGet('https://api.github.com/repos/test').reply(200, {
  name: 'test',
  description,
  owner: {
    avatar_url,
    login
  }
});

const all_issues = generateIssuesPage();
api_mock.onGet('https://api.github.com/repos/test/issues', {
  params: { state: 'all', page: 1, per_page: 5 }
}).reply(200, all_issues);

const opened_issue = {
  id,
  user: {
    avatar_url,
    login
  },
  html_url: `https://github.com/${login}/test/issues/`,
  title: faker.name.title(),
  labels: [
    {
      id: faker.random.number(),
      name: faker.lorem.word()
    }
  ],
  state: 'open'
};

api_mock.onGet('https://api.github.com/repos/test/issues', {
  params: { state: 'open', per_page: 5, page: 1 }
}).reply(200, [opened_issue]);

describe('Repository page', () => {
  it('should be able to go to dashboard', async () => {
    let getByTestId;
    await act(async () => {
      const component = render(<Router history={history}>
        <Repository match={{  params: { repository: 'test' } }} />
      </Router>);

      getByTestId = component.getByTestId;
    });

    await act(async () => {
      fireEvent.click(getByTestId('back'));
    });

    expect(history.location.pathname).toBe('/');
  });

  it('should be able to see a repository data', async () => {
    let getByTestId, getByText;
    await act(async () => {
      const component = render(<Router history={history}>
        <Repository match={{ params: { repository: 'test' } }} />
      </Router>);

      getByTestId = component.getByTestId;
      getByText = component.getByText;
    });

    expect(getByText('test')).toBeInTheDocument();
    expect(getByText(description)).toBeInTheDocument();
    expect(getByTestId('avatar')).toHaveAttribute('src', avatar_url);
  });

  it('should be able to get only opened issues', async () => {
    let getByTestId;
    await act(async () => {
      const component = render(<Router history={history}>
        <Repository match={{ params: { repository: 'test' } }} />
      </Router>);

      getByTestId = component.getByTestId;
    });

    await act(async () => {
      fireEvent.change(getByTestId('state'), { target: { value: 'open' }});
    });

    expect(getByTestId(`issue_${opened_issue.id}`)).toBeInTheDocument();
  });

  it('should be able to move to the next/previous page', async () => {
    let getByTestId;
    await act(async () => {
      const component = render(<Router history={history}>
        <Repository match={{ params: { repository: 'test' } }} />
      </Router>);

      getByTestId = component.getByTestId;
    });

    const page = generateIssuesPage();
    api_mock.onGet('https://api.github.com/repos/test/issues', {
      params: { page: 2, per_page: 5, state: 'all' }
    }).reply(200, page);

    await act(async () => {
      fireEvent.click(getByTestId('next'));
    });

    for(const { id } of page) {
      expect(getByTestId(`issue_${id}`)).toBeInTheDocument();
    }

    await act(async () => {
      fireEvent.click(getByTestId('previous'));
    });

    for(const { id } of all_issues) {
      expect(getByTestId(`issue_${id}`)).toBeInTheDocument();
    }
  });
});
