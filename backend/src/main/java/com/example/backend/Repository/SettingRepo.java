package com.example.backend.Repository;

import com.example.backend.Entity.SettingPanel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SettingRepo extends JpaRepository<SettingPanel, UUID> {

}
