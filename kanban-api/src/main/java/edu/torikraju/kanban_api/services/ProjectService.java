package edu.torikraju.kanban_api.services;

import edu.torikraju.kanban_api.domain.Project;
import edu.torikraju.kanban_api.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    private ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project saveOrUpdate(Project project) {
        return projectRepository.save(project);
    }

}
