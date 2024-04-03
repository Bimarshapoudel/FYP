package Academia.FYP.backend.service.impl;

import Academia.FYP.backend.model.exam.Category;
import Academia.FYP.backend.model.exam.Lesson;
import Academia.FYP.backend.repository.LessonRepository;
import Academia.FYP.backend.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class LessonServiceImpl implements LessonService {
    @Autowired
    private LessonRepository lessonRepository;
    @Override
    public Lesson addLesson(Lesson lesson) {
        return this.lessonRepository.save(lesson);
    }

    @Override
    public Lesson updateLesson(Lesson lesson) {
        return this.lessonRepository.save(lesson);
    }

    @Override
    public Set<Lesson> getLessons() {
        return new HashSet<>(this.lessonRepository.findAll());
    }

    @Override
    public Lesson getLesson(Long lessonId) {
        return this.lessonRepository.findById(lessonId).get();
    }

    @Override
    public void deleteQuiz(Long lessonId) {
this.lessonRepository.deleteById(lessonId);
    }

    @Override
    public List<Lesson> getLessonofCategory(Category category) {
        return this.lessonRepository.findByCategory(category);
    }
}
