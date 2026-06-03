package ec.edu.epn.gestion_estudiantes.controller;

import ec.edu.epn.gestion_estudiantes.dto.EstudianteRequest;
import ec.edu.epn.gestion_estudiantes.dto.EstudianteResponse;
import ec.edu.epn.gestion_estudiantes.service.EstudianteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estudiantes")
public class EstudianteController {

    private final EstudianteService service;

    public EstudianteController(EstudianteService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<EstudianteResponse>> listar() {
        List<EstudianteResponse> estudiantes = service.findAll();
        return ResponseEntity.ok(estudiantes);
    }

    @PostMapping
    public ResponseEntity<EstudianteResponse> registrar(@Valid @RequestBody EstudianteRequest request) {
        EstudianteResponse response = service.registrar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
