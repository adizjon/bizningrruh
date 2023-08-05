package com.example.backend.Service.AuthService;

import com.example.backend.DTO.ApiResponse;
import com.example.backend.DTO.ResUser;
import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.RoleEnum;
import com.example.backend.Entity.User;
import com.example.backend.Payload.LoginReq;
import com.example.backend.Repository.RoleRepo;
import com.example.backend.Repository.UserRepo;
import com.example.backend.Security.JwtServices;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepo usersRepository;
    private final RoleRepo roleRepo;
    private final JwtServices jwtServices;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final AuthenticationManager authenticationManager;

    @SneakyThrows
    @Override
    public HttpEntity<?> register(LoginReq dto) {
        List<Role> roles = new ArrayList<>();
        List<Role> roleUser = roleRepo.findAllByName("ROLE_USER");
        if (roleUser == null) {
            roles.add(roleRepo.save(new Role(0, RoleEnum.ROLE_USER)));
        } else {
            roles.add(roleUser.get(0));
        }
        User user = new User(
                null,
                dto.getUsername(),
                dto.getPassword(),
                roles
        );
        usersRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(dto.getUsername());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                dto.getPassword(),
                userDetails.getAuthorities()
        );

        authenticationConfiguration.getAuthenticationManager().authenticate(authenticationToken);

        String token = Jwts
                .builder()
                .setIssuer(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(jwtServices.getSigningKey())
                .compact();
        return ResponseEntity.ok(token);
    }

    @Override
    public HttpEntity<?> login(UserDTO dto) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getPhone(), dto.getPassword()));
            User users = usersRepository.findByPhone(dto.getPhone()).orElseThrow(() -> new RuntimeException("Cannot find User With Id:" + dto.getPhone()));
            List<Role> roles = roleRepo.findAll();
            String access_token = jwtServices.generateJwtToken(users);
            String refresh_token = jwtServices.generateJwtRefreshToken(users);
            Map<String, Object> map = new HashMap<>();
            map.put("access_token", access_token);
            map.put("refresh_token", refresh_token);
            return returningProcess(dto, access_token, map);
        } catch (BadCredentialsException e) {
            return ResponseEntity.ok("BAD_CREDENTIALS");
        }

    }

    private ResponseEntity<String> getStringResponseEntity(UserDTO dto) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getPhone(), dto.getPassword()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.ok("BAD_CREDENTIALS");
        }
        ;
        return null;
    }

    private static ResponseEntity<?> returningProcess(UserDTO dto, String access_token, Map<String, Object> map) {
        if (dto.isRememberMe()) {
            return ResponseEntity.ok(map);
        } else {
            return ResponseEntity.ok(access_token);
        }
    }

    @Override
    public HttpEntity<?> refreshToken(String refreshToken) {
        String id = jwtServices.extractSubjectFromJwt(refreshToken);
        User users = usersRepository.findById(UUID.fromString(id)).orElseThrow();
        String access_token = jwtServices.generateJwtToken(users);
        return ResponseEntity.ok(access_token);
    }

    @Override
    public HttpEntity<?> decode(String token) {
        boolean isExpired = jwtServices.validateToken(token);
        User user = null;
        if (isExpired) {
            String userId = jwtServices.extractSubjectFromJwt(token);
            user = usersRepository.findById(UUID.fromString(userId)).orElseThrow(() -> new RuntimeException("Cannot find User With Id:" + userId));
        }
        return ResponseEntity.ok(user);
    }

    @Override
    public HttpEntity<?> getMe(String accessToken) {

        try {
            if (Objects.equals(jwtServices.extractSubjectFromJwt(accessToken), "sdsdsd")) {
                return ResponseEntity.ok(
                        new ApiResponse(
                                false,
                                "Hello User",
                                null
                        )
                );
            }
            UUID id = UUID.fromString(jwtServices.extractSubjectFromJwt(accessToken));
            User user = usersRepository.findById(id).orElseThrow();
            for (GrantedAuthority authority : user.getAuthorities()) {
                if (authority.getAuthority().equals(RoleEnum.ROLE_SUPER_ADMIN.toString())) {
                    return ResponseEntity.ok(new ApiResponse(
                            true, "Hello Admin",
                            new ResUser(
                                    user.getId(),
                                    user.getPhone(),
                                    user.getPassword(),
                                    user.getRoles()
                            )
                    ));
                }
            }

            if (jwtServices.extractSubjectFromJwt(accessToken).equals("333aae7133c19eda8f7f61ce07e64281c295df67681b1ed47c9c270a488f94d0")) {
                return ResponseEntity.ok(
                        new ApiResponse(
                                false,
                                "Hello User",
                                new ResUser(
                                        user.getId(),
                                        user.getPhone(),
                                        user.getPassword(),
                                        user.getRoles()
                                )
                        )
                );
            }
        } catch (Exception e) {
            return null;
        }
        UUID id = UUID.fromString(jwtServices.extractSubjectFromJwt(accessToken));
        User user = usersRepository.findById(id).orElseThrow();
        for (GrantedAuthority authority : user.getAuthorities()) {
            if (authority.getAuthority().equals(RoleEnum.ROLE_SUPER_ADMIN.toString())) {
                return ResponseEntity.ok(new ApiResponse(
                        true, "Hello Admin", new ResUser(
                        user.getId(),
                        user.getPhone(),
                        user.getPassword(),
                        user.getRoles()
                )
                ));
            }
        }

        return ResponseEntity.ok(
                new ApiResponse(
                        false,
                        "Hello User",
                        new ResUser(
                                user.getId(),
                                user.getPhone(),
                                user.getPassword(),
                                user.getRoles()
                        )
                )
        );
    }
}
