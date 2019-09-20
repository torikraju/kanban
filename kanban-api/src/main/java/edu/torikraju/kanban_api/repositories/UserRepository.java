package edu.torikraju.kanban_api.repositories;

import edu.torikraju.kanban_api.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
}
