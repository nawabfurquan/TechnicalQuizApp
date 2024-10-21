import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import MainPage from './MainPage';

describe('Main Page component', () => {
  test('renders Main Page', () => {
    const { getByTestId } = render(<MainPage setQuizStarted={jest.fn()} />);
    const container = getByTestId('container');
    const header = getByTestId('header');
    const startButton = getByTestId('button');
    expect(container).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    fireEvent.click(startButton);
  });
});
