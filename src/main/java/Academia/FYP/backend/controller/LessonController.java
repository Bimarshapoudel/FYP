package Academia.FYP.backend.controller;

import Academia.FYP.backend.model.exam.Category;
import Academia.FYP.backend.model.exam.Lesson;
import Academia.FYP.backend.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lesson")
public class LessonController {
    @Autowired
    private LessonService lessonService;

    @PostMapping("/")
    public ResponseEntity<Lesson> add(@RequestBody Lesson lesson){
        return ResponseEntity.ok(this.lessonService.addLesson(lesson));
    }

    @PutMapping("/")
    public ResponseEntity<Lesson> update(@RequestBody Lesson lesson){
        return ResponseEntity.ok(this.lessonService.updateLesson(lesson));
    }
    @GetMapping("/")
    public ResponseEntity<?> lessons(){
        return ResponseEntity.ok(this.lessonService.getLessons());
    }

//    get single lesson
    @GetMapping("/{lid)")
    public  Lesson lesson(@PathVariable("lid") Long lid){
       return this.lessonService.getLesson(lid);
    }
    @DeleteMapping("/{lid}")
    public void delete(@PathVariable("lid") Long lid){
        this.lessonService.deleteQuiz(lid);
    }

    @GetMapping("category/{cid}")
        public List<Lesson> getLessonofCategory(@PathVariable("cid") Long cid){
            Category category=new Category();
            category.setCid(cid);
            return this.lessonService.getLessonofCategory(category);
        }
}

