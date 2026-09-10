import { describe, expect, it } from 'vitest';
import { normalizeTags } from './utils';
describe('normalizeTags', () => {
  it('trims, removes blanks, and deduplicates tags', () => expect(normalizeTags(' git, status,git,  ')).toEqual(['git', 'status']));
});
