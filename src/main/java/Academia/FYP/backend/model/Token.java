package Academia.FYP.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String token;
    private LocalDateTime createdAt;

    private LocalDateTime expiresAt;

    private LocalDateTime validateAt;
    @ManyToOne( cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name="userId",nullable = false)
    private User user;

}
