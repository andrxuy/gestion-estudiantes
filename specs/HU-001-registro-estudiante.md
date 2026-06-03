# SPEC: Sistema de Gestión de Estudiantes — EPN

## Stack
- Backend: Spring Boot 4.0.6, Gradle Groovy, base de datos H2 en memoria
- Frontend: React 18 + Vite + TypeScript, crear con npm create vite
- Diseño visual: ver .opencode/skills/epn-design.md
- Sin Spring Security ni autenticación

## Build
- No reemplazar build.gradle existente
- Solo agregar las dependencias que falten: validation y data-jpa
- La consola H2 se habilita en application.properties

## CORS
- Permitir origen: http://localhost:5173

## Entidad: Estudiante
Campos requeridos: nombre, apellido, paisNacimiento, ciudadNacimiento,
cedula, fechaNacimiento, direccion, telefono

## Validaciones (del frontend y del backend)
- Todos los campos son obligatorios.
  Mensaje: "Este campo es obligatorio"

- cedula: exactamente 10 dígitos, algoritmo módulo 10 ecuatoriano.
  Mensaje formato: "La cédula debe tener 10 dígitos"
  Mensaje inválida: "La cédula ingresada no es válida"
  Cédula de prueba válida: 1713175071

- fechaNacimiento: no puede ser fecha futura.
  Usar react-datepicker con @types/react-datepicker.
  dateFormat: dd/MM/yyyy
  placeholderText: dd/mm/aaaa
  maxDate: fecha actual (bloquear fechas futuras desde el picker)
  Mensaje: "La fecha de nacimiento no puede ser una fecha futura"

- telefono: solo dígitos, mínimo 7 caracteres.
  Mensaje: "Ingrese un número de teléfono válido"

## Endpoint
POST /api/estudiantes
- 201 Created: estudiante registrado correctamente
- 409 Conflict: cédula ya registrada
  Mensaje: "Ya existe un estudiante registrado con ese número de documento"

## Frontend
- Formulario con todos los campos de la entidad
- Al registrar exitosamente: mostrar mensaje de éxito y limpiar el formulario
- Si el servidor responde 409: mostrar mensaje sin limpiar el formulario
- Si no hay conexión: "No se pudo conectar con el servidor. Intente nuevamente."
- Aplicar paleta y estilos definidos en el skill