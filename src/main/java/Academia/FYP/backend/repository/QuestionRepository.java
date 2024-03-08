package Academia.FYP.backend.repository;

import Academia.FYP.backend.model.exam.Question;
import Academia.FYP.backend.model.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface QuestionRepository extends JpaRepository<Question,Long> {
    Set<Question> findByQuiz(Quiz quiz);
}
