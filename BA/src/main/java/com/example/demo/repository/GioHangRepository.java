package com.example.demo.repository;

import com.example.demo.entity.GioHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GioHangRepository extends JpaRepository<GioHang, UUID> {

    @Query(value = "select gh from GioHang gh where gh.khachHang.id = :id")
    GioHang getAll(UUID id);

}
