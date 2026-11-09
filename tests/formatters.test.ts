import { describe, test, expect } from 'bun:test';
import { escapeCSVValue, escapeSQLValue, recordToCSVLine, recordToSQLInsert, recordsToJSON, recordsToCSV, recordsToSQL } from '../src/formatters';

describe('formatters', () => {
  describe('escapeCSVValue', () => {
    test('should return empty string for null/undefined', () => {
      expect(escapeCSVValue(null)).toBe('');
      expect(escapeCSVValue(undefined)).toBe('');
    });

    test('should not escape simple values', () => {
      expect(escapeCSVValue('hello')).toBe('hello');
      expect(escapeCSVValue(123)).toBe('123');
      expect(escapeCSVValue(true)).toBe('true');
    });

    test('should escape values with commas', () => {
      expect(escapeCSVValue('hello, world')).toBe('"hello, world"');
    });

    test('should escape values with quotes', () => {
      expect(escapeCSVValue('say "hello"')).toBe('"say ""hello"""');
    });

    test('should escape values with newlines', () => {
      expect(escapeCSVValue('line1\nline2')).toBe('"line1\nline2"');
    });
  });

  describe('escapeSQLValue', () => {
    test('should return NULL for null/undefined', () => {
      expect(escapeSQLValue(null)).toBe('NULL');
      expect(escapeSQLValue(undefined)).toBe('NULL');
    });

    test('should not quote numbers', () => {
      expect(escapeSQLValue(123)).toBe('123');
      expect(escapeSQLValue(45.67)).toBe('45.67');
    });

    test('should not quote booleans', () => {
      expect(escapeSQLValue(true)).toBe('true');
      expect(escapeSQLValue(false)).toBe('false');
    });

    test('should quote strings', () => {
      expect(escapeSQLValue('hello')).toBe("'hello'");
    });

    test('should escape single quotes', () => {
      expect(escapeSQLValue("it's good")).toBe("'it''s good'");
    });
  });

  describe('recordToCSVLine', () => {
    test('should convert record to CSV line', () => {
      const record = { name: 'John', age: 30, city: 'New York' };
      const headers = ['name', 'age', 'city'];
      expect(recordToCSVLine(record, headers)).toBe('John,30,New York');
    });

    test('should escape special characters', () => {
      const record = { name: 'John, Jr.', note: 'says "hi"' };
      const headers = ['name', 'note'];
      expect(recordToCSVLine(record, headers)).toBe('"John, Jr.","says ""hi"""');
    });
  });

  describe('recordToSQLInsert', () => {
    test('should create INSERT statement', () => {
      const record = { name: 'John', age: 30 };
      const headers = ['name', 'age'];
      const result = recordToSQLInsert(record, 'users', headers);
      expect(result).toBe("INSERT INTO users (name, age) VALUES ('John', 30);");
    });

    test('should handle null values', () => {
      const record = { name: 'John', email: null };
      const headers = ['name', 'email'];
      const result = recordToSQLInsert(record, 'users', headers);
      expect(result).toBe("INSERT INTO users (name, email) VALUES ('John', NULL);");
    });
  });

  describe('recordsToJSON', () => {
    test('should convert records to JSON', () => {
      const records = [{ name: 'John' }, { name: 'Jane' }];
      const result = recordsToJSON(records);
      expect(result).toContain('"name": "John"');
      expect(result).toContain('"name": "Jane"');
    });
  });

  describe('recordsToCSV', () => {
    test('should convert records to CSV with headers', () => {
      const records = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 }
      ];
      const headers = ['name', 'age'];
      const result = recordsToCSV(records, headers);
      const lines = result.split('\n');
      expect(lines[0]).toBe('name,age');
      expect(lines[1]).toBe('John,30');
      expect(lines[2]).toBe('Jane,25');
    });
  });

  describe('recordsToSQL', () => {
    test('should convert records to SQL statements', () => {
      const records = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 }
      ];
      const headers = ['name', 'age'];
      const result = recordsToSQL(records, 'users', headers);
      expect(result).toContain('-- Gerado em');
      expect(result).toContain('-- Total de registros: 2');
      expect(result).toContain("INSERT INTO users (name, age) VALUES ('John', 30);");
      expect(result).toContain("INSERT INTO users (name, age) VALUES ('Jane', 25);");
    });
  });
});
