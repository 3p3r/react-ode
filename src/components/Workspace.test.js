import { render } from '@testing-library/react';
import Workspace from './Workspace';

test('renders without blowing up', () => {
  render(<Workspace />);
});
