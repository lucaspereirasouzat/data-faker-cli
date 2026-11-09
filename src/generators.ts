import type { Field } from './types';
import { fakerMethods } from './faker-methods';

export function parseFields(fieldsString: string): Field[] {
  return fieldsString.split(',').map(field => {
    const [name, type] = field.trim().split(':').map(s => s.trim());
    if (!name || !type) {
      throw new Error(`Invalid field format: ${field}. Use format: name:type`);
    }
    if (!fakerMethods[type]) {
      throw new Error(`Unknown faker type: ${type}. Available types: ${Object.keys(fakerMethods).join(', ')}`);
    }
    return { name, type };
  });
}

export function generateRecord(fields: Field[]): Record<string, any> {
  const record: Record<string, any> = {};
  fields.forEach(field => {
    const method = fakerMethods[field.type];
    if (method) {
      record[field.name] = method();
    }
  });
  return record;
}

export function generateData(fields: Field[], count: number): any[] {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(generateRecord(fields));
  }
  return data;
}
