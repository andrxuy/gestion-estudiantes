package ec.edu.epn.gestion_estudiantes.config;

import ec.edu.epn.gestion_estudiantes.model.Estudiante;
import ec.edu.epn.gestion_estudiantes.repository.EstudianteRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private final EstudianteRepository repository;

    public DataInitializer(EstudianteRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) return;

        Estudiante e1 = new Estudiante();
        e1.setNombre("Juan");
        e1.setApellido("Perez");
        e1.setPaisNacimiento("Ecuador");
        e1.setCiudadNacimiento("Quito");
        e1.setCedula("1710034065");
        e1.setFechaNacimiento(LocalDate.of(1995, 3, 15));
        e1.setDireccion("Av. Amazonas y Naciones Unidas");
        e1.setTelefono("0999123456");
        repository.save(e1);

        Estudiante e2 = new Estudiante();
        e2.setNombre("Maria");
        e2.setApellido("Garcia");
        e2.setPaisNacimiento("Ecuador");
        e2.setCiudadNacimiento("Guayaquil");
        e2.setCedula("0912345678");
        e2.setFechaNacimiento(LocalDate.of(1998, 7, 22));
        e2.setDireccion("Av. 9 de Octubre y Malecon");
        e2.setTelefono("0999234567");
        repository.save(e2);
    }
}
