import { Command } from 'commander';
import { writeFile } from 'fs/promises';
import { parseFields, generateData } from './generators';
import { recordsToJSON, recordsToCSV, recordsToSQL } from './formatters';
import { generateLargeJSON, generateLargeCSV, generateLargeSQL } from './streaming';
import { fakerCategories } from './faker-methods';
import type { OutputFormat } from './types';

export function createCLI() {
  const program = new Command();

  program
    .name('data-faker')
    .description('CLI para gerar dados fake em JSON, CSV ou SQL')
    .version('1.0.0');

  program
    .command('generate')
    .description('Gera dados fake baseado nos campos especificados')
    .requiredOption('-f, --fields <fields>', 'Campos e tipos separados por vírgula (ex: name:firstName,email:email,age:number)')
    .requiredOption('-l, --lines <number>', 'Número de linhas a serem geradas', parseInt)
    .option('-t, --format <format>', 'Formato de saída: json, csv ou sql', 'json')
    .option('-o, --output <file>', 'Arquivo de saída')
    .option('--table <name>', 'Nome da tabela (apenas para formato SQL)', 'data')
    .action(async (options) => {
      try {
        const fields = parseFields(options.fields);
        const count = options.lines;
        const format = options.format.toLowerCase() as OutputFormat;
        
        if (!['json', 'csv', 'sql'].includes(format)) {
          console.error('Formato inválido. Use "json", "csv" ou "sql".');
          process.exit(1);
        }
        
        const defaultFileName = format === 'json' ? 'data.json' : format === 'csv' ? 'data.csv' : 'data.sql';
        const fileName = options.output || defaultFileName;
        
        console.log(`Gerando ${count.toLocaleString()} linhas de dados...`);
        console.log(`Formato: ${format.toUpperCase()}`);
        console.log(`Arquivo: ${fileName}`);
        
        const startTime = Date.now();
        
        // Usar streaming para grandes volumes (> 50k registros)
        if (count > 50000) {
          console.log(`Modo: Streaming (otimizado para grandes volumes)\n`);
          
          if (format === 'json') {
            await generateLargeJSON(fields, count, fileName);
          } else if (format === 'csv') {
            await generateLargeCSV(fields, count, fileName);
          } else {
            await generateLargeSQL(fields, count, fileName, options.table);
          }
        } else {
          // Modo rápido para pequenos volumes
          console.log(`Modo: Memória (rápido)\n`);
          const data = generateData(fields, count);
          
          let output: string;
          if (format === 'json') {
            output = recordsToJSON(data);
          } else if (format === 'csv') {
            const headers = fields.map(f => f.name);
            output = recordsToCSV(data, headers);
          } else {
            const headers = fields.map(f => f.name);
            output = recordsToSQL(data, options.table, headers);
          }
          
          await writeFile(fileName, output, 'utf-8');
          console.log(`Progresso: 100.0% (${count.toLocaleString()}/${count.toLocaleString()} registros)\n`);
        }
        
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        const recordsPerSec = (count / parseFloat(duration)).toFixed(0);
        
        console.log(`✓ Dados gerados com sucesso!`);
        console.log(`✓ Arquivo salvo: ${fileName}`);
        console.log(`✓ Total de registros: ${count.toLocaleString()}`);
        console.log(`✓ Tempo decorrido: ${duration}s`);
        console.log(`✓ Velocidade: ${parseInt(recordsPerSec).toLocaleString()} registros/s`);
      } catch (error) {
        console.error('Erro:', error instanceof Error ? error.message : error);
        process.exit(1);
      }
    });

  program
    .command('list-types')
    .description('Lista todos os tipos disponíveis do Faker')
    .action(() => {
      console.log('\nTipos disponíveis do Faker:\n');
      
      for (const [category, types] of Object.entries(fakerCategories)) {
        console.log(`${category}:`);
        types.forEach(type => console.log(`  - ${type}`));
        console.log('');
      }
    });

  return program;
}
