import React, { useEffect, useState } from 'react'
import { listarEstudiantes } from '../api/estudianteApi'
import type { EstudianteResponse } from '../types'

const EstudianteList: React.FC = () => {
  const [estudiantes, setEstudiantes] = useState<EstudianteResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const cargar = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await listarEstudiantes()
      setEstudiantes(data)
    } catch {
      setError('No se pudo cargar la lista de estudiantes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  return (
    <div style={{
      background: 'var(--epn-blanco)',
      border: '1px solid var(--epn-gris-claro)',
      borderRadius: 'var(--epn-border-radius)',
      padding: '2rem',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.25rem',
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--epn-azul-oscuro)',
        }}>
          Estudiantes Registrados
        </h2>
        <button
          onClick={cargar}
          className="epn-btn epn-btn--primary"
          disabled={loading}
          style={{ padding: '0.375rem 1rem', fontSize: '0.8125rem' }}
        >
          {loading ? 'Cargando...' : 'Actualizar'}
        </button>
      </div>

      {error && (
        <div className="epn-message epn-message--error">{error}</div>
      )}

      {loading ? (
        <p style={{ color: 'var(--epn-gris)', textAlign: 'center', padding: '2rem' }}>
          Cargando estudiantes...
        </p>
      ) : estudiantes.length === 0 ? (
        <p style={{ color: 'var(--epn-gris)', textAlign: 'center', padding: '2rem' }}>
          No hay estudiantes registrados.
        </p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.875rem',
          }}>
            <thead>
              <tr style={{
                background: 'var(--epn-gris-claro)',
                textAlign: 'left',
              }}>
                <th style={thStyle}>Cédula</th>
                <th style={thStyle}>Nombre</th>
                <th style={thStyle}>Apellido</th>
                <th style={thStyle}>País</th>
                <th style={thStyle}>Ciudad</th>
                <th style={thStyle}>Fecha Nac.</th>
                <th style={thStyle}>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((e) => (
                <tr key={e.id} style={{
                  borderBottom: '1px solid #E5E7EB',
                  transition: 'background 0.15s',
                }}
                  onMouseOver={(ev) => (ev.currentTarget.style.background = '#F9FAFB')}
                  onMouseOut={(ev) => (ev.currentTarget.style.background = 'transparent')}
                >
                  <td style={tdStyle}>{e.cedula}</td>
                  <td style={tdStyle}>{e.nombre}</td>
                  <td style={tdStyle}>{e.apellido}</td>
                  <td style={tdStyle}>{e.paisNacimiento}</td>
                  <td style={tdStyle}>{e.ciudadNacimiento}</td>
                  <td style={tdStyle}>{e.fechaNacimiento}</td>
                  <td style={tdStyle}>{e.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const thStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  fontWeight: 600,
  color: 'var(--epn-gris-oscuro)',
  whiteSpace: 'nowrap',
}

const tdStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  color: 'var(--epn-negro)',
  whiteSpace: 'nowrap',
}

export default EstudianteList
