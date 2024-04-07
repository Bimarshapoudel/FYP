package Academia.FYP.backend.repository;

import Academia.FYP.backend.model.exam.Lesson;
import Academia.FYP.backend.model.exam.StudyMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface StudyMaterialRepository extends JpaRepository<StudyMaterial,Long> {
    List<StudyMaterial> findByLesson(Lesson lesson);
}
