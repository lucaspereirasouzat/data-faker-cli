import { describe, test, expect } from 'bun:test';
import { fakerMethods, fakerCategories } from '../src/faker-methods';

describe('faker-methods', () => {
  describe('fakerMethods', () => {
    test('should have all expected method types', () => {
      expect(fakerMethods).toHaveProperty('firstName');
      expect(fakerMethods).toHaveProperty('email');
      expect(fakerMethods).toHaveProperty('number');
      expect(fakerMethods).toHaveProperty('uuid');
    });

    test('should generate valid data for firstName', () => {
      const result = fakerMethods.firstName();
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    test('should generate valid data for email', () => {
      const result = fakerMethods.email();
      expect(typeof result).toBe('string');
      expect(result).toContain('@');
    });

    test('should generate valid data for number', () => {
      const result = fakerMethods.number();
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(1000);
    });

    test('should generate valid data for uuid', () => {
      const result = fakerMethods.uuid();
      expect(typeof result).toBe('string');
      expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    });

    test('should generate valid data for boolean', () => {
      const result = fakerMethods.boolean();
      expect(typeof result).toBe('boolean');
    });

    test('all methods should be callable', () => {
      Object.entries(fakerMethods).forEach(([name, method]) => {
        expect(() => method()).not.toThrow();
      });
    });
  });

  describe('fakerCategories', () => {
    test('should have expected categories', () => {
      expect(fakerCategories).toHaveProperty('Pessoa');
      expect(fakerCategories).toHaveProperty('Internet');
      expect(fakerCategories).toHaveProperty('Números');
    });

    test('all category types should exist in fakerMethods', () => {
      Object.values(fakerCategories).forEach(types => {
        types.forEach(type => {
          expect(fakerMethods).toHaveProperty(type);
        });
      });
    });
  });
});
