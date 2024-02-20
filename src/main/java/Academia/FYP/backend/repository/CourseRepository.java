package Academia.FYP.backend.repository;

import Academia.FYP.backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course,Long> {
Optional<Course> findByfileName(String fileName);
}
