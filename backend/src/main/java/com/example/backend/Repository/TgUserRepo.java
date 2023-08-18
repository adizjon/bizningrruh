package com.example.backend.Repository;

import com.example.backend.Entity.TgUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TgUserRepo extends JpaRepository<TgUser, Long> {
}
