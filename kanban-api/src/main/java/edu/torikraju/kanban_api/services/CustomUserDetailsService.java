package edu.torikraju.kanban_api.services;

import edu.torikraju.kanban_api.domain.User;
import edu.torikraju.kanban_api.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) throw new UsernameNotFoundException("User not found");
        return user;
    }

    @Transactional
    public User loadUserById(Long id) throws UsernameNotFoundException {
        User user = userRepository.getById(id);
        if (user == null) throw new UsernameNotFoundException("User not found");
        return user;
    }

}
