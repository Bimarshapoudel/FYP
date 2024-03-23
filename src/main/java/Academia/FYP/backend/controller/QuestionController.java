package Academia.FYP.backend.controller;

import Academia.FYP.backend.model.exam.Question;
import Academia.FYP.backend.model.exam.Quiz;
import Academia.FYP.backend.service.QuestionService;
import Academia.FYP.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

//    update the question
    @PutMapping("/")
    public ResponseEntity<Question> update(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

// get all question of any quiz
//    passing quiz id

    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestionsofQuiz(@PathVariable("qid") Long qid){
        Quiz quiz= this.quizService.getQuiz(qid);
        Set<Question> questions = quiz.getQuestions();
        List list=new ArrayList(questions);
        if(list.size()>Integer.parseInt(quiz.getNumberOfQuestions())){
            list=list.subList(0,Integer.parseInt(quiz.getNumberOfQuestions()+1));
        }
        Collections.shuffle(list);
        return ResponseEntity.ok(list);



//        Quiz quiz = new Quiz();
//        quiz.setQid(qid);
//        Set<Question>questionsOfQuiz= this.questionService.getQuestionOfQuiz(quiz);
//        return ResponseEntity.ok(questionsOfQuiz);
    }
    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsofQuizAdmin(@PathVariable("qid") Long qid){
        Quiz quiz = new Quiz();
        quiz.setQid(qid);
        Set<Question>questionsOfQuiz= this.questionService.getQuestionOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);
//        return ResponseEntity.ok(list);




    }
//    get single question
    @GetMapping("/{quesId}")
    public Question get(@PathVariable("quesId") Long quesId){
        return this.questionService.getQuestion(quesId);
    }
    @DeleteMapping("/{quesId}")
    public void delete(@PathVariable("quesId") Long quesId){
        this.questionService.deleteQuestion(quesId);
    }
}
