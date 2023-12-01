import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from './persona.model';
import { Comentario } from './comentario.model'; 

const token = 'cQhyrMw3bpAtqfX5Nv7IFiIzdk7lWhZOK6EFmmDlQLV-2ygPTQCHHywRPvdv_uP2EIh4RQ.';
// Incluir el token en la solicitud HTTP
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
@Injectable({
  providedIn: 'root'
})


export class PersonaService {
  private baseUrl = "http://localhost:8090/api/v1/comment"; // Ajusta la URL según tu configuración

  private baseUrlbard = "http://localhost:8000/comentarios";

  
  constructor(private http: HttpClient) {}

  obtenerPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.baseUrl);
  }

  obtenerPersonaPorId(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.baseUrl}/${id}`);
  }

  agregarPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.baseUrl, persona);
  }

  agregarComentario(comentario: Comentario): Observable<Comentario> {

    return this.http.post<Comentario>(this.baseUrlbard, comentario,{ headers });
  }

  actualizarPersona(id: number, persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.baseUrl}/${id}`, persona);
  }

  eliminarPersona(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
