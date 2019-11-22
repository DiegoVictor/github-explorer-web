import React from 'react';
import { render, fireEvent, act } from "@testing-library/react";
import { BrowserRouter, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MockAdapter from 'axios-mock-adapter';

import api from '~/services/api';
import Main from "~/components/pages/Main";

const history = createBrowserHistory();
const api_mock = new MockAdapter(api);

describe('Main page', () => {
  beforeEach(async () => {
    await act(async () => {
      localStorage.clear();
    });
  });

  it('should be able to go to repository details', () => {
    localStorage.setItem('repositories', JSON.stringify([{ name: 'test'}]));

    const { getByTestId } = render(<Router history={history}><Main /></Router>);

    fireEvent.click(getByTestId('repository_test'));
    expect(history.location.pathname).toBe('/repository/test');
  });

  it('should be able to add a repository', async () => {
    api_mock.onGet('https://api.github.com/repos/test').reply(200, { full_name: 'test' });
    const { getByPlaceholderText, getByTestId } = render(<BrowserRouter><Main /></BrowserRouter>);
    const input = getByPlaceholderText('username/project');

    await act(async () => {
      fireEvent.change(
        input,
        { target: { value: 'test'} }
      );
    });

    await act(async () => {
      fireEvent.submit(getByTestId('submit'));
    });

    expect(input.value).toBe('');
    expect(localStorage.__STORE__.repositories).toBe(JSON.stringify([{ name: 'test' }]));
  });

  it('should be not able to add a repository', async () => {
    localStorage.setItem('repositories', JSON.stringify([{ name: 'test'}]));

    const { getByPlaceholderText, getByTestId } = render(<BrowserRouter><Main /></BrowserRouter>);
    const input = getByPlaceholderText('username/project');

    await act(async () => {
      fireEvent.change(
        input,
        { target: { value: 'test'} }
      );
    });

    await act(async () => {
      fireEvent.submit(getByTestId('submit'));
    });

    expect(input.value).toBe('test');
    expect(getByTestId('error')).toHaveTextContent('Repositório duplicado');
  });

});
