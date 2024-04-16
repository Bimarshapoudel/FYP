package Academia.FYP.backend.service.impl;

import Academia.FYP.backend.model.Role;
import Academia.FYP.backend.model.Token;
import Academia.FYP.backend.model.User;
import Academia.FYP.backend.repository.TokenRepository;
import Academia.FYP.backend.repository.UserRepository;
import Academia.FYP.backend.service.EmailService;
import Academia.FYP.backend.service.EmailTemplateName;
import Academia.FYP.backend.service.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private  final TokenRepository tokenRepository;
    @Autowired
    private  final EmailService emailService;

    public UserServiceImpl(PasswordEncoder passwordEncoder, TokenRepository tokenRepository, EmailService emailService) {
        this.passwordEncoder = passwordEncoder;
        this.tokenRepository = tokenRepository;
        this.emailService = emailService;
    }
    @Value("${application.security.mailing.frontend.activation-url}")
    private String activationUrl;
    @Override
    public User createUser(User request) throws MessagingException {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new UsernameNotFoundException("User not found");
        }


        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setProfilePic(request.getProfilePic());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setRole(request.getRole());
        user.setEnabled(false);
        user.setAccountLocked(false);
        user = userRepository.save(user);
        sendValidationEmail(user);
        return user;
    }

    @Override
    public Optional<User> getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override

    public void deleteUser(Integer userId) {
        this.userRepository.deleteById(userId);
    }

    @Override
    public User updateUser(User user, Integer userId) throws Exception {
        // Retrieve the user from the database using the provided userId
        Optional<User> optionalExistingUser = userRepository.findById(userId);

        // Check if the user exists
        if (optionalExistingUser.isPresent()) {
            User existingUser = optionalExistingUser.get();

            // Update the existing user with the new information
            if (user.getUsername() != null) {
                existingUser.setUsername(user.getUsername());
            }
            if (user.getPassword() != null) {
                existingUser.setPassword(user.getPassword());
            }
            if (user.getEmail() != null) {
                existingUser.setEmail(user.getEmail());
            }
            if (user.getFirstName() != null) {
                existingUser.setFirstName(user.getFirstName());
            }
            if (user.getLastName() != null) {
                existingUser.setLastName(user.getLastName());
            }
            if (user.getPhone() != null) {
                existingUser.setPhone(user.getPhone());
            }
            if (user.getProfilePic() != null) {
                existingUser.setProfilePic(user.getProfilePic());
            }
            // Add other fields as necessary

            // Save the updated user back to the database
            userRepository.save(existingUser);

            return existingUser;
        } else {
            // Throw an exception indicating that the user was not found
            throw new Exception("User with ID " + userId + " not found");
        }
    }

    public void sendValidationEmail(User user) throws MessagingException {
        var newToken=generateAndSaveActivationToken(user);
        emailService.sendEmail(user.getEmail(), user.fullName(), EmailTemplateName.ACTIVATE_ACCOUNT,
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
    public List<User> getTeacher(Role role){
        return userRepository.findByRole(Role.TEACHER);
    }
    public List<User> getStudent(Role role){
        return userRepository.findByRole(Role.STUDENT);
    }
}

