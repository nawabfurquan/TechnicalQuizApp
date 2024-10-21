import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('renders button', () => {
    const { getByText } = render(<Button className={'class'} text={'text'} />);
    const buttonElement = getByText('text');
    expect(buttonElement).toBeInTheDocument();
  });
});
