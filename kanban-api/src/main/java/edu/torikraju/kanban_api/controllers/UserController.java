package edu.torikraju.kanban_api.controllers;

import edu.torikraju.kanban_api.config.JwtTokenProvider;
import edu.torikraju.kanban_api.domain.User;
import edu.torikraju.kanban_api.payload.JsonLoginSuccessResponse;
import edu.torikraju.kanban_api.payload.LoginRequest;
import edu.torikraju.kanban_api.services.MapValidationErrorService;
import edu.torikraju.kanban_api.services.UserService;
import edu.torikraju.kanban_api.validator.UserValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

import static edu.torikraju.kanban_api.config.SecurityConstants.EXPIRATION_TIME;
import static edu.torikraju.kanban_api.config.SecurityConstants.TOKEN_PREFIX;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {

    private MapValidationErrorService errorService;
    private UserService userService;
    private UserValidator userValidator;
    private JwtTokenProvider tokenProvider;
    private AuthenticationManager authenticationManager;

    public UserController(MapValidationErrorService errorService,
                          UserService userService,
                          UserValidator userValidator,
                          JwtTokenProvider tokenProvider,
                          AuthenticationManager authenticationManager) {
        this.errorService = errorService;
        this.userService = userService;
        this.userValidator = userValidator;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user, BindingResult result) {
        userValidator.validate(user, result);
        ResponseEntity<?> errorMap = errorService.mapValidationService(result);
        if (errorMap != null) return errorMap;
        User newUser = userService.saveUser(user);

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {
        ResponseEntity<?> errorMap = errorService.mapValidationService(result);
        if (errorMap != null) return errorMap;
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = TOKEN_PREFIX + tokenProvider.generateToken(authentication);
        Date now = new Date(System.currentTimeMillis());
        Date expireDate = new Date(now.getTime() + EXPIRATION_TIME);

        return new ResponseEntity<>(new JsonLoginSuccessResponse(true, token, expireDate), HttpStatus.OK);

    }

}
