# Data Faker CLI

CLI para gerar dados fictícios com [Faker.js](https://fakerjs.dev/) em CSV, JSON ou SQL.

## Instalação

Requer Node.js `^20.19.0`, `^22.13.0`, `^23.5.0` ou `>=24.0.0` e npm 10 ou superior.

```bash
npm install -g data-faker-cli
```

Também é possível executar sem instalação global:

```bash
npx data-faker-cli list-types
```

## Uso

```bash
data-faker generate \
  --fields "nome:fullName,email:email,telefone:phone" \
  --lines 100 \
  --format csv \
  --output pessoas.csv
```

| Opção | Descrição |
| --- | --- |
| `-f, --fields <fields>` | Campos no formato `nome:tipo`, separados por vírgulas. Obrigatório. |
| `-l, --lines <number>` | Quantidade de registros. Obrigatório. |
| `-t, --format <format>` | `json`, `csv` ou `sql`; padrão: `json`. |
| `-o, --output <file>` | Caminho de saída; padrão: `data.json`, `data.csv` ou `data.sql`. |
| `--table <name>` | Nome da tabela para SQL; padrão: `data`. |

Consulte os tipos disponíveis com:

```bash
data-faker list-types
```

Exemplo de SQL:

```bash
data-faker generate -f "id:uuid,nome:fullName" -l 10 -t sql --table pessoas -o pessoas.sql
```

Acima de 50 mil registros, a CLI escreve a saída em lotes. Os dados gerados são fictícios; confira a saída antes de usá-la em outros sistemas.

## Desenvolvimento

É necessário [Bun](https://bun.sh/) para instalar dependências, executar testes e gerar o pacote executável para Node.js:

```bash
bun install
bun test
bun run build
node dist/index.js list-types
```

O código-fonte também pode ser executado com `bun run index.ts`.

## Licença

MIT.
