package edu.torikraju.kanban_api.services;

import edu.torikraju.kanban_api.domain.Backlog;
import edu.torikraju.kanban_api.domain.Project;
import edu.torikraju.kanban_api.exceptions.ProjectIdException;
import edu.torikraju.kanban_api.repositories.BacklogRepository;
import edu.torikraju.kanban_api.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    private ProjectRepository projectRepository;
    private BacklogRepository backlogRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, BacklogRepository backlogRepository) {
        this.projectRepository = projectRepository;
        this.backlogRepository = backlogRepository;
    }

    public Project saveOrUpdate(Project project) {
        String identifier = project.getIdentifier();
        try {
            if (project.getId() == null) {
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(identifier);
            }
            if (project.getId() != null) {
                project.setBacklog(backlogRepository.findByProjectIdentifier(identifier));
            }
            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project identifier " + identifier + " already exists");
        }

    }

    public Project findByIdentifier(String identifier) {
        Project project = projectRepository.findByIdentifier(identifier);
        if (project == null) {
            throw new ProjectIdException("Project identifier " + identifier + " does not exists");
        }
        return projectRepository.findByIdentifier(identifier);
    }

    public Iterable<Project> findAll() {
        return projectRepository.findAll();
    }

    public void deleteProject(String identifier) {
        Project project = projectRepository.findByIdentifier(identifier);
        if (project == null) {
            throw new ProjectIdException("Project identifier " + identifier + " does not exists");
        }
        projectRepository.delete(project);
    }

}
