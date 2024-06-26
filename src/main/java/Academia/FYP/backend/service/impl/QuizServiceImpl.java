package Academia.FYP.backend.service.impl;

import Academia.FYP.backend.model.exam.Category;
import Academia.FYP.backend.model.exam.Quiz;
import Academia.FYP.backend.repository.QuizRepository;
import Academia.FYP.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
public class QuizServiceImpl implements QuizService {
    @Autowired
    private QuizRepository quizRepository;
    @Override
    public Quiz addQuiz(Quiz quiz) {
        return this.quizRepository.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return this.quizRepository.save(quiz);
    }

    @Override
    public Set<Quiz> getQuizzes() {
        return new HashSet<>(this.quizRepository.findAll());
    }

    @Override
    public Quiz getQuiz(Long quizId) {
        return this.quizRepository.findById(quizId).get();
    }

    @Override
    public void deleteQuiz(Long quizId) {

        this.quizRepository.deleteById(quizId);
    }

    @Override
    public List<Quiz> getQuizzesofCategory(Category category) {
        return this.quizRepository.findBycategory(category);
    }
}
