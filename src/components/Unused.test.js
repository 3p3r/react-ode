import { render } from '@testing-library/react';
import Unused from './Unused';

test('renders without blowing up', () => {
  render(<Unused label='test' />);
});
