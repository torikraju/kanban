package edu.torikraju.kanban_api.repositories;

import edu.torikraju.kanban_api.domain.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {
}
