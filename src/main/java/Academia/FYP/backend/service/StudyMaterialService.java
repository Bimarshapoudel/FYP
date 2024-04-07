package Academia.FYP.backend.service;

import Academia.FYP.backend.model.exam.Lesson;
import Academia.FYP.backend.model.exam.StudyMaterial;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StudyMaterialService {
    StudyMaterial uploadStudyMaterial(MultipartFile file, Long lessonId,String Discription);

    StudyMaterial getStudyMaterialById(Long id);

    List<StudyMaterial> getAllStudyMaterials();

    List<StudyMaterial> getStudyMaterialsByLesson(Lesson lesson);

    void deleteStudyMaterial(Long id);
}
