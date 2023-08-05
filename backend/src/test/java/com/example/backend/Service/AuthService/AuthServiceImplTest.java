package com.example.backend.Service.AuthService;

import com.example.backend.DTO.ResUser;
import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.RoleEnum;
import com.example.backend.Entity.User;
import com.example.backend.Payload.LoginReq;
import com.example.backend.Repository.RoleRepo;
import com.example.backend.Repository.UserRepo;
import com.example.backend.Security.JwtServices;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class AuthServiceImplTest {

    @Mock
    private UserRepo usersRepository;
    @Mock
    private RoleRepo roleRepo;
    @Mock
    private JwtServices jwtServices;
    @Mock
    private UserDetailsService userDetailsService;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private AuthenticationConfiguration authenticationConfiguration;
    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthServiceImpl authService;

    @Test
    void testRegister() throws Exception {
        // Given
        LoginReq loginReq = new LoginReq("testUser", "testPassword","testPassword");

        // Mock the necessary dependencies
        Role roleUser = new Role(1, RoleEnum.ROLE_USER);
        when(roleRepo.findAllByName("ROLE_USER")).thenReturn(Collections.singletonList(roleUser));
        when(usersRepository.save(any())).thenReturn(new User(UUID.randomUUID().toString(), "testUser", "testPassword", Collections.singletonList(roleUser)));

        UserDetails userDetails = new org.springframework.security.core.userdetails.User("testUser", "testPassword", Collections.emptyList());
        when(userDetailsService.loadUserByUsername("testUser")).thenReturn(userDetails);


        // When
        ResponseEntity<?> response = (ResponseEntity<?>) authService.register(loginReq);

        // Then
        // Add assertions for the response entity and its contents
        // For example:
        // assert response.getStatusCode() == HttpStatus.OK;
        // assert response.getBody() instanceof String; // Assuming that your token is a string

        // Additional verifications
        verify(usersRepository, times(1)).save(any());
        verify(authenticationManager, times(1)).authenticate(any());
        verify(jwtServices, times(1)).getSigningKey();
    }


    @Test
    void testLogin() {
        UserDTO userDTO = new UserDTO("testPhone", "testPassword", false);
        Role roleUser = new Role(1, RoleEnum.ROLE_USER);
        List<Role> roles = List.of(roleUser);
        User user = new User(UUID.randomUUID().toString(), "testUser", "testPassword", roles);
        String access_token = "access_token";
        String refresh_token = "refresh_token";

        when(authenticationManager.authenticate(any())).thenReturn(null);
        when(usersRepository.findByPhone("testPhone")).thenReturn(java.util.Optional.of(user));
        when(roleRepo.findAll()).thenReturn(roles);
        when(jwtServices.generateJwtToken(user)).thenReturn(access_token);
        when(jwtServices.generateJwtRefreshToken(user)).thenReturn(refresh_token);

        ResponseEntity<?> response = (ResponseEntity<?>) authService.login(userDTO);

        verify(authenticationManager, times(1)).authenticate(any());
        verify(usersRepository, times(1)).findByPhone("testPhone");
        verify(jwtServices, times(1)).generateJwtToken(user);
        verify(jwtServices, times(1)).generateJwtRefreshToken(user);

        // Add further assertions on the response entity if needed
        // For example: assert response.getStatusCode() == HttpStatus.OK;
    }

    @Test
    void testRefreshToken() {
        String refreshToken = "testRefreshToken";
        User user = new User(UUID.randomUUID().toString(), "testUser", "testPassword", new ArrayList<>());
        String access_token = "access_token";

        when(jwtServices.extractSubjectFromJwt(refreshToken)).thenReturn(user.getId().toString());
        when(usersRepository.findById(any())).thenReturn(java.util.Optional.of(user));
        when(jwtServices.generateJwtToken(user)).thenReturn(access_token);

        ResponseEntity<?> response = (ResponseEntity<?>) authService.refreshToken(refreshToken);

        verify(jwtServices, times(1)).extractSubjectFromJwt(refreshToken);
        verify(usersRepository, times(1)).findById(any());
        verify(jwtServices, times(1)).generateJwtToken(user);

        // Add further assertions on the response entity if needed
        // For example: assert response.getStatusCode() == HttpStatus.OK;
    }

    @Test
    void testDecodeValidToken() {
        String token = "testToken";
        User user = new User(UUID.randomUUID().toString(), "testUser", "testPassword", new ArrayList<>());

        when(jwtServices.validateToken(token)).thenReturn(true);
        when(jwtServices.extractSubjectFromJwt(token)).thenReturn(user.getId().toString());
        when(usersRepository.findById(any())).thenReturn(java.util.Optional.of(user));

        ResponseEntity<?> response = (ResponseEntity<?>) authService.decode(token);

        verify(jwtServices, times(1)).validateToken(token);
        verify(jwtServices, times(1)).extractSubjectFromJwt(token);
        verify(usersRepository, times(1)).findById(any());

        // Add further assertions on the response entity if needed
        // For example: assert response.getStatusCode() == HttpStatus.OK;
    }

    @Test
    void testDecodeExpiredToken() {
        String token = "testExpiredToken";

        when(jwtServices.validateToken(token)).thenReturn(false);

        ResponseEntity<?> response = (ResponseEntity<?>) authService.decode(token);

        verify(jwtServices, times(1)).validateToken(token);
        verify(usersRepository, never()).findById(any());

        // Add further assertions on the response entity if needed
        // For example: assert response.getStatusCode() == HttpStatus.OK;
    }

    @Test
    void testGetMeAsUser() {
        String accessToken = "testAccessToken";
        UUID userId = UUID.randomUUID();
        User user = new User(userId.toString(), "testUser", "testPassword", List.of(new Role(1, RoleEnum.ROLE_USER)));

        when(jwtServices.extractSubjectFromJwt(accessToken)).thenReturn(userId.toString());
        when(usersRepository.findById(userId)).thenReturn(java.util.Optional.of(user));
        when(jwtServices.extractSubjectFromJwt(accessToken)).thenReturn("testAccess");
        when(jwtServices.extractSubjectFromJwt(accessToken)).thenReturn("333aae7133c19eda8f7f61ce07e64281c295df67681b1ed47c9c270a488f94d0");

        ResponseEntity<?> response = (ResponseEntity<?>) authService.getMe(accessToken);

        verify(jwtServices, times(3)).extractSubjectFromJwt(accessToken);
        verify(usersRepository, times(1)).findById(userId);

        // Add further assertions on the response entity if needed
        // For example: assert response.getStatusCode() == HttpStatus.OK;
    }

    @Test
    void testGetMeAsAdmin() {
        String accessToken = "testAccessToken";
        UUID userId = UUID.randomUUID();
        User user = new User(userId.toString(), "testUser", "testPassword", List.of(new Role(2, RoleEnum.ROLE_SUPER_ADMIN)));

        when(jwtServices.extractSubjectFromJwt(accessToken)).thenReturn(userId.toString());
        when(usersRepository.findById(userId)).thenReturn(java.util.Optional.of(user));
        when(jwtServices.extractSubjectFromJwt(accessToken)).thenReturn("testAccess");
        when(jwtServices.extractSubjectFromJwt(accessToken)).thenReturn("333aae7133c19eda8f7f61ce07e64281c295df67681");
    }}