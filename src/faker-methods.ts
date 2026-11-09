import { faker } from '@faker-js/faker';

export const fakerMethods: Record<string, () => any> = {
  // Person
  firstName: () => faker.person.firstName(),
  lastName: () => faker.person.lastName(),
  fullName: () => faker.person.fullName(),
  middleName: () => faker.person.middleName(),
  prefix: () => faker.person.prefix(),
  suffix: () => faker.person.suffix(),
  jobTitle: () => faker.person.jobTitle(),
  jobArea: () => faker.person.jobArea(),
  jobType: () => faker.person.jobType(),
  gender: () => faker.person.gender(),
  bio: () => faker.person.bio(),
  
  // Internet
  email: () => faker.internet.email(),
  userName: () => faker.internet.username(),
  password: () => faker.internet.password(),
  url: () => faker.internet.url(),
  domainName: () => faker.internet.domainName(),
  ipv4: () => faker.internet.ipv4(),
  ipv6: () => faker.internet.ipv6(),
  port: () => faker.internet.port(),
  protocol: () => faker.internet.protocol(),
  userAgent: () => faker.internet.userAgent(),
  mac: () => faker.internet.mac(),
  
  // Phone
  phone: () => faker.phone.number(),
  imei: () => faker.phone.imei(),
  
  // Location/Address
  address: () => faker.location.streetAddress(),
  street: () => faker.location.street(),
  city: () => faker.location.city(),
  state: () => faker.location.state(),
  country: () => faker.location.country(),
  countryCode: () => faker.location.countryCode(),
  zipCode: () => faker.location.zipCode(),
  latitude: () => faker.location.latitude(),
  longitude: () => faker.location.longitude(),
  timeZone: () => faker.location.timeZone(),
  
  // Company
  company: () => faker.company.name(),
  companyBS: () => faker.company.buzzPhrase(),
  catchPhrase: () => faker.company.catchPhrase(),
  
  // Finance
  creditCard: () => faker.finance.creditCardNumber(),
  iban: () => faker.finance.iban(),
  bic: () => faker.finance.bic(),
  amount: () => faker.finance.amount(),
  accountName: () => faker.finance.accountName(),
  bitcoinAddress: () => faker.finance.bitcoinAddress(),
  currencyCode: () => faker.finance.currencyCode(),
  currencyName: () => faker.finance.currencyName(),
  
  // Commerce
  product: () => faker.commerce.productName(),
  productDescription: () => faker.commerce.productDescription(),
  price: () => faker.commerce.price(),
  department: () => faker.commerce.department(),
  
  // Date
  date: () => faker.date.past().toISOString(),
  futureDate: () => faker.date.future().toISOString(),
  recentDate: () => faker.date.recent().toISOString(),
  birthDate: () => faker.date.birthdate().toISOString(),
  weekday: () => faker.date.weekday(),
  month: () => faker.date.month(),
  
  // Numbers
  number: () => faker.number.int({ min: 1, max: 1000 }),
  float: () => faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }),
  bigInt: () => faker.number.bigInt().toString(),
  
  // Text
  sentence: () => faker.lorem.sentence(),
  paragraph: () => faker.lorem.paragraph(),
  word: () => faker.lorem.word(),
  words: () => faker.lorem.words(),
  slug: () => faker.lorem.slug(),
  
  // Vehicle
  vehicle: () => faker.vehicle.vehicle(),
  manufacturer: () => faker.vehicle.manufacturer(),
  model: () => faker.vehicle.model(),
  type: () => faker.vehicle.type(),
  fuel: () => faker.vehicle.fuel(),
  vin: () => faker.vehicle.vin(),
  vrm: () => faker.vehicle.vrm(),
  
  // Animal
  animal: () => faker.animal.type(),
  dog: () => faker.animal.dog(),
  cat: () => faker.animal.cat(),
  bird: () => faker.animal.bird(),
  fish: () => faker.animal.fish(),
  
  // Database
  dbColumn: () => faker.database.column(),
  dbType: () => faker.database.type(),
  dbEngine: () => faker.database.engine(),
  
  // System
  fileName: () => faker.system.fileName(),
  fileExt: () => faker.system.fileExt(),
  mimeType: () => faker.system.mimeType(),
  filePath: () => faker.system.filePath(),
  directoryPath: () => faker.system.directoryPath(),
  
  // Git
  gitBranch: () => faker.git.branch(),
  gitCommitMessage: () => faker.git.commitMessage(),
  gitSha: () => faker.git.commitSha(),
  
  // Music
  musicGenre: () => faker.music.genre(),
  songName: () => faker.music.songName(),
  
  // Airline
  airline: () => faker.airline.airline().name,
  airplane: () => faker.airline.airplane().name,
  airport: () => faker.airline.airport().name,
  flightNumber: () => faker.airline.flightNumber(),
  
  // Book
  bookTitle: () => faker.book.title(),
  bookAuthor: () => faker.book.author(),
  bookGenre: () => faker.book.genre(),
  bookPublisher: () => faker.book.publisher(),
  
  // Science
  chemicalElement: () => faker.science.chemicalElement().name,
  unit: () => faker.science.unit().name,
  
  // Others
  uuid: () => faker.string.uuid(),
  boolean: () => faker.datatype.boolean(),
  color: () => faker.color.human(),
  hexColor: () => faker.color.rgb(),
  image: () => faker.image.url(),
  emoji: () => faker.internet.emoji(),
};

export const fakerCategories = {
  'Pessoa': ['firstName', 'lastName', 'fullName', 'middleName', 'prefix', 'suffix', 'jobTitle', 'jobArea', 'jobType', 'gender', 'bio'],
  'Internet': ['email', 'userName', 'password', 'url', 'domainName', 'ipv4', 'ipv6', 'port', 'protocol', 'userAgent', 'mac'],
  'Telefone': ['phone', 'imei'],
  'Localização': ['address', 'street', 'city', 'state', 'country', 'countryCode', 'zipCode', 'latitude', 'longitude', 'timeZone'],
  'Empresa': ['company', 'companyBS', 'catchPhrase'],
  'Finanças': ['creditCard', 'iban', 'bic', 'amount', 'accountName', 'bitcoinAddress', 'currencyCode', 'currencyName'],
  'Comércio': ['product', 'productDescription', 'price', 'department'],
  'Data': ['date', 'futureDate', 'recentDate', 'birthDate', 'weekday', 'month'],
  'Números': ['number', 'float', 'bigInt'],
  'Texto': ['sentence', 'paragraph', 'word', 'words', 'slug'],
  'Veículo': ['vehicle', 'manufacturer', 'model', 'type', 'fuel', 'vin', 'vrm'],
  'Animal': ['animal', 'dog', 'cat', 'bird', 'fish'],
  'Database': ['dbColumn', 'dbType', 'dbEngine'],
  'Sistema': ['fileName', 'fileExt', 'mimeType', 'filePath', 'directoryPath'],
  'Git': ['gitBranch', 'gitCommitMessage', 'gitSha'],
  'Música': ['musicGenre', 'songName'],
  'Aviação': ['airline', 'airplane', 'airport', 'flightNumber'],
  'Livro': ['bookTitle', 'bookAuthor', 'bookGenre', 'bookPublisher'],
  'Ciência': ['chemicalElement', 'unit'],
  'Outros': ['uuid', 'boolean', 'color', 'hexColor', 'image', 'emoji']
};
