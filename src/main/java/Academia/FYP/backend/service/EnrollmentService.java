package Academia.FYP.backend.service;

import Academia.FYP.backend.model.User;
import Academia.FYP.backend.model.exam.Category;
import Academia.FYP.backend.model.exam.Enrollment;

import java.util.List;

public interface EnrollmentService {

    void enrollUserInCategory(Integer userId, Long categoryId);

    void removeUserFromCategory(Integer userId, Long categoryId);

    boolean isUserEnrolled(Integer userId, Long categoryId);

    List<Category> getCategoriesByUserEnrollment(Integer userId);
    List<Enrollment> getAllEnrollments();

    List<User> getStudentsByCategory(String categoryName);
    List<User> getTeacherByCategory(String categoryName);
}
