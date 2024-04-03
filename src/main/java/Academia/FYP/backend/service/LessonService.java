package Academia.FYP.backend.service;

import Academia.FYP.backend.model.exam.Category;
import Academia.FYP.backend.model.exam.Lesson;

import java.util.List;
import java.util.Set;

public interface LessonService {

    public Lesson addLesson(Lesson lesson);
    public Lesson updateLesson(Lesson lesson);
    public Set<Lesson> getLessons();
    public Lesson getLesson(Long lessonId);
    public void deleteQuiz(Long lessonId);

    public List<Lesson> getLessonofCategory(Category category);
}
