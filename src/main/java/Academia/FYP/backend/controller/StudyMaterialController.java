package Academia.FYP.backend.controller;

import Academia.FYP.backend.model.exam.Lesson;
import Academia.FYP.backend.model.exam.StudyMaterial;
import Academia.FYP.backend.service.StudyMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/study")
public class StudyMaterialController {
@Autowired
private StudyMaterialService studyMaterialService;
    @PostMapping("/upload")
    public ResponseEntity<StudyMaterial> uploadStudyMaterial(@RequestParam("file") MultipartFile file,
                                                             @RequestParam("lessonId") Long lessonId,String description) {
        StudyMaterial studyMaterial = studyMaterialService.uploadStudyMaterial(file, lessonId,description);
        return new ResponseEntity<>(studyMaterial, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudyMaterial> getStudyMaterialById(@PathVariable Long id) {
        StudyMaterial studyMaterial = studyMaterialService.getStudyMaterialById(id);
        return ResponseEntity.ok(studyMaterial);
    }

    @GetMapping("/lesson/{lid}")
    public List<StudyMaterial> getStudyMaterialsByLesson(@PathVariable("lid") Long lessonId) {
        Lesson lesson=new Lesson();
        lesson.setLid(lessonId);
        return this.studyMaterialService.getStudyMaterialsByLesson(lesson);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudyMaterial(@PathVariable Long id) {
        studyMaterialService.deleteStudyMaterial(id);
        return ResponseEntity.noContent().build();
    }
}
