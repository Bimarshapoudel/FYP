package Academia.FYP.backend.service.impl;

import Academia.FYP.backend.model.User;
import Academia.FYP.backend.model.exam.Category;
import Academia.FYP.backend.model.exam.Enrollment;
import Academia.FYP.backend.repository.CategoryRepository;
import Academia.FYP.backend.repository.EnrollmentRepository;
import Academia.FYP.backend.repository.UserRepository;
import Academia.FYP.backend.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EnrollmentServiceImpl implements EnrollmentService {
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public void enrollUserInCategory(Integer userId, Long categoryId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));

        Enrollment enrollment = new Enrollment(user, category);
        user.getEnrollments().add(enrollment);
        category.getEnrollments().add(enrollment);

        enrollmentRepository.save(enrollment);
    }

    @Override
    public void removeUserFromCategory(Integer userId, Long categoryId) {

    }

    @Override
    public boolean isUserEnrolled(Integer userId, Long categoryId) {
        return false;
    }

    @Override
    public List<Category> getCategoriesByUserEnrollment(Integer userId) {
        return null;
    }
}
