package edu.torikraju.kanban_api.services;

import edu.torikraju.kanban_api.domain.Project;
import edu.torikraju.kanban_api.exceptions.ProjectIdException;
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
        try {
            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project identifier " + project.getIdentifier() + " already exists");
        }

    }

    public Project findByIdentifier(String identifier) {
        Project project = projectRepository.findByIdentifier(identifier);
        if (project == null) {
            throw new ProjectIdException("Project identifier " + identifier + " does not exists");
        }
        return projectRepository.findByIdentifier(identifier);
    }

}
