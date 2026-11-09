export interface Field {
  name: string;
  type: string;
}

export type OutputFormat = 'json' | 'csv' | 'sql';

export interface GenerateOptions {
  fields: Field[];
  count: number;
  format: OutputFormat;
  fileName: string;
  tableName?: string;
}
