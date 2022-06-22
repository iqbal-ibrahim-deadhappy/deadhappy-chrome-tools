import { screen, render } from '@testing-library/react';
import React from 'react';
import { Zoom } from '../components/zoom';

describe('Header', () => {
    it('should render', () => {
      render(
        <Zoom/>,
      );
  
      expect(screen.getAllByRole('button')).toHaveLength(7)
      expect(screen.getByText('Deathwishes Standup')).toBeVisible();
    });

})