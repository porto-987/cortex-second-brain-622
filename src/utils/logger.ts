interface LogLevel {
  ERROR: 'error';
  WARN: 'warn';
  INFO: 'info';
  DEBUG: 'debug';
}

const LOG_LEVELS: LogLevel = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

class Logger {
  private static instance: Logger;
  private enabled: boolean;
  private logLevel: keyof LogLevel;

  constructor() {
    this.enabled = import.meta.env.MODE !== 'production';
    this.logLevel = 'DEBUG';
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  setLogLevel(level: keyof LogLevel): void {
    this.logLevel = level;
  }

  private shouldLog(level: keyof LogLevel): boolean {
    if (!this.enabled) return false;
    
    const levels = ['ERROR', 'WARN', 'INFO', 'DEBUG'];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    
    return messageLevelIndex <= currentLevelIndex;
  }

  error(message: string, ...args: unknown[]): void {
    if (this.shouldLog('ERROR')) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.shouldLog('WARN')) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  info(message: string, ...args: unknown[]): void {
    if (this.shouldLog('INFO')) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.shouldLog('DEBUG')) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  // Performance logging
  time(label: string): void {
    if (this.enabled) {
      console.time(label);
    }
  }

  timeEnd(label: string): void {
    if (this.enabled) {
      console.timeEnd(label);
    }
  }

  // Navigation logging
  navigation(section: string, details?: Record<string, unknown>): void {
    this.debug(`Navigation to section: ${section}`, details);
  }

  // API logging
  api(method: string, url: string, data?: unknown): void {
    this.debug(`API ${method} ${url}`, data);
  }

  // User action logging
  userAction(action: string, details?: Record<string, unknown>): void {
    this.debug(`User action: ${action}`, details);
  }
}

export const logger = Logger.getInstance();

// Legacy console.log replacement for gradual migration
export const log = {
  error: logger.error.bind(logger),
  warn: logger.warn.bind(logger),
  info: logger.info.bind(logger),
  debug: logger.debug.bind(logger),
  time: logger.time.bind(logger),
  timeEnd: logger.timeEnd.bind(logger),
  navigation: logger.navigation.bind(logger),
  api: logger.api.bind(logger),
  userAction: logger.userAction.bind(logger)
};

export default logger;