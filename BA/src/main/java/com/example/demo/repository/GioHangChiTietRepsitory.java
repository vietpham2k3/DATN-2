package com.example.demo.repository;

import com.example.demo.entity.GioHangChiTiet;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GioHangChiTietRepsitory extends JpaRepository<GioHangChiTiet, UUID> {

    @Query(value = "SELECT SUM(so_luong) FROM GioHangChiTiet WHERE id_gh IS NULL OR CONVERT(NVARCHAR(36), id_gh) = :id", nativeQuery = true)
    Integer countSPOnGH(UUID id);

    @Query(value = "SELECT gh FROM GioHangChiTiet gh WHERE gh.gioHang.id = :id")
    List<GioHangChiTiet> getAll(UUID id);

    @Transactional
    @Modifying
    @Query(value = "update GioHangChiTiet c set c.soLuong = :soLuong  where c.id = :id")
    void updateSL(Integer soLuong, UUID id);

    @Transactional
    @Modifying
    @Query(value = "delete from GioHangChiTiet c where c.gioHang.id = :id")
    void deleteAll(UUID id);
}
