import React from 'react';
import { render } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage component', () => {
  test('renders error message with image and text', () => {
    const errorMessage = 'Example error message';
    const { getByAltText, getByText } = render(<ErrorMessage error={errorMessage} />);

    const imageElement = getByAltText('Error');
    expect(imageElement).toBeInTheDocument();

    const textElement = getByText(errorMessage);
    expect(textElement).toBeInTheDocument();
  });

  test('renders error container', () => {
    const errorMessage = 'Example error message';
    const { container } = render(<ErrorMessage error={errorMessage} />);
    const containerElement = container.querySelector('.container');
    expect(containerElement).toBeInTheDocument();
  });
});
