package Academia.FYP.backend.service.impl;

import Academia.FYP.backend.model.exam.Lesson;
import Academia.FYP.backend.model.exam.StudyMaterial;
import Academia.FYP.backend.repository.StudyMaterialRepository;
import Academia.FYP.backend.service.StudyMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class StudyMaterialServiceImpl implements StudyMaterialService {
    @Autowired
    private StudyMaterialRepository studyMaterialRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;
    @Override
    public StudyMaterial uploadStudyMaterial(MultipartFile file, Long lessonId,String description) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            Lesson lesson = new Lesson();
            lesson.setLid(lessonId);

            String filePath = uploadDir + "/" + fileName;
            Path storagePath = Paths.get(filePath);

            Files.copy(file.getInputStream(), storagePath);

            StudyMaterial studyMaterial = new StudyMaterial();
            studyMaterial.setTitle(fileName);
            studyMaterial.setFileType(file.getContentType());
            studyMaterial.setFilePath(filePath);
            studyMaterial.setLesson(lesson);
            studyMaterial.setDescription(description);

            return studyMaterialRepository.save(studyMaterial);
        } catch (IOException ex) {
            throw new RuntimeException("Failed to upload study material", ex);

        }
    }

    @Override
    public StudyMaterial getStudyMaterialById(Long id) {
        return studyMaterialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Study material not found with id: " + id));
    }

    @Override
    public List<StudyMaterial> getAllStudyMaterials() {
        return studyMaterialRepository.findAll();
    }

    @Override
    public List<StudyMaterial> getStudyMaterialsByLesson(Lesson lesson) {
        return studyMaterialRepository.findByLesson(lesson);
    }

    @Override
    public void deleteStudyMaterial(Long id) {
        StudyMaterial studyMaterial = studyMaterialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Study material not found with id: " + id));

        try {
            Files.deleteIfExists(Paths.get(studyMaterial.getFilePath()));
        } catch (IOException ex) {
            throw new RuntimeException("Failed to delete study material file", ex);
        }

        studyMaterialRepository.deleteById(id);
    }
}
