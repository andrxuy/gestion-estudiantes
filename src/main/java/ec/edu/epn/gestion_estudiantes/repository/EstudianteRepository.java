package ec.edu.epn.gestion_estudiantes.repository;

import ec.edu.epn.gestion_estudiantes.model.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {
    Optional<Estudiante> findByCedula(String cedula);
    boolean existsByCedula(String cedula);
}
