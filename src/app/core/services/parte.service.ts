import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Parte } from '../../core/models/parte.model';

@Injectable({
  providedIn: 'root'
})
export class ParteService {
  private readonly storageKey = 'partes';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private getStorage(): Storage | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage;
    }
    return null;
  }

  getPartes(): Parte[] {
    const storage = this.getStorage();
    if (!storage) return [];
    
    const data = storage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addParte(parte: Parte): void {
    const storage = this.getStorage();
    if (!storage) return;
    
    const partes = this.getPartes();
    partes.push(parte);
    this.save(partes);
  }

  updateParte(parteAtualizada: Parte): void {
    const storage = this.getStorage();
    if (!storage) return;
    
    const partes = this.getPartes().map(p => p.id === parteAtualizada.id ? parteAtualizada : p);
    this.save(partes);
  }

  deleteParte(id: string): void {
    const storage = this.getStorage();
    if (!storage) return;
    
    const partes = this.getPartes().filter(p => p.id !== id);
    this.save(partes);
  }

  private save(partes: Parte[]): void {
    const storage = this.getStorage();
    if (!storage) return;
    
    storage.setItem(this.storageKey, JSON.stringify(partes));
  }
}
