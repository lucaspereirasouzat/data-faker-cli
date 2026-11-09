import { createWriteStream } from 'fs';
import type { Field } from './types';
import { generateRecord } from './generators';
import { recordToCSVLine, recordToSQLInsert } from './formatters';

const CHUNK_SIZE = 10000; // Processar 10k registros por vez

export async function generateLargeCSV(fields: Field[], count: number, fileName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(fileName, { encoding: 'utf-8' });
    const headers = fields.map(f => f.name);
    
    stream.on('error', reject);
    stream.on('finish', resolve);
    
    // Escrever cabeçalho
    stream.write(headers.join(',') + '\n');
    
    let processed = 0;
    
    function writeChunk() {
      const remaining = count - processed;
      const chunkSize = Math.min(CHUNK_SIZE, remaining);
      
      for (let i = 0; i < chunkSize; i++) {
        const record = generateRecord(fields);
        const line = recordToCSVLine(record, headers);
        stream.write(line + '\n');
      }
      
      processed += chunkSize;
      const progress = ((processed / count) * 100).toFixed(1);
      process.stdout.write(`\rProgresso: ${progress}% (${processed.toLocaleString()}/${count.toLocaleString()} registros)`);
      
      if (processed < count) {
        // Continuar no próximo tick para não bloquear
        setImmediate(writeChunk);
      } else {
        console.log('\n');
        stream.end();
      }
    }
    
    writeChunk();
  });
}

export async function generateLargeJSON(fields: Field[], count: number, fileName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(fileName, { encoding: 'utf-8' });
    
    stream.on('error', reject);
    stream.on('finish', resolve);
    
    // Iniciar array JSON
    stream.write('[\n');
    
    let processed = 0;
    
    function writeChunk() {
      const remaining = count - processed;
      const chunkSize = Math.min(CHUNK_SIZE, remaining);
      const chunk: any[] = [];
      
      for (let i = 0; i < chunkSize; i++) {
        chunk.push(generateRecord(fields));
      }
      
      // Escrever chunk
      chunk.forEach((record, index) => {
        const isLast = processed + index === count - 1;
        const json = '  ' + JSON.stringify(record) + (isLast ? '' : ',') + '\n';
        stream.write(json);
      });
      
      processed += chunkSize;
      const progress = ((processed / count) * 100).toFixed(1);
      process.stdout.write(`\rProgresso: ${progress}% (${processed.toLocaleString()}/${count.toLocaleString()} registros)`);
      
      if (processed < count) {
        // Continuar no próximo tick
        setImmediate(writeChunk);
      } else {
        console.log('\n');
        stream.write(']');
        stream.end();
      }
    }
    
    writeChunk();
  });
}

export async function generateLargeSQL(fields: Field[], count: number, fileName: string, tableName: string = 'data'): Promise<void> {
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(fileName, { encoding: 'utf-8' });
    const headers = fields.map(f => f.name);
    
    stream.on('error', reject);
    stream.on('finish', resolve);
    
    // Escrever cabeçalho SQL
    stream.write(`-- Gerado em ${new Date().toISOString()}\n`);
    stream.write(`-- Total de registros: ${count.toLocaleString()}\n\n`);
    
    let processed = 0;
    
    function writeChunk() {
      const remaining = count - processed;
      const chunkSize = Math.min(CHUNK_SIZE, remaining);
      
      for (let i = 0; i < chunkSize; i++) {
        const record = generateRecord(fields);
        const line = recordToSQLInsert(record, tableName, headers);
        stream.write(line + '\n');
      }
      
      processed += chunkSize;
      const progress = ((processed / count) * 100).toFixed(1);
      process.stdout.write(`\rProgresso: ${progress}% (${processed.toLocaleString()}/${count.toLocaleString()} registros)`);
      
      if (processed < count) {
        // Continuar no próximo tick para não bloquear
        setImmediate(writeChunk);
      } else {
        console.log('\n');
        stream.end();
      }
    }
    
    writeChunk();
  });
}
