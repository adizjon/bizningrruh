package com.example.backend.Repository;

import com.example.backend.Entity.RoleEnum;
import com.example.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepo extends JpaRepository<User, UUID> {
    Optional<User> findByPhone(String phone);

    List<User> findByRolesName(RoleEnum roleName);
}
