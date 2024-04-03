package Academia.FYP.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Service
public class CourseServiceImpl {
    @Autowired
    private CourseRepository courseRepository;

    private final String FolderePath="/d/BackendFiles";

    public String uploadFileToFileSystem(MultipartFile file) throws IOException {
        String filePath=FolderePath+file.getOriginalFilename();
        try {
            Course course = courseRepository.save(Course.builder()
                    .fileName(file.getOriginalFilename())
                    .fileType(file.getContentType())
                    .filePath(filePath)
                    .build());
            file.transferTo(new File(filePath));
            if(course !=null){
                return "file uploaded successfully :" + filePath;
            }
         return null;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public byte[] downloadCourse(String fileName) throws IOException {
        Optional<Course> dbCourse=courseRepository.findByfileName(fileName);
        String filePath= String.valueOf(dbCourse.get().getFilePath());
        byte[] file= Files.readAllBytes(new File(filePath).toPath());
        return file;


    }

}
