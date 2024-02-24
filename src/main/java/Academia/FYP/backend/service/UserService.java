package Academia.FYP.backend.service;

import Academia.FYP.backend.model.User;

import java.util.Optional;

public interface UserService {
    public User createUser(User user) throws Exception;

    //get user by username
    public Optional<User> getUser(String username);

    //delete user by id
    public void deleteUser(Integer userId);
    //update user
    public User updateUser(User user,Integer userId) throws Exception;
}
