package Academia.FYP.backend.controller;

import Academia.FYP.backend.model.exam.Category;
import Academia.FYP.backend.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enrollment")
public class EnrollmentController {
    @Autowired
    private  EnrollmentService enrollmentService;



    // Endpoint to enroll a user in a category
    @PostMapping("/")
    public ResponseEntity<String> enrollUserInCategory(@RequestParam Integer userId, @RequestParam Long categoryId) {
        try {
            enrollmentService.enrollUserInCategory(userId, categoryId);
            return ResponseEntity.status(HttpStatus.CREATED).body("User enrolled successfully in category");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Endpoint to remove a user from a category
    @DeleteMapping("/remove")
    public ResponseEntity<String> removeUserFromCategory(@RequestParam Integer userId, @RequestParam Long categoryId) {
        enrollmentService.removeUserFromCategory(userId, categoryId);
        return ResponseEntity.status(HttpStatus.OK).body("User removed from category");
    }

    // Endpoint to check if a user is enrolled in a category
    @GetMapping("/check")
    public ResponseEntity<Boolean> isUserEnrolled(@RequestParam Integer userId, @RequestParam Long categoryId) {
        boolean isEnrolled = enrollmentService.isUserEnrolled(userId, categoryId);
        return ResponseEntity.ok(isEnrolled);
    }

    // Endpoint to retrieve categories by user enrollment
    @GetMapping("/user/{userId}/categories")
    public ResponseEntity<List<Category>> getCategoriesByUserEnrollment(@PathVariable Integer userId) {
        List<Category> categories = enrollmentService.getCategoriesByUserEnrollment(userId);
        return ResponseEntity.ok(categories);
    }
}
