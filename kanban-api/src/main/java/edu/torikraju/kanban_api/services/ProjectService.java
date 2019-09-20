package edu.torikraju.kanban_api.services;

import edu.torikraju.kanban_api.domain.Backlog;
import edu.torikraju.kanban_api.domain.Project;
import edu.torikraju.kanban_api.domain.User;
import edu.torikraju.kanban_api.exceptions.NotFoundException;
import edu.torikraju.kanban_api.exceptions.ProjectIdException;
import edu.torikraju.kanban_api.repositories.BacklogRepository;
import edu.torikraju.kanban_api.repositories.ProjectRepository;
import edu.torikraju.kanban_api.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    private ProjectRepository projectRepository;
    private BacklogRepository backlogRepository;
    private UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository,
                          BacklogRepository backlogRepository,
                          UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.backlogRepository = backlogRepository;
        this.userRepository = userRepository;
    }

    public Project saveOrUpdate(Project project, String username) {
        String identifier = project.getIdentifier();
        if (project.getId() != null) {
            findByIdentifier(project.getIdentifier(), username);
            if (projectRepository.getById(project.getId()) == null) {
                throw new NotFoundException("Project with id: " + project.getId() + " not found");
            }
        }

        try {
            User user = userRepository.findByUsername(username);
            if (project.getId() == null) {
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(identifier);
            }
            if (project.getId() != null) {
                project.setBacklog(backlogRepository.findByProjectIdentifier(identifier));
            }
            project.setUser(user);
            project.setProjectLeader(user.getUsername());
            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project identifier " + identifier + " already exists");
        }

    }

    public Project findByIdentifier(String identifier, String username) {
        Project project = projectRepository.findByIdentifier(identifier);
        if (project == null) {
            throw new ProjectIdException("Project identifier " + identifier + " does not exists");
        }
        if (!project.getProjectLeader().equals(username)) {
            throw new NotFoundException("Project not found in your account");
        }
        return projectRepository.findByIdentifier(identifier);
    }

    public Iterable<Project> findAll(String username) {
        return projectRepository.findAllByProjectLeader(username);
    }

    public void deleteProject(String identifier, String username) {
        projectRepository.delete(findByIdentifier(identifier, username));
    }

}
