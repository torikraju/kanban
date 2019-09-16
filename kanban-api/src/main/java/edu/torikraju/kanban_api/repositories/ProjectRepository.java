package edu.torikraju.kanban_api.repositories;

import edu.torikraju.kanban_api.domain.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
    Project findByIdentifier(String identifier);
}
