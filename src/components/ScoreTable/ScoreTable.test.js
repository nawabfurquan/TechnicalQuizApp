import React from 'react';
import { render } from '@testing-library/react';
import ScoreTable from './ScoreTable';

describe('ScoreTable component', () => {
  test('renders scoreboard heading and table', () => {
    const scoreList = [10, 20, 0];
    const { getByText } = render(<ScoreTable scoreList={scoreList} />);

    const headingElement = getByText('Top 3 High Scores');
    expect(headingElement).toBeInTheDocument();

    const tableElement = getByText('Rank');
    expect(tableElement).toBeInTheDocument();
  });

  test('renders scoreList data in the table', () => {
    const scoreList = [10, 20, 0];
    const { getByText } = render(<ScoreTable scoreList={scoreList} />);
    const score10 = getByText('10');
    const score20 = getByText('20');
    const score0 = getByText('-');

    expect(score10).toBeInTheDocument();
    expect(score20).toBeInTheDocument();
    expect(score0).toBeInTheDocument();
  });
});
