import { EventEmitter, Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Persona } from '../persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  personas: Persona[] = [];
  saludar = new EventEmitter<number>();

  constructor(private data: DataService) { }

  personaAgregada(persona: Persona) {
    if(this.personas == null) {
      this.personas = [];
    }
    this.personas.push(persona);
    this.data.guardarPersonas(this.personas);
  }

  encontrarPersona(index: number) {
    let persona: Persona = this.personas[index];
    return persona;
  }

  modificarPersona(index: number, persona: Persona) {
    let persona1 = this.personas[index];
    persona1.nombre = persona.nombre;
    persona1.apellido = persona.apellido;
    this.data.modificarPersona(index, persona);
  }

  eliminarPersona(index: number) {
    this.personas.splice(index, 1);
    this.data.eliminarPersona(index);

    this.modificarPersonas();
  }

  obtenerPersonas() {
    return this.data.cargarPersonas();
  }

  setPersonas(personas: Persona[]) {
    this.personas = personas;
  }

  modificarPersonas() {
    if(this.personas != null) {
      this.data.guardarPersonas(this.personas);
    }
  }
}
