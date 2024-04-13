package Academia.FYP.backend.model.exam;

import Academia.FYP.backend.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne( cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "category_id", referencedColumnName = "cid")
    private Category category;

    public Enrollment(User user, Category category) {
        this.user=user;
        this.category=category;
    }
}
