import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader component', () => {
  test('renders loader with image', () => {
    const { getByAltText } = render(<Loader />);
    const imageElement = getByAltText('Loading...');
    expect(imageElement).toBeInTheDocument();
  });

  test('renders loader container', () => {
    const { container } = render(<Loader />);
    const containerElement = container.querySelector('.container');
    expect(containerElement).toBeInTheDocument();
  });
});
