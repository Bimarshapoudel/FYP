package Academia.FYP.backend.service;

import Academia.FYP.backend.model.AuthenticationResponse;
import Academia.FYP.backend.model.JwtRequest;
import Academia.FYP.backend.model.Token;
import Academia.FYP.backend.model.User;
import Academia.FYP.backend.repository.TokenRepository;
import Academia.FYP.backend.repository.UserRepository;
import Academia.FYP.backend.service.impl.UserServiceImpl;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
private  final TokenRepository tokenRepository;

private  final EmailService emailService;
private final UserServiceImpl userService;


    private final AuthenticationManager authenticationManager;

    @Value("${application.security.mailing.frontend.activation-url}")
    private String activationUrl;

    public AuthenticationService(UserRepository repository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,

                                 TokenRepository tokenRepository, EmailService emailService,  UserServiceImpl userService, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.emailService = emailService;
        this.userService = userService;

        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(User request) throws MessagingException {

        // check if user already exist. if exist than authenticate the user
        if(repository.findByUsername(request.getUsername()).isPresent()) {
            return new AuthenticationResponse( null,"User already exist");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());

        user = repository.save(user);
        sendValidationEmail(user);

        String jwt = jwtService.generateToken(user);



        return new AuthenticationResponse(jwt, "User registration was successful");

    }

    private void sendValidationEmail(User user) throws MessagingException {
        var newToken=generateAndSaveActivationToken(user);
        emailService.sendEmail(user.getEmail(), user.fullName(),EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,newToken,"Account Activation");
        //send Email

    }

    private String generateAndSaveActivationToken(User user) {
//        gerateToken
        String generatedToken=generateActivationCode(6);
        var token= Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepository.save(token);
        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String characters="0123456789";
        StringBuilder codeBuilder=new StringBuilder();
        SecureRandom secureRandom=new SecureRandom();
        for (int i=0;i<length;i++){
            int randomIndex=secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }
        return codeBuilder.toString();
    }

    public String authenticate(JwtRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            User user = repository.findByUsername(request.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            return jwtService.generateToken(user);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid username or password", e);
        }
    }

    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        // Check if the token has expired
        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            // Token has expired, send a new validation email
            userService.sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Activation token has expired. A new token has been sent.");
        }

        // Activate the user account
        User user = repository.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setEnabled(true);
        repository.save(user);

        // Update the validation timestamp of the token
        savedToken.setValidateAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }

}
