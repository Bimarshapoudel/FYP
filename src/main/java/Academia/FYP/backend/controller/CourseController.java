package Academia.FYP.backend.controller;

import Academia.FYP.backend.service.CourseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import java.io.IOException;

@RestController
public class CourseController {
    @Autowired
    private CourseServiceImpl courseService;
    @PostMapping("/fileSystem")
    public ResponseEntity<?> uploadFileToFileSystem(@RequestParam("image") MultipartFile file) throws IOException {
        String uploadImage = courseService.uploadFileToFileSystem(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @GetMapping("/fileSystem/{fileName}")
    public ResponseEntity<?> downloadCourse(@PathVariable String fileName) throws IOException {
        byte[] imageData=courseService.downloadCourse(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);

    }

}
