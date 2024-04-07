package Academia.FYP.backend.service;

import Academia.FYP.backend.model.exam.Category;

import java.util.List;

public interface EnrollmentService {

    void enrollUserInCategory(Integer userId, Long categoryId);

    void removeUserFromCategory(Integer userId, Long categoryId);

    boolean isUserEnrolled(Integer userId, Long categoryId);

    List<Category> getCategoriesByUserEnrollment(Integer userId);
}
