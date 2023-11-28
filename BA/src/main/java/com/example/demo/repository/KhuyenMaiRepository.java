package com.example.demo.repository;

import com.example.demo.entity.KhuyenMai;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai, UUID> {
    @Query(value = "SELECT * FROM KhuyenMai \n" +
            "WHERE ((:key IS NULL OR ma LIKE CONCAT('%', :key, '%'))\n" +
            "      OR (:key IS NULL OR ten LIKE CONCAT('%', :key , '%')))\n" +
            "      AND (:trangThai IS NULL OR trang_thai = :trangThai)", nativeQuery = true)
    Page<KhuyenMai> search(@Param("key") String key, Integer trangThai, Pageable pageable);

    @Query(value = "select k from KhuyenMai k where (k.trangThai = 0 or k.trangThai = 2)and k.tien <= :tien")
    List<KhuyenMai> getAll(Double tien);

    @Query(value = "select k from KhuyenMai k where k.trangThai = 0")
    List<KhuyenMai> getAll();

}
