import { Component } from '@angular/core';
import { Persona } from './persona.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Listado de personas';
  nombreInput = '';
  apellidoInput = '';

  personas: Persona[] = [new Persona('José', "Rosas"), new Persona('María','López')];

  agregarPersona() {
    let persona = new Persona(this.nombreInput, this.apellidoInput);
    this.personas.push(persona);
    this.nombreInput = '';
    this.apellidoInput = '';
  }
}
