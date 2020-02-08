import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';
import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';

import factory from '../utils/factories';
import api from '~/services/api';
import Main from '~/components/pages/Main';

const history = createBrowserHistory();
const api_mock = new MockAdapter(api);
const login = faker.internet.userName();
const name = faker.lorem.word();

let repository;

describe('Main page', () => {
  beforeAll(async () => {
    repository = await factory.attrs('Repository', {
      name,
      full_name: `${login}/${name}`,
      owner: {
        login,
        avatar_url: faker.image.imageUrl(),
      },
    });

    api_mock.onGet(`repos/${name}`).reply(200, repository);
  });

  beforeEach(async () => {
    await act(async () => {
      localStorage.clear();
    });
  });

  it('should be able to go to repository details', () => {
    localStorage.setItem('repositories', JSON.stringify([{ name }]));

    const { getByTestId } = render(
      <Router history={history}>
        <Main />
      </Router>
    );

    fireEvent.click(getByTestId(`repository_${name}`));
    expect(history.location.pathname).toBe(`/repository/${name}`);
  });

  it('should be able to add a repository', async () => {
    api_mock.onGet(`repos/${name}`).reply(200, repository);

    const { getByPlaceholderText, getByTestId } = render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
    const input = getByPlaceholderText('username/project');

    await act(async () => {
      fireEvent.change(input, { target: { value: name } });
    });

    await act(async () => {
      fireEvent.submit(getByTestId('submit'));
    });

    expect(input.value).toBe('');
    expect(localStorage.__STORE__.repositories).toBe(
      JSON.stringify([{ name: `${login}/${name}` }])
    );
  });

  it('should be not able to add a repository', async () => {
    localStorage.setItem('repositories', JSON.stringify([{ name }]));

    const { getByPlaceholderText, getByTestId } = render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
    const input = getByPlaceholderText('username/project');

    await act(async () => {
      fireEvent.change(input, { target: { value: name } });
    });

    await act(async () => {
      fireEvent.submit(getByTestId('submit'));
    });

    expect(input.value).toBe(name);
    expect(getByTestId('error')).toHaveTextContent('Repositório duplicado');
  });
});
