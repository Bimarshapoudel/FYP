package Academia.FYP.backend.service;

import Academia.FYP.backend.model.exam.Category;
import Academia.FYP.backend.model.exam.Quiz;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;

public interface QuizService {

    public Quiz addQuiz(Quiz quiz);

    public Quiz updateQuiz(Quiz quiz);
    public Set<Quiz> getQuizzes();

    public Quiz getQuiz(Long quizId);

    public void deleteQuiz(Long quizId);


   public List<Quiz> getQuizzesofCategory(Category category);
}
