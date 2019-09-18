package edu.torikraju.kanban_api.services;

import edu.torikraju.kanban_api.domain.Backlog;
import edu.torikraju.kanban_api.domain.Project;
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

    public TaskService(BacklogRepository backlogRepository, TaskRepository taskRepository, ProjectRepository projectRepository) {
        this.backlogRepository = backlogRepository;
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    public Task addTask(String identifier, Task task) {
        try {
            Backlog backlog = backlogRepository.findByProjectIdentifier(identifier);
            task.setBacklog(backlog);
            Integer sequence = backlog.getPTSequence();
            sequence++;
            backlog.setPTSequence(sequence);
            task.setProjectSequence(backlog.getProjectIdentifier() + '-' + sequence);
            task.setProjectIdentifier(backlog.getProjectIdentifier());
            if (task.getPriority() == null) {
                task.setPriority(3);
            }
            if (task.getStatus() == null) {
                task.setStatus("TO_DO");
            }
            return taskRepository.save(task);
        } catch (Exception e) {
            throw new NotFoundException("Project not found");
        }
    }

    public Iterable<Task> findBacklogByIdentifier(String backlogId) {
        Project project = projectRepository.findByIdentifier(backlogId);
        if (project == null) {
            throw new NotFoundException("project with identifier: " + backlogId + " not found");
        }
        return taskRepository.findByProjectIdentifierOrderByPriority(backlogId);
    }

    public Task findBySequence(String backlogId, String sequence) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(backlogId);
        if (backlog == null) {
            throw new NotFoundException("project with identifier: " + backlogId + " not found");
        }
        Task task = taskRepository.findByProjectSequence(sequence);
        if (task == null) {
            throw new NotFoundException("Task with sequence: " + sequence + " not found");
        }
        if (!task.getProjectIdentifier().equals(backlogId)) {
            throw new NotFoundException("Task with projectSequence: " + sequence + " not found in project with identifier: " + backlogId + ".");
        }

        return task;
    }

    public Task updateTask(Task updatedTask, String backlogId, String sequence) {
        Task task = findBySequence(backlogId, sequence);
        return taskRepository.save(updatedTask);
    }

    public void deleteTask(String backlogId, String sequence) {
        Task task = findBySequence(backlogId, sequence);
        taskRepository.delete(task);
    }

}
