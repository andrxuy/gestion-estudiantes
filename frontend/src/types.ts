export interface EstudianteRequest {
  nombre: string
  apellido: string
  paisNacimiento: string
  ciudadNacimiento: string
  cedula: string
  fechaNacimiento: string
  direccion: string
  telefono: string
}

export interface EstudianteResponse extends EstudianteRequest {
  id: number
}

export interface ErrorResponse {
  status: number
  message: string
  timestamp: string
  fieldErrors?: Record<string, string>
}
