package Academia.FYP.backend.model.exam;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long quesId;
    @Column(length = 5000)
    private String content;
    private String image;
    private String Option1;
    private String Option2;
    private String Option3;
    private String Option4;


    private String answer;
    @Transient
    private String givenAnswer;

    @ManyToOne(fetch = FetchType.EAGER)
    private Quiz quiz;

    public Question() {
    }

    public Question(String content, String image, String option1, String option2, String option3, String option4, String answer, Quiz quiz) {
        this.content = content;
        this.image = image;
        Option1 = option1;
        Option2 = option2;
        Option3 = option3;
        Option4 = option4;
        this.answer = answer;
        this.quiz = quiz;
    }

    public String getAnswer(){return answer;}

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
