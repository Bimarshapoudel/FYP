package Academia.FYP.backend.repository;

import Academia.FYP.backend.model.exam.Category;
import Academia.FYP.backend.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz,Long> {
    public List<Quiz> findBycategory(Category category);
}
