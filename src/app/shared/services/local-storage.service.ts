import { Injectable } from '@angular/core';

export interface StorageOptions {
  ttl?: number;
}

export interface StorageEntry<T> {
  data: T;
  timestamp: number;
  ttl?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly prefix = 'ksda_';

  set<T>(key: string, data: T, options?: StorageOptions): void {
    const entry: StorageEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: options?.ttl
    };

    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(entry));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (!item) return null;

      const entry: StorageEntry<T> = JSON.parse(item);

      if (entry.ttl) {
        const now = Date.now();
        if ((now - entry.timestamp) > entry.ttl) {
          this.remove(key);
          return null;
        }
      }

      return entry.data;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  remove(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }

  removePattern(pattern: string | RegExp): void {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;

    Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .filter(key => regex.test(key.substring(this.prefix.length)))
      .forEach(key => localStorage.removeItem(key));
  }

  clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .forEach(key => localStorage.removeItem(key));
  }

  has(key: string): boolean {
    const data = this.get(key);
    return data !== null;
  }

  keys(): string[] {
    return Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .map(key => key.substring(this.prefix.length));
  }
}
