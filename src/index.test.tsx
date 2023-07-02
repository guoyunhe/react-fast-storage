import { render, screen } from '@testing-library/react';
import { ReactStorage } from '.';

describe('<ReactStorage/>', () => {
  it('render', async () => {
    render(<ReactStorage>Hello</ReactStorage>);

    const elem = await screen.findByText('Hello');

    expect(elem.className).toBe('ReactStorage');
  });
});
