package com.example.demo.repository;

import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDon_KhuyenMai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HoaDon_KhuyenMaiRepository extends JpaRepository<HoaDon_KhuyenMai, UUID> {

    @Query(value = "select h from HoaDon_KhuyenMai h where h.hoaDon.id = :id")
    List<HoaDon_KhuyenMai> getAll(UUID id);

    @Query(value = "select h from HoaDon_KhuyenMai h where h.khuyenMai.ma = :khuyenMai and h.hoaDon = :hoaDon ")
    List<HoaDon_KhuyenMai> existsById(String khuyenMai, HoaDon hoaDon);

}
