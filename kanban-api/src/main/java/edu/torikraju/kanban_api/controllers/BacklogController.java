package edu.torikraju.kanban_api.controllers;

import edu.torikraju.kanban_api.domain.Task;
import edu.torikraju.kanban_api.services.MapValidationErrorService;
import edu.torikraju.kanban_api.services.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@CrossOrigin
@RequestMapping("/api/backlog")
public class BacklogController {

    private TaskService taskService;
    private MapValidationErrorService mapValidationErrorService;

    public BacklogController(TaskService taskService, MapValidationErrorService mapValidationErrorService) {
        this.taskService = taskService;
        this.mapValidationErrorService = mapValidationErrorService;
    }

    @PostMapping("/{backlogId}")
    public ResponseEntity<?> addTaskToBacklog(@Valid @RequestBody Task task,
                                              BindingResult result,
                                              @PathVariable String backlogId,
                                              Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;
        Task newTask = taskService.addTask(backlogId, task, principal.getName());
        return new ResponseEntity<>(newTask, HttpStatus.CREATED);
    }

    @GetMapping("/{backlogId}")
    public Iterable<Task> getProjectBacklog(@PathVariable String backlogId, Principal principal) {
        return taskService.findBacklogByIdentifier(backlogId, principal.getName());
    }

    @GetMapping("/{backlogId}/{sequence}")
    public ResponseEntity<?> getProjectTask(@PathVariable String backlogId, @PathVariable String sequence, Principal principal) {
        Task task = taskService.findBySequence(backlogId, sequence, principal.getName());
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PutMapping("/{backlogId}/{sequence}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody Task updatedTask, BindingResult result,
                                               @PathVariable String backlogId,
                                               @PathVariable String sequence, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;
        Task updatedNewTask = taskService.updateTask(updatedTask, backlogId, sequence, principal.getName());
        return new ResponseEntity<>(updatedNewTask, HttpStatus.CREATED);
    }

    @DeleteMapping("/{backlogId}/{sequence}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable String backlogId, @PathVariable String sequence, Principal principal) {
        taskService.deleteTask(backlogId, sequence, principal.getName());
        return new ResponseEntity<>("Task with sequence: " + sequence + " successfully deleted", HttpStatus.OK);
    }


}