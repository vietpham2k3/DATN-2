package com.example.demo.repository;

import com.example.demo.entity.HinhThucThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface HinhThucThanhToanRespository extends JpaRepository<HinhThucThanhToan, UUID> {
}
