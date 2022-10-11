import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';
import { Persona } from './persona.model';

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient,  private loginService: LoginService) {}

  guardarPersonas(personas: Persona[]) {
    const token = this.loginService.getIdToken();

    this.httpClient
      .put(
        'https://listado-personas-feb44-default-rtdb.firebaseio.com/datos.json?auth=' + token,
        personas
      )
      .subscribe(
        (response) => {
          console.log('resultado de guardar personas ' + response);
        },
        (error) => {
          console.log('Error al guardar personas: ' + error);
        }
      );
  }

  cargarPersonas(): Observable<any> {
    const token = this.loginService.getIdToken();
    return this.httpClient.get(
      'https://listado-personas-feb44-default-rtdb.firebaseio.com/datos.json?auth=' + token
    );
  }

  modificarPersona(index: number, persona: Persona) {
    const token = this.loginService.getIdToken();
    let url: string;
    url =
      'https://listado-personas-feb44-default-rtdb.firebaseio.com/datos/' +
      index +
      '.json?auth=' + token;
    this.httpClient.put(url, persona).subscribe(
      (response) => {
        console.log('resultado modificar Persona: ' + response);
      },
      (error) => {
        console.log('Error en modificar Persona: ' + error);
      }
    );
  }

  eliminarPersona(index: number) {
    const token = this.loginService.getIdToken();
    let url: string;
    url =
      'https://listado-personas-feb44-default-rtdb.firebaseio.com/datos/' +
      index +
      '.json?auth=' + token;
    this.httpClient.delete(url).subscribe(
      (response) => {
        console.log('resultado eliminar Persona: ' + response);
      },
      (error) => {
        console.log('Error en eliminar Persona: ' + error);
      }
    );
  }
}
