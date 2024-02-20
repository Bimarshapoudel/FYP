package Academia.FYP.backend.repository;

import Academia.FYP.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


    public interface UserRepository extends JpaRepository<User, Integer> {

        Optional<User> findByUsername(String username);
}
