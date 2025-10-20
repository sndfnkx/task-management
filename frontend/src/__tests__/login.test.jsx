import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import api from '../api/axios';

// мокируем useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

test('login stores token and navigates to /dashboard', async () => {
  jest.spyOn(api, 'post').mockResolvedValueOnce({
    data: { token: 'T', username: 'Alice', email: 'alice@example.com' }
  });

  render(<MemoryRouter><LoginPage /></MemoryRouter>);

  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  await new Promise(r => setTimeout(r, 0));

  expect(localStorage.getItem('token')).toBe('T');
  expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
});
