export function escapeCSVValue(value: any): string {
  const stringValue = value?.toString() || '';
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

export function escapeSQLValue(value: any): string {
  if (value === null || value === undefined) {
    return 'NULL';
  }
  
  if (typeof value === 'number' || typeof value === 'boolean') {
    return value.toString();
  }
  
  const stringValue = value.toString();
  // Escapar aspas simples duplicando-as
  return `'${stringValue.replace(/'/g, "''")}'`;
}

export function recordToCSVLine(record: Record<string, any>, headers: string[]): string {
  return headers.map(header => escapeCSVValue(record[header])).join(',');
}

export function recordToSQLInsert(record: Record<string, any>, tableName: string, headers: string[]): string {
  const columns = headers.join(', ');
  const values = headers.map(header => escapeSQLValue(record[header])).join(', ');
  return `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
}

export function recordsToJSON(records: any[]): string {
  return JSON.stringify(records, null, 2);
}

export function recordsToCSV(records: any[], headers: string[]): string {
  const csvRows = [headers.join(',')];
  records.forEach(record => {
    csvRows.push(recordToCSVLine(record, headers));
  });
  return csvRows.join('\n');
}

export function recordsToSQL(records: any[], tableName: string, headers: string[]): string {
  const sqlStatements = [
    `-- Gerado em ${new Date().toISOString()}`,
    `-- Total de registros: ${records.length.toLocaleString()}`,
    ''
  ];
  records.forEach(record => {
    sqlStatements.push(recordToSQLInsert(record, tableName, headers));
  });
  return sqlStatements.join('\n');
}
