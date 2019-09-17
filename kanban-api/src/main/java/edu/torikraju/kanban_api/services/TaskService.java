package edu.torikraju.kanban_api.services;

import edu.torikraju.kanban_api.domain.Backlog;
import edu.torikraju.kanban_api.domain.Task;
import edu.torikraju.kanban_api.repositories.BacklogRepository;
import edu.torikraju.kanban_api.repositories.TaskRepository;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    private BacklogRepository backlogRepository;
    private TaskRepository taskRepository;

    public TaskService(BacklogRepository backlogRepository, TaskRepository taskRepository) {
        this.backlogRepository = backlogRepository;
        this.taskRepository = taskRepository;
    }

    public Task addTask(String identifier, Task task) {
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
    }

}
