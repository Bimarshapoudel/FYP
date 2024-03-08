package Academia.FYP.backend.model.exam;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity

@Getter
@Setter
@Table(name="category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cid;
    private String title;
    private String description;
    @OneToMany(mappedBy = "category",fetch = FetchType.EAGER,cascade=CascadeType.ALL)
    @JsonIgnore
    private Set<Quiz> quizzes=new LinkedHashSet<>();


    public Category() {
    }

    public Category(String title, String description) {
        this.title = title;
        this.description = description;
    }
}
