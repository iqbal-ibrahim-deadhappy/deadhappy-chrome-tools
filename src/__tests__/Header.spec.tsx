import { screen, render } from '@testing-library/react';
import React from 'react';
import { Header } from '../components/header';
import { User } from '../types';

const user: User = {
    email: 'test.ing@deadhappy.com',
    firstName: 'Test',
    lastName: 'Ing',
    name: 'Testing'
}

describe('Header', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ number: 100 }),
      }),
    ) as jest.Mock;
  })
    it('should render', () => {
      render(
        <Header user={user}/>,
      );
  
      expect(screen.getByText('Welcome,')).toBeVisible();
      expect(screen.getByText(new Date().toLocaleDateString())).toBeVisible();
    });

})