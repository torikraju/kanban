package edu.torikraju.kanban_api.controllers;

import edu.torikraju.kanban_api.domain.Project;
import edu.torikraju.kanban_api.domain.Task;
import edu.torikraju.kanban_api.services.MapValidationErrorService;
import edu.torikraju.kanban_api.services.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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
    public ResponseEntity<?> addTaskToBacklog(@Valid @RequestBody Task task, BindingResult result, @PathVariable String backlogId) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;
        Task newTask = taskService.addTask(backlogId, task);
        return new ResponseEntity<>(newTask, HttpStatus.CREATED);
    }

    @GetMapping("/{backlogId}")
    public Iterable<Task> getProjectBacklog(@PathVariable String backlogId) {
        return taskService.findBacklogByIdentifier(backlogId);
    }

    @GetMapping("/{backlogId}/{sequence}")
    public ResponseEntity<?> getProjectTask(@PathVariable String backlogId, @PathVariable String sequence) {
        Task task = taskService.findBySequence(backlogId, sequence);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PutMapping("/{backlogId}/{sequence}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody Task updatedTask, BindingResult result,
                                               @PathVariable String backlogId,
                                               @PathVariable String sequence) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;
        Task updatedNewTask = taskService.updateTask(updatedTask, backlogId, sequence);
        return new ResponseEntity<>(updatedNewTask, HttpStatus.CREATED);
    }

    @DeleteMapping("/{backlogId}/{sequence}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable String backlogId, @PathVariable String sequence) {
        taskService.deleteTask(backlogId, sequence);
        return new ResponseEntity<>("Task with sequence: " + sequence + " successfully deleted", HttpStatus.OK);
    }


}