import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public set(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  public get(key: string, defaultVal: any = undefined): string {
    return localStorage.getItem(key) ?? JSON.stringify(defaultVal);
  }

  public del(key: string): void {
    localStorage.removeItem(key);
  }

  public has(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  public keys(): string[] {
    return Object.keys(localStorage);
  }

  public list(): Map<string, any> {
    const map = new Map<string, any>();
    this.keys().forEach((key) => {
      map.set(key, this.get(key));
    });
    return map;
  }
}
