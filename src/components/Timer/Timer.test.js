import React from 'react';
import { render } from '@testing-library/react';
import Timer from './Timer';

describe('Timer component', () => {
  test('renders timer container', () => {
    const { container } = render(<Timer timeRemaining={120} />);
    const timerContainer = container.querySelector('.timer');
    expect(timerContainer).toBeInTheDocument();
  });

  test('renders formatted time', () => {
    const { getByText } = render(<Timer timeRemaining={90} />);
    const boldTimeElement = getByText('01:30');
    expect(boldTimeElement).toBeInTheDocument();
  });
});
