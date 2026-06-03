package ec.edu.epn.gestion_estudiantes.service;

import ec.edu.epn.gestion_estudiantes.dto.EstudianteRequest;
import ec.edu.epn.gestion_estudiantes.dto.EstudianteResponse;
import ec.edu.epn.gestion_estudiantes.exception.CedulaDuplicadaException;
import ec.edu.epn.gestion_estudiantes.model.Estudiante;
import ec.edu.epn.gestion_estudiantes.repository.EstudianteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EstudianteService {

    private final EstudianteRepository repository;

    public EstudianteService(EstudianteRepository repository) {
        this.repository = repository;
    }

    public List<EstudianteResponse> findAll() {
        return repository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public EstudianteResponse registrar(EstudianteRequest request) {
        validarCedula(request.getCedula());
        validarFechaNacimiento(request.getFechaNacimiento());

        if (repository.existsByCedula(request.getCedula())) {
            throw new CedulaDuplicadaException("Ya existe un estudiante registrado con ese n\u00famero de documento");
        }

        Estudiante estudiante = new Estudiante();
        estudiante.setNombre(request.getNombre().trim());
        estudiante.setApellido(request.getApellido().trim());
        estudiante.setPaisNacimiento(request.getPaisNacimiento().trim());
        estudiante.setCiudadNacimiento(request.getCiudadNacimiento().trim());
        estudiante.setCedula(request.getCedula().trim());
        estudiante.setFechaNacimiento(request.getFechaNacimiento());
        estudiante.setDireccion(request.getDireccion().trim());
        estudiante.setTelefono(request.getTelefono().trim());

        Estudiante guardado = repository.save(estudiante);
        return toResponse(guardado);
    }

    private void validarCedula(String cedula) {
        if (cedula == null || cedula.length() != 10 || !cedula.matches("\\d{10}")) {
            throw new IllegalArgumentException("La c\u00e9dula debe tener 10 d\u00edgitos");
        }

        int provincia = Integer.parseInt(cedula.substring(0, 2));
        if (provincia < 1 || provincia > 24) {
            throw new IllegalArgumentException("La c\u00e9dula ingresada no es v\u00e1lida");
        }

        int tercerDigito = Integer.parseInt(cedula.substring(2, 3));
        if (tercerDigito > 5) {
            throw new IllegalArgumentException("La c\u00e9dula ingresada no es v\u00e1lida");
        }

        int[] coeficientes = {2, 1, 2, 1, 2, 1, 2, 1, 2};
        int suma = 0;

        for (int i = 0; i < coeficientes.length; i++) {
            int valor = Integer.parseInt(String.valueOf(cedula.charAt(i))) * coeficientes[i];
            suma += (valor >= 10) ? valor - 9 : valor;
        }

        int digitoVerificador = Integer.parseInt(String.valueOf(cedula.charAt(9)));
        int residuo = suma % 10;
        int digitoCalculado = (residuo == 0) ? 0 : 10 - residuo;

        if (digitoCalculado != digitoVerificador) {
            throw new IllegalArgumentException("La c\u00e9dula ingresada no es v\u00e1lida");
        }
    }

    private void validarFechaNacimiento(LocalDate fecha) {
        if (fecha != null && fecha.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("La fecha de nacimiento no puede ser una fecha futura");
        }
    }

    private EstudianteResponse toResponse(Estudiante e) {
        EstudianteResponse r = new EstudianteResponse();
        r.setId(e.getId());
        r.setNombre(e.getNombre());
        r.setApellido(e.getApellido());
        r.setPaisNacimiento(e.getPaisNacimiento());
        r.setCiudadNacimiento(e.getCiudadNacimiento());
        r.setCedula(e.getCedula());
        r.setFechaNacimiento(e.getFechaNacimiento());
        r.setDireccion(e.getDireccion());
        r.setTelefono(e.getTelefono());
        return r;
    }
}
