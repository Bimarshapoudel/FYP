package Academia.FYP.backend.controller;

import Academia.FYP.backend.model.exam.Lesson;
import Academia.FYP.backend.model.exam.StudyMaterial;
import Academia.FYP.backend.service.StudyMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) {
        StudyMaterial studyMaterial = studyMaterialService.getStudyMaterialById(id);

        Path filePath = Paths.get(studyMaterial.getFilePath());
        Resource resource;
        try {
            resource = new UrlResource(filePath.toUri());
            if (resource.exists() || resource.isReadable()) {

                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filePath.getFileName().toString() + "\"")
                        .body(resource);
            } else {
                throw new RuntimeException("File not found or not readable");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        } catch (IOException e) {
            throw new RuntimeException("Error determining file type: " + e.getMessage());
        }
    }
}
