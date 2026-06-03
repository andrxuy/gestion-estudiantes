import axios from 'axios'
import type { EstudianteRequest, EstudianteResponse } from '../types'

const http = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

export async function listarEstudiantes(): Promise<EstudianteResponse[]> {
  const response = await http.get<EstudianteResponse[]>('/estudiantes')
  return response.data
}

export async function registrarEstudiante(
  data: EstudianteRequest
): Promise<EstudianteResponse> {
  const response = await http.post<EstudianteResponse>('/estudiantes', data)
  return response.data
}
