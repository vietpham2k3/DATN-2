package com.example.demo.repository;

import com.example.demo.entity.KhachHang;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, UUID> {
    @Transactional
    @Modifying
    @Query(value = "update KhachHang kh set kh.trangThai = 0 where kh.id = :id")
    void delete(UUID id);

    @Query(value = "SELECT * FROM KhachHang\n" +
            "WHERE ((ma is null or ma LIKE lower(CONCAT('%', ?1, '%')))\n" +
            "or (ten is null or ten LIKE lower(CONCAT('%', ?1, '%')))\n" +
            "or (sdt is null or sdt LIKE lower(CONCAT('%', ?1, '%')))\n" +
            "or (email is null or email LIKE lower(CONCAT('%', ?1, '%'))))\n" +
            "and (trang_thai is null or trang_thai LIKE lower(CONCAT('%', ?2, '%')))\n" +
            "and(gioi_tinh is null or gioi_tinh LIKE lower(CONCAT('%', ?3 , '%')))", nativeQuery = true)
    Page<KhachHang> searchKH(
            @Param("key") String key,
            @Param("trangThai") Integer trangThai,
            @Param("gioiTinh") Boolean gioiTinh,
            Pageable pageable
    );

    @Query(value = "SELECT kh.id, kh.ma, kh.ten, kh.sdt, kh.email, kh.ngay_sinh,kh.gioi_tinh, kh.trang_thai FROM KhachHang kh", nativeQuery = true)
    Page<KhachHang> pageKH(Pageable pageable);


    @Query(value = "SELECT * " +
            "  FROM KhachHang WHERE trang_thai = 1 ORDER BY ma", nativeQuery = true)
    List<KhachHang> getAllKH();

    @Query(value = "SELECT * FROM KhachHang WHERE trang_thai = 1 AND" +
            " id = :id ", nativeQuery = true)
    KhachHang getAllKHById(UUID id);

    @Query(value = "SELECT * FROM KhachHang WHERE trang_thai = 1 " +
            "AND ((:key is null or ma LIKE lower(CONCAT('%', :key, '%'))) " +
            "or (:key is null or ten LIKE lower(CONCAT('%', :key, '%'))) " +
            "or (:key is null or sdt LIKE lower(CONCAT('%', :key, '%'))) " +
            "or (:key is null or email LIKE lower(CONCAT('%', :key, '%')))) " +
            "ORDER BY ma", nativeQuery = true)
    List<KhachHang> searchKHinBH(@Param("key") String key);

    @Query(value = "SELECT kh FROM KhachHang kh WHERE kh.email = :email AND" +
            " kh.matKhau = :matKhau ")
    KhachHang findKhachHangByEmailAndMatKhau(String email, String matKhau);

    @Query("select kh from KhachHang kh where kh.email = :email")
    KhachHang findByEmail(@Param("email") String email);


    @Modifying
    @Transactional
    @Query("UPDATE KhachHang kh SET kh.matKhau = ?1 WHERE kh.email = ?2")
    void updatePasswordByEmail(String newPassword, String email);



}
