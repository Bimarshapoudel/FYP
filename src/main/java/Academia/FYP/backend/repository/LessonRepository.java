package Academia.FYP.backend.repository;

import Academia.FYP.backend.model.exam.Category;
import Academia.FYP.backend.model.exam.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface LessonRepository extends JpaRepository<Lesson,Long> {

    public List<Lesson> findByCategory(Category category);
}
