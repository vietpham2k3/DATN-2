package com.example.demo.repository;

import com.example.demo.entity.NhanVien;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NhanVienRepository extends JpaRepository<NhanVien, UUID> {

    @Query(value = "SELECT * FROM NhanVien \n" +
            "WHERE ((ma is null or ma LIKE lower(CONCAT('%', ?1, '%')))\n" +
            "or (ten is null or ten LIKE lower(CONCAT('%', ?1, '%')))\n" +
            "or (sdt is null or sdt LIKE lower(CONCAT('%', ?1, '%')))\n" +
            "or (email is null or email LIKE lower(CONCAT('%', ?1, '%'))))\n" +
            "and (trang_thai is null or trang_thai LIKE lower(CONCAT('%', ?2, '%')))", nativeQuery = true)
    Page<NhanVien> searchNhanVien(
            @Param("key") String key,
            @Param("trangThai") Integer trangThai,
            Pageable pageable
    );

    @Modifying
    @Query(value = "UPDATE NhanVien SET trang_thai = 1 WHERE id = :id", nativeQuery = true)
    void update(@Param("id") UUID id);

    @Query(value = "SELECT kh FROM NhanVien kh WHERE kh.email = :email AND" +
            " kh.matKhau = :matKhau ")
    NhanVien findNhanVienByEmailAndMatKhau(String email, String matKhau);

}
