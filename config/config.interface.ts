// ────────────────────────────────────────────────────────────── ALL CONFIGS ─────
export interface IConfig {
  mode: string
  application: IApplicationConfig
  job: IJobsConfig
  logger: ILoggerConfig
  database: IDatabaseConfig
  cors: ICorsConfig
  upload: IUploadConfig
}

// ────────────────────────────────────────────────────────────── APPLICATION ─────
export interface IApplicationConfig {
  routerVersion: string
  bearer: string
  bearerHeader: string
  apiKeyHeader: string
  port: number
  information: boolean
  api_version: string
  front_version: string
  portal_version: string
  monitoring: IMonitoringConfig
  request: IRecuestConfig
}

export interface IJobsConfig {
  activeCronJobs: string[]
  activeConsumers: string[]
}

export interface ILoggerConfig {
  logOnConsole: boolean
  logOnFile: boolean
  logOnDatabase: boolean
  winston: {
    dirname: string
    datePattern: string
    extension: string
    zippedArchive: boolean
    maxSize: string
    maxFiles: string
  }
}

export interface IMonitoringConfig {
  monitoring: {
    treblle: ITreblleConfig
  }
}

export interface IRecuestConfig {
  allowMethods: string[]
  ignoreCheckMethods: string[]
  ignoreApiKey: string[]
  ignoreToken: string[]
}

export interface ITreblleConfig {
  apiKey: string
  projectId: string
}

// ──────────────────────────────────────────────────────────────── DATABASES ─────
export interface IDatabaseConfig {
  mongodb: IMongodbConfig
  postgres: IPostgresConfig
  redis: IRedisConfig
  ioRedis: IRedisIoConfig
}

// ─── MONGODB ────────────────────────────────────────────────────────────────────
export interface IMongodbConfig {
  name: string
  default_collection: string
  uri: string
}

// ─── POSTGRESQL ─────────────────────────────────────────────────────────────────
export interface IPostgresConfig {
  user: string
  host: string
  database: string
  password: string
  port: number
  idleTimeoutMillis: number
  connectionTimeoutMillis: number
  ssl: {
    rejectUnauthorized: boolean
  }
}

// ─── REDIS ──────────────────────────────────────────────────────────────────────
export interface IRedisConfig {
  uri: string
}

// ─── IO REDIS ───────────────────────────────────────────────────────────────────
export interface IRedisIoConfig {
  host: string
  port: number
  showFriendlyErrorStack: boolean
  enableReadyCheck: boolean
  maxRetriesPerRequest: number | null | undefined
}

// ───────────────────────────────────────────────────────────────────── CORS ─────
export interface ICorsConfig {
  allow_origin: string
  allow_method: string[]
}

// ───────────────────────────────────────────────────────────── RATE LIMITER ─────
export interface IRateLimiter {
  windowMs: number
  max: number
  standardHeaders: boolean
  legacyHeaders: boolean
}

// ─────────────────────────────────────────────── Upload Multipart Form Data ─────
export interface IUploadConfig {
  uploadDir: string
  validUploadFolders: string[]
  responsePath: string
  keepExtensions: boolean
  multiples: boolean
  minFileSize: number
  maxFiles: number
  maxFileSize: number
  maxTotalFileSize: number
  maxFields: number
  maxFieldsSize: number
}
