import { Component, OnInit } from '@angular/core';
import { Persona } from '../../persona.model';
import { Comentario } from '../../comentario.model';
import { PersonaService } from '../../persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  miVariable: string = "";
  personas: Persona[] = [];
  nuevaPersona: Persona = { nombre: '', edad: 0 };
  nuevoComentario: Comentario = { texto: '', estado: false };
  personaSeleccionada: Persona | null = null;
  currentDate: Date = new Date();  //para la hora y fecha
  
  
  constructor(private personaService: PersonaService) {
  
  }

  ngOnInit(): void {
    this.obtenerPersonas();
  }

  obtenerPersonas(): void {
    this.personaService.obtenerPersonas().subscribe(data => {
      this.personas = data;
    });
  }

  seleccionarPersona(persona: Persona): void {
    this.personaSeleccionada = { ...persona };
  }

  agregarPersona(): void {
    this.personaService.agregarPersona(this.nuevaPersona).subscribe((res) => {

      this.obtenerPersonas();
      this.nuevaPersona = { nombre: '', edad: 0 };
    });
  }
  
  agregarComentario1(): void {
    this.personaService.agregarComentario(this.nuevoComentario).subscribe((res) => {
      console.log("la respuesta del servidor es "+res.texto)
      
      if(res.estado){  //si es true no debera mostrar ni guardar el mensaje
        alert(res.texto);  //no guardamos nada y limpiamos los campos de entrada 
   
      }else{
        alert("Tu comentario se almaceno con exito"); // debemos almacenar los comentarios y a la persona y despues limpiar los ampos de entrada

      this.nuevaPersona.nombre=res.texto;
      this.nuevaPersona.edad=this.nuevaPersona.edad;
      this.agregarPersona();  //llamo al metodo para guardar los campos a la base de datos
      
      let currentDate = new Date();
      alert(currentDate);  
      console.log(currentDate);
      this.miVariable=res.texto;
      }

      this.nuevaPersona = { nombre: '', edad: 0 }; //esto limpia las entradas del html 
      this.nuevoComentario = { texto: '', estado: false }; //esto limpia las entradas del html 
    });
  }

  actualizarPersona(): void {
    if (this.personaSeleccionada) {
      this.personaService.actualizarPersona(
        this.personaSeleccionada.id!,
        this.personaSeleccionada
      ).subscribe(() => {
        this.obtenerPersonas();
        this.personaSeleccionada = null;
      });
    }
  }

  eliminarPersona(id: number): void {
    this.personaService.eliminarPersona(id).subscribe(() => {
      this.obtenerPersonas();
      this.personaSeleccionada = null;
    });
  }
}
