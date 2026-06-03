package ec.edu.epn.gestion_estudiantes.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class EstudianteRequest {

    @NotBlank(message = "Este campo es obligatorio")
    @Size(max = 100)
    private String nombre;

    @NotBlank(message = "Este campo es obligatorio")
    @Size(max = 100)
    private String apellido;

    @NotBlank(message = "Este campo es obligatorio")
    @Size(max = 100)
    private String paisNacimiento;

    @NotBlank(message = "Este campo es obligatorio")
    @Size(max = 100)
    private String ciudadNacimiento;

    @NotBlank(message = "Este campo es obligatorio")
    @Size(min = 10, max = 10, message = "La cédula debe tener 10 dígitos")
    @Pattern(regexp = "\\d{10}", message = "La cédula debe tener 10 dígitos")
    private String cedula;

    @NotNull(message = "Este campo es obligatorio")
    private LocalDate fechaNacimiento;

    @NotBlank(message = "Este campo es obligatorio")
    @Size(max = 255)
    private String direccion;

    @NotBlank(message = "Este campo es obligatorio")
    @Size(min = 7, message = "Ingrese un número de teléfono válido")
    @Pattern(regexp = "\\d+", message = "Ingrese un número de teléfono válido")
    private String telefono;

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }

    public String getPaisNacimiento() { return paisNacimiento; }
    public void setPaisNacimiento(String paisNacimiento) { this.paisNacimiento = paisNacimiento; }

    public String getCiudadNacimiento() { return ciudadNacimiento; }
    public void setCiudadNacimiento(String ciudadNacimiento) { this.ciudadNacimiento = ciudadNacimiento; }

    public String getCedula() { return cedula; }
    public void setCedula(String cedula) { this.cedula = cedula; }

    public LocalDate getFechaNacimiento() { return fechaNacimiento; }
    public void setFechaNacimiento(LocalDate fechaNacimiento) { this.fechaNacimiento = fechaNacimiento; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
}
