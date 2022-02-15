import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import {
  render,
  act,
  waitFor,
  fireEvent,
  Matcher,
  SelectorMatcherOptions,
} from '@testing-library/react';
import { Router, Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import factory from '../utils/factory';
import api from '../../src/services/api';
import Repository from '../../src/pages/Repository';

interface GitHubRepository {
  full_name: string;
  description: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

interface Issue {
  html_url: string;
}

describe('Repository page', () => {
  const apiMock = new MockAdapter(api);

  it('should be able to go back to dashboard page', async () => {
    const repository: GitHubRepository = await factory.attrs('Repository');
    const issues: Issue[] = await factory.attrsMany('Issue', 3);

    apiMock
      .onGet(`/repos/${repository.full_name}`)
      .reply(200, repository)
      .onGet(`/repos/${repository.full_name}/issues`)
      .reply(200, issues);

    const history = createMemoryHistory();
    history.push(`/repositories/${repository.full_name}`);

    let getByText: (
      id: Matcher,
      options?: SelectorMatcherOptions | undefined,
    ) => HTMLElement;

    await act(async () => {
      const component = render(
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path="/repositories/*" element={<Repository />} />
          </Routes>
        </Router>,
      );
      getByText = component.getByText;
    });

    await waitFor(() => getByText('Voltar'));

    await act(async () => {
      fireEvent.click(getByText('Voltar'));
    });
    expect(history.location.pathname).toBe('/');
  });
});
