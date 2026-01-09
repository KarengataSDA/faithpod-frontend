import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private currentLogLevel: LogLevel = environment.production ? LogLevel.ERROR : LogLevel.DEBUG;

  debug(message: string, ...args: any[]): void {
    this.log(LogLevel.DEBUG, message, args);
  }

  info(message: string, ...args: any[]): void {
    this.log(LogLevel.INFO, message, args);
  }

  warn(message: string, ...args: any[]): void {
    this.log(LogLevel.WARN, message, args);
  }

  error(message: string, error?: any): void {
    this.log(LogLevel.ERROR, message, error ? [error] : []);
  }

  private log(level: LogLevel, message: string, args: any[]): void {
    if (level < this.currentLogLevel) {
      return;
    }

    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${LogLevel[level]}: ${message}`;

    switch (level) {
      case LogLevel.DEBUG:
      case LogLevel.INFO:
        if (!environment.production) {
          console.log(logMessage, ...args);
        }
        break;
      case LogLevel.WARN:
        if (!environment.production) {
          console.warn(logMessage, ...args);
        }
        break;
      case LogLevel.ERROR:
        console.error(logMessage, ...args);
        // In production, you could send errors to a monitoring service here
        break;
    }
  }
}
