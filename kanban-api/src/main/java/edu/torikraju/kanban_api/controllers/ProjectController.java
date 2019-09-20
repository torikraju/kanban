package edu.torikraju.kanban_api.controllers;


import edu.torikraju.kanban_api.domain.Project;
import edu.torikraju.kanban_api.services.MapValidationErrorService;
import edu.torikraju.kanban_api.services.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@CrossOrigin
@RequestMapping("/api/project")
public class ProjectController {

    private ProjectService projectService;
    private MapValidationErrorService errorService;

    public ProjectController(ProjectService projectService, MapValidationErrorService errorService) {
        this.projectService = projectService;
        this.errorService = errorService;
    }

    @PostMapping("")
    public ResponseEntity<?> createProject(@Valid @RequestBody Project project, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = errorService.mapValidationService(result);
        if (errorMap != null) return errorMap;
        Project newProject = projectService.saveOrUpdate(project, principal.getName());
        return new ResponseEntity<>(newProject, HttpStatus.CREATED);
    }

    @GetMapping("/{identifier}")
    public ResponseEntity<?> getProjectByIdentifier(@PathVariable String identifier, Principal principal) {
        Project project = projectService.findByIdentifier(identifier, principal.getName());
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Project> getAll(Principal principal) {
        return projectService.findAll(principal.getName());
    }

    @DeleteMapping("/{identifier}")
    public ResponseEntity<?> deleteProject(@PathVariable String identifier, Principal principal) {
        projectService.deleteProject(identifier, principal.getName());
        return new ResponseEntity<>("Project with identifier: " + identifier + " successfully deleted", HttpStatus.OK);
    }

}
