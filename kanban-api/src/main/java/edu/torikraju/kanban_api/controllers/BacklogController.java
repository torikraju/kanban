package edu.torikraju.kanban_api.controllers;

import edu.torikraju.kanban_api.domain.Task;
import edu.torikraju.kanban_api.services.MapValidationErrorService;
import edu.torikraju.kanban_api.services.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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

}
