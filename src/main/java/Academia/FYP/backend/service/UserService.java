package Academia.FYP.backend.service;

import Academia.FYP.backend.model.Role;
import Academia.FYP.backend.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public User createUser(User user) throws Exception;

    //get user by username
    public Optional<User> getUser(String username);

    //delete user by id
    public void deleteUser(Integer userId);
    //update user
    public User updateUser(User user,Integer userId) throws Exception;
    public List<User> getTeacher(Role role);
    public List<User> getStudent(Role role);
}
