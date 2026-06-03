import React, { useState } from 'react'
import { registrarEstudiante } from '../api/estudianteApi'
import type { EstudianteRequest } from '../types'
import './EstudianteForm.css'

interface FieldErrors {
  nombre?: string
  apellido?: string
  paisNacimiento?: string
  ciudadNacimiento?: string
  cedula?: string
  fechaNacimiento?: string
  direccion?: string
  telefono?: string
}

interface FormState {
  nombre: string
  apellido: string
  paisNacimiento: string
  ciudadNacimiento: string
  cedula: string
  fechaNacimiento: string
  direccion: string
  telefono: string
}

const initialState: FormState = {
  nombre: '',
  apellido: '',
  paisNacimiento: '',
  ciudadNacimiento: '',
  cedula: '',
  fechaNacimiento: '',
  direccion: '',
  telefono: '',
}

const validarCedulaModulo10 = (cedula: string): boolean => {
  if (!/^\d{10}$/.test(cedula)) return false

  const provincia = parseInt(cedula.substring(0, 2), 10)
  if (provincia < 1 || provincia > 24) return false

  const tercerDigito = parseInt(cedula.substring(2, 3), 10)
  if (tercerDigito > 5) return false

  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2]
  let suma = 0
  for (let i = 0; i < coeficientes.length; i++) {
    let valor = parseInt(cedula.charAt(i), 10) * coeficientes[i]
    suma += valor >= 10 ? valor - 9 : valor
  }

  const digitoVerificador = parseInt(cedula.charAt(9), 10)
  const residuo = suma % 10
  const digitoCalculado = residuo === 0 ? 0 : 10 - residuo
  return digitoCalculado === digitoVerificador
}

const EstudianteForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setFieldErrors(prev => ({ ...prev, [name]: '' }))
    setSuccessMessage('')
    setErrorMessage('')
  }

  const validate = (): boolean => {
    const errors: FieldErrors = {}

    if (!form.nombre.trim()) errors.nombre = 'Este campo es obligatorio'
    if (!form.apellido.trim()) errors.apellido = 'Este campo es obligatorio'
    if (!form.paisNacimiento.trim()) errors.paisNacimiento = 'Este campo es obligatorio'
    if (!form.ciudadNacimiento.trim()) errors.ciudadNacimiento = 'Este campo es obligatorio'
    if (!form.direccion.trim()) errors.direccion = 'Este campo es obligatorio'

    if (!form.cedula.trim()) {
      errors.cedula = 'Este campo es obligatorio'
    } else if (!/^\d{10}$/.test(form.cedula)) {
      errors.cedula = 'La cédula debe tener 10 dígitos'
    } else if (!validarCedulaModulo10(form.cedula)) {
      errors.cedula = 'La cédula ingresada no es válida'
    }

    if (!form.fechaNacimiento) {
      errors.fechaNacimiento = 'Este campo es obligatorio'
    } else {
      const fecha = new Date(form.fechaNacimiento)
      const hoy = new Date()
      hoy.setHours(0, 0, 0, 0)
      if (fecha > hoy) {
        errors.fechaNacimiento = 'La fecha de nacimiento no puede ser una fecha futura'
      }
    }

    if (!form.telefono.trim()) {
      errors.telefono = 'Este campo es obligatorio'
    } else if (!/^\d+$/.test(form.telefono) || form.telefono.length < 7) {
      errors.telefono = 'Ingrese un número de teléfono válido'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')

    if (!validate()) return

    setSubmitting(true)
    try {
      const data: EstudianteRequest = {
        nombre: form.nombre.trim(),
        apellido: form.apellido.trim(),
        paisNacimiento: form.paisNacimiento.trim(),
        ciudadNacimiento: form.ciudadNacimiento.trim(),
        cedula: form.cedula.trim(),
        fechaNacimiento: form.fechaNacimiento,
        direccion: form.direccion.trim(),
        telefono: form.telefono.trim(),
      }
      await registrarEstudiante(data)
      setSuccessMessage('Estudiante registrado correctamente')
      setForm(initialState)
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { status?: number; data?: { message?: string } } }
        if (axiosErr.response?.status === 409) {
          setErrorMessage(
            axiosErr.response.data?.message ||
            'Ya existe un estudiante registrado con ese número de documento'
          )
        } else if (axiosErr.response?.data?.message) {
          setErrorMessage(axiosErr.response.data.message)
        } else {
          setErrorMessage('No se pudo conectar con el servidor. Intente nuevamente.')
        }
      } else {
        setErrorMessage('No se pudo conectar con el servidor. Intente nuevamente.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = (field: keyof FieldErrors) =>
    `epn-input${fieldErrors[field] ? ' epn-input--error' : ''}`

  return (
    <form className="epn-form" onSubmit={handleSubmit} noValidate>
      {successMessage && (
        <div className="epn-message epn-message--success">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="epn-message epn-message--error">{errorMessage}</div>
      )}

      <div className="epn-grid">
        <div className="epn-form__group">
          <label className="epn-form__label" htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            className={inputClass('nombre')}
            value={form.nombre}
            onChange={handleChange}
          />
          {fieldErrors.nombre && <span className="epn-form__error">{fieldErrors.nombre}</span>}
        </div>

        <div className="epn-form__group">
          <label className="epn-form__label" htmlFor="apellido">Apellido</label>
          <input
            id="apellido"
            name="apellido"
            className={inputClass('apellido')}
            value={form.apellido}
            onChange={handleChange}
          />
          {fieldErrors.apellido && <span className="epn-form__error">{fieldErrors.apellido}</span>}
        </div>

        <div className="epn-form__group">
          <label className="epn-form__label" htmlFor="paisNacimiento">País de Nacimiento</label>
          <input
            id="paisNacimiento"
            name="paisNacimiento"
            className={inputClass('paisNacimiento')}
            value={form.paisNacimiento}
            onChange={handleChange}
          />
          {fieldErrors.paisNacimiento && <span className="epn-form__error">{fieldErrors.paisNacimiento}</span>}
        </div>

        <div className="epn-form__group">
          <label className="epn-form__label" htmlFor="ciudadNacimiento">Ciudad de Nacimiento</label>
          <input
            id="ciudadNacimiento"
            name="ciudadNacimiento"
            className={inputClass('ciudadNacimiento')}
            value={form.ciudadNacimiento}
            onChange={handleChange}
          />
          {fieldErrors.ciudadNacimiento && <span className="epn-form__error">{fieldErrors.ciudadNacimiento}</span>}
        </div>

        <div className="epn-form__group">
          <label className="epn-form__label" htmlFor="cedula">Cédula</label>
          <input
            id="cedula"
            name="cedula"
            className={inputClass('cedula')}
            value={form.cedula}
            onChange={handleChange}
            maxLength={10}
          />
          {fieldErrors.cedula && <span className="epn-form__error">{fieldErrors.cedula}</span>}
        </div>

        <div className="epn-form__group">
          <label className="epn-form__label" htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
          <input
            id="fechaNacimiento"
            name="fechaNacimiento"
            type="date"
            className={inputClass('fechaNacimiento')}
            value={form.fechaNacimiento}
            onChange={handleChange}
          />
          {fieldErrors.fechaNacimiento && <span className="epn-form__error">{fieldErrors.fechaNacimiento}</span>}
        </div>

        <div className="epn-form__group">
          <label className="epn-form__label" htmlFor="direccion">Dirección</label>
          <input
            id="direccion"
            name="direccion"
            className={inputClass('direccion')}
            value={form.direccion}
            onChange={handleChange}
          />
          {fieldErrors.direccion && <span className="epn-form__error">{fieldErrors.direccion}</span>}
        </div>

        <div className="epn-form__group">
          <label className="epn-form__label" htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            name="telefono"
            className={inputClass('telefono')}
            value={form.telefono}
            onChange={handleChange}
          />
          {fieldErrors.telefono && <span className="epn-form__error">{fieldErrors.telefono}</span>}
        </div>
      </div>

      <button
        type="submit"
        className="epn-btn epn-btn--primary"
        disabled={submitting}
        style={{ marginTop: '1rem' }}
      >
        {submitting ? 'Registrando...' : 'Registrar Estudiante'}
      </button>
    </form>
  )
}

export default EstudianteForm
