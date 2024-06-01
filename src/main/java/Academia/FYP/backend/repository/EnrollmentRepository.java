package Academia.FYP.backend.repository;

import Academia.FYP.backend.model.User;
import Academia.FYP.backend.model.exam.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment,Long> {
    List<Enrollment> findByUserId(Integer userId);
    @Query("SELECT e FROM Enrollment e WHERE e.user.id = :userId AND e.category.cid = :categoryId")
    Enrollment findByUserIdAndCategoryId(Integer userId, Long categoryId);

    @Query("SELECT e.user FROM Enrollment e JOIN e.category c WHERE c.title = :categoryName AND e.user.role = 'STUDENT'")
    List<User> findStudentsByCategoryName(@Param("categoryName") String categoryName);
    boolean existsByUser_IdAndCategory_Cid(Integer userId, Long categoryId);

    @Query("SELECT e.user FROM Enrollment e JOIN e.category c WHERE c.title = :categoryName AND e.user.role = 'TEACHER'")
    List<User> findTeacherByCategoryName(@Param("categoryName") String categoryName);
}
