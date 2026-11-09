import { describe, test, expect } from 'bun:test';
import { parseFields, generateRecord, generateData } from '../src/generators';

describe('generators', () => {
  describe('parseFields', () => {
    test('should parse valid field string', () => {
      const result = parseFields('name:firstName,email:email,age:number');
      expect(result).toEqual([
        { name: 'name', type: 'firstName' },
        { name: 'email', type: 'email' },
        { name: 'age', type: 'number' }
      ]);
    });

    test('should handle whitespace', () => {
      const result = parseFields(' name : firstName , email : email ');
      expect(result).toEqual([
        { name: 'name', type: 'firstName' },
        { name: 'email', type: 'email' }
      ]);
    });

    test('should throw error for invalid format', () => {
      expect(() => parseFields('invalid')).toThrow('Invalid field format');
    });

    test('should throw error for unknown type', () => {
      expect(() => parseFields('name:unknownType')).toThrow('Unknown faker type');
    });
  });

  describe('generateRecord', () => {
    test('should generate record with specified fields', () => {
      const fields = [
        { name: 'name', type: 'firstName' },
        { name: 'email', type: 'email' }
      ];
      const record = generateRecord(fields);
      
      expect(record).toHaveProperty('name');
      expect(record).toHaveProperty('email');
      expect(typeof record.name).toBe('string');
      expect(typeof record.email).toBe('string');
    });

    test('should generate different values on each call', () => {
      const fields = [{ name: 'id', type: 'uuid' }];
      const record1 = generateRecord(fields);
      const record2 = generateRecord(fields);
      
      expect(record1.id).not.toBe(record2.id);
    });
  });

  describe('generateData', () => {
    test('should generate specified number of records', () => {
      const fields = [{ name: 'name', type: 'firstName' }];
      const data = generateData(fields, 5);
      
      expect(data).toHaveLength(5);
      expect(data[0]).toHaveProperty('name');
    });

    test('should generate empty array for count 0', () => {
      const fields = [{ name: 'name', type: 'firstName' }];
      const data = generateData(fields, 0);
      
      expect(data).toHaveLength(0);
    });

    test('should generate unique records', () => {
      const fields = [{ name: 'id', type: 'uuid' }];
      const data = generateData(fields, 3);
      
      const ids = data.map(r => r.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(3);
    });
  });
});
