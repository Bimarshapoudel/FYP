package Academia.FYP.backend.controller;

import Academia.FYP.backend.model.Role;
import Academia.FYP.backend.model.User;
import Academia.FYP.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception{
        return this.userService.createUser(user);
    }
    @GetMapping("/{username}")
    public Optional<User> getUser(@PathVariable("username") String username){
        return this.userService.getUser(username);
    }
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId")Integer userId)
    {
        this.userService.deleteUser(userId);
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<User> updateUser(@RequestBody User user, @PathVariable("userId") Integer userId) throws Exception {
        User updatedUser = userService.updateUser(user, userId);
        if (updatedUser != null) {
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/teachers")
    public List<User> getAllTeachers() {
        return userService.getTeacher(Role.TEACHER);
    }
    @GetMapping("/students")
    public List<User> getAllStudents() {
        return userService.getStudent(Role.STUDENT);
    }
}
