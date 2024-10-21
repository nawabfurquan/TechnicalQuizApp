import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';
import { HEADER_TITLE } from '../../utils/constant';

describe('Header component', () => {
  test('renders with correct header title', () => {
    const { getByText } = render(<Header />);
    const headerElement = getByText(HEADER_TITLE);
    expect(headerElement).toBeInTheDocument();
  });
});
