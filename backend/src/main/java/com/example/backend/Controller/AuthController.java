package com.example.backend.Controller;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Payload.LoginReq;
import com.example.backend.Security.JwtServices;
import com.example.backend.Service.AuthService.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    private final AuthService service;

    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody UserDTO dto) {
        return service.login(dto);
    }

    @PostMapping("/register")
    public HttpEntity<?> register(@RequestBody LoginReq dto) {
        return service.register(dto);
    }

    @PostMapping("/refresh")
    public HttpEntity<?> refreshUser(@RequestParam String refreshToken) {
        return service.refreshToken(refreshToken);
    }
    @GetMapping("/getMe")
    public HttpEntity<?> getMe(@RequestParam(defaultValue = "") String accessToken){
        return service.getMe(accessToken);
    }

}
