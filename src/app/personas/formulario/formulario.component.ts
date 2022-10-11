import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/persona.model';
import { PersonasService } from 'src/app/service/personas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  /// @Output() personaCreada = new EventEmitter<Persona>();
  indice: number;
  nombreInput = '';
  apellidoInput = '';
  modoEdicion: number;
  //@ViewChild('nombreRef') nombreChild: ElementRef;
  //@ViewChild('apellidoRef') apellidoChild: ElementRef;
  constructor(
    private personaService: PersonasService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.personaService.saludar.subscribe((i) => {
      alert('El índice es: ' + i + 1);
    });
  }

  ngOnInit(): void {
    this.indice = this.route.snapshot.params['id'];
    this.modoEdicion = +this.route.snapshot.queryParams['modoEdicion'];
    if (this.modoEdicion != null && this.modoEdicion === 1) {
      let persona: Persona = this.personaService.encontrarPersona(this.indice);
      this.nombreInput = persona.nombre;
      this.apellidoInput = persona.apellido;
    }
  }

  onGuardarPersona() {
    let persona = new Persona(this.nombreInput, this.apellidoInput);
    // this.personaCreada.emit(persona);
    if (this.modoEdicion != null && this.modoEdicion === 1) {
      this.personaService.modificarPersona(this.indice, persona)
    } else {
      this.nombreInput = '';
      this.apellidoInput = '';
      this.personaService.personaAgregada(persona);

    }
    this.router.navigate(['personas']);
  }

  eliminarPersona() {
    if (this.indice != null) {
      this.personaService.eliminarPersona(this.indice);
    }
    this.router.navigate(['personas']);
  }
}
