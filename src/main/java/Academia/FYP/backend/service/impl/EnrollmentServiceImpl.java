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
import java.util.stream.Collectors;

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
        if (isUserEnrolled(userId, categoryId)) {
            throw new RuntimeException("User is already enrolled in this category");
        }

        Enrollment enrollment = new Enrollment(user, category);
        user.getEnrollments().add(enrollment);
        category.getEnrollments().add(enrollment);

        enrollmentRepository.save(enrollment);
    }

    @Override
    public void removeUserFromCategory(Integer userId, Long categoryId) {
        Enrollment enrollment = enrollmentRepository.findByUserIdAndCategoryId(userId, categoryId);
        if (enrollment != null) {
            enrollmentRepository.delete(enrollment);
        }
    }

    @Override
    public boolean isUserEnrolled(Integer userId, Long categoryId) {

        return enrollmentRepository.existsByUser_IdAndCategory_Cid(userId, categoryId);
    }

    @Override
    public List<Category> getCategoriesByUserEnrollment(Integer userId) {
        // Retrieve categories only if the specified user is enrolled in them
        return enrollmentRepository.findByUserId(userId).stream()
                .map(enrollment -> enrollment.getCategory())
                .collect(Collectors.toList());
    }

}
