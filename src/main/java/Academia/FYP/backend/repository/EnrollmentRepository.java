package Academia.FYP.backend.repository;

import Academia.FYP.backend.model.exam.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment,Long> {
    List<Enrollment> findByUserId(Integer userId);
    @Query("SELECT e FROM Enrollment e WHERE e.user.id = :userId AND e.category.cid = :categoryId")
    Enrollment findByUserIdAndCategoryId(Integer userId, Long categoryId);


    boolean existsByUser_IdAndCategory_Cid(Integer userId, Long categoryId);
}
