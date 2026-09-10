import { describe, expect, it } from 'vitest';
import { detectTemplateVariables, detectTemplateVariablesInContents, expandTemplate, normalizeTags } from './utils';
describe('normalizeTags', () => {
  it('trims, removes blanks, and deduplicates tags', () => expect(normalizeTags(' git, status,git,  ')).toEqual(['git', 'status']));
});

describe('template variables', () => {
  it('detects valid variables once in first appearance order', () => expect(detectTemplateVariables('ssh {{USER}}@{{HOST}} {{USER}}')).toEqual(['USER', 'HOST']));
  it('ignores invalid placeholders and shell variables', () => expect(detectTemplateVariables('{{host}} {{ user }} {{host-name}} ${HOME} $PATH')).toEqual([]));
  it('deduplicates variables across command set steps', () => expect(detectTemplateVariablesInContents(['{{NAMESPACE}} {{POD}}', '{{POD}} {{NAMESPACE}}'])).toEqual(['NAMESPACE', 'POD']));
  it('replaces every occurrence without changing shell variables', () => expect(expandTemplate('{{USER}}:${HOME}:{{USER}}', { USER: 'alice' })).toBe('alice:${HOME}:alice'));
});
