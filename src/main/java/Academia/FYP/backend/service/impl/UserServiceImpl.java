package Academia.FYP.backend.service.impl;

import Academia.FYP.backend.model.User;
import Academia.FYP.backend.repository.UserRepository;
import Academia.FYP.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User createUser(User request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new UsernameNotFoundException("User not found");
        }


        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));


        user.setRole(request.getRole());

        user = userRepository.save(user);
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
}

