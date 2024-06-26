package Academia.FYP.backend.controller;

import Academia.FYP.backend.model.JwtRequest;
import Academia.FYP.backend.model.JwtResponse;
import Academia.FYP.backend.model.User;
import Academia.FYP.backend.repository.UserRepository;
import Academia.FYP.backend.service.AuthenticationService;
import Academia.FYP.backend.service.JwtService;
import Academia.FYP.backend.service.UserDetailsServiceImp;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class AuthenticationController {
  @Autowired
  private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;
    @Autowired
    UserRepository repository;
    @Autowired
    AuthenticationService service;

    @Autowired
    private UserDetailsServiceImp userDetailsServiceImp;

    @PostMapping("generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
            String token = service.authenticate(jwtRequest);
            return ResponseEntity.ok(new JwtResponse(token));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }
        //
//
//        try{
//            authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
//
//        }catch(UsernameNotFoundException e){
//            e.printStackTrace();
//            throw new Exception("User not found");
//        }
////        authincate
//        User user = repository.findByUsername(jwtRequest.getUsername()).orElseThrow();
//        String token = jwtService.generateToken(user);
//
//
//        return ResponseEntity.ok(new JwtResponse(token));
    }
//    private void authenticate(String username, String password) throws Exception {
//
//        try{
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));
//        }catch (DisabledException e){
//            throw new Exception("USER DISABLED"+e.getMessage());
//        }catch(BadCredentialsException e){
//            throw new Exception("Invalid Credentials"+e.getMessage());
//        }
//
//    }

//    returns the details of current user
    @GetMapping("/current-user")
    public User getCurrentUser(Principal principal){
        return (User) this.userDetailsServiceImp.loadUserByUsername(principal.getName());
    }
    @GetMapping("activate-account")
    public void confirm(@RequestParam String token) throws MessagingException {

        service.activateAccount(token);
    }

//


//
//    @PostMapping("/register")
//    public ResponseEntity<AuthenticationResponse> register(
//            @RequestBody User request
//    ) {
//        return ResponseEntity.ok(authService.register(request));
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<AuthenticationResponse> login(
//            @RequestBody JwtRequest request
//    ) {
//        return ResponseEntity.ok(authService.authenticate(request));
//    }
}
