import {
  PATHNAME_ROUTES,
  PATHNAME_ROUTES_LAST_SEGMENTS,
} from '@/modules/shared/infrastructure/ui/react/constants/main.constants';
import { getLastPathSegment } from '../getLastPathSegment.helper';

describe('getLastPathSegment', () => {
  it('should return the last segment of a given path', () => {
    const lastSegment = getLastPathSegment(PATHNAME_ROUTES.PROPERTY_DETAILS);
    expect(lastSegment).toBe(PATHNAME_ROUTES_LAST_SEGMENTS.PROPERTY_DETAILS);
  });

  it('should return index route if path is empty', () => {
    const lastSegment = getLastPathSegment('');
    expect(lastSegment).toBe(PATHNAME_ROUTES.INDEX);
  });
});
