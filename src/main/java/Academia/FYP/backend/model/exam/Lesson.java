package Academia.FYP.backend.model.exam;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  Long lid;

    @Column(length = 5000)
    private String description;
    private String title;
   @ManyToOne(fetch = FetchType.EAGER)
    private Category category;
}
