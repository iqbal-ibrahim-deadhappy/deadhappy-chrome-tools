import { screen, render } from '@testing-library/react';
import React from 'react';
import Button from '../components/Button';

describe('Button', () => {
    it('should render a button', () => {
      render(
        <Button text='Hello I am button' onClickHandler={() => {}}/>,
      );
  
      expect(screen.getByText('Hello I am button')).toBeVisible();
    });

})