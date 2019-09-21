package edu.torikraju.kanban_api.services;

import edu.torikraju.kanban_api.domain.Backlog;
import edu.torikraju.kanban_api.domain.Task;
import edu.torikraju.kanban_api.exceptions.NotFoundException;
import edu.torikraju.kanban_api.repositories.BacklogRepository;
import edu.torikraju.kanban_api.repositories.ProjectRepository;
import edu.torikraju.kanban_api.repositories.TaskRepository;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    private BacklogRepository backlogRepository;
    private TaskRepository taskRepository;
    private ProjectRepository projectRepository;
    private ProjectService projectService;

    public TaskService(BacklogRepository backlogRepository,
                       TaskRepository taskRepository,
                       ProjectRepository projectRepository,
                       ProjectService projectService) {
        this.backlogRepository = backlogRepository;
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
        this.projectService = projectService;
    }

    public Task addTask(String identifier, Task task, String username) {
        Backlog backlog = projectService.findByIdentifier(identifier, username).getBacklog();
        task.setBacklog(backlog);
        Integer sequence = backlog.getPTSequence();
        sequence++;
        backlog.setPTSequence(sequence);
        task.setProjectSequence(backlog.getProjectIdentifier() + '-' + sequence);
        task.setProjectIdentifier(backlog.getProjectIdentifier());
        if (task.getPriority() == null || task.getPriority() == 0) {
            task.setPriority(3);
        }
        if (task.getStatus() == null) {
            task.setStatus("TO_DO");
        }
        return taskRepository.save(task);
    }

    public Iterable<Task> findBacklogByIdentifier(String backlogId, String username) {
        projectService.findByIdentifier(backlogId, username);
        return taskRepository.findByProjectIdentifierOrderByPriority(backlogId);
    }

    public Task findBySequence(String backlogId, String sequence, String username) {
        projectService.findByIdentifier(backlogId, username);
        Task task = taskRepository.findByProjectSequence(sequence);
        if (task == null) {
            throw new NotFoundException("Task with sequence: " + sequence + " not found");
        }
        if (!task.getProjectIdentifier().equals(backlogId)) {
            throw new NotFoundException("Task with projectSequence: " + sequence + " not found in project with identifier: " + backlogId + ".");
        }

        return task;
    }

    public Task updateTask(Task updatedTask, String backlogId, String sequence, String username) {
        findBySequence(backlogId, sequence, username);
        if (!taskRepository.findById(updatedTask.getId()).isPresent()) {
            throw new NotFoundException("Task with id: " + updatedTask.getId() + " not found");
        }
        return taskRepository.save(updatedTask);
    }

    public void deleteTask(String backlogId, String sequence, String username) {
        Task task = findBySequence(backlogId, sequence, username);
        taskRepository.delete(task);
    }

}
