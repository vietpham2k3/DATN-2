package com.example.demo.repository;


import com.example.demo.entity.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MauSacRepository extends JpaRepository<MauSac, UUID> {

    @Query(value = "SELECT * FROM MauSac \n" +
            "WHERE ((:key IS NULL OR ma LIKE CONCAT('%', :key, '%'))\n" +
            "      OR (:key IS NULL OR ten LIKE CONCAT('%', :key , '%')))\n" +
            "      AND (:trangThai IS NULL OR trang_thai = :trangThai)", nativeQuery = true)
    Page<MauSac> searchPageMS(@Param("key") String key,
                              @Param("trangThai") Integer trangThai,
                              Pageable pageable);

    @Query(value = "select c from MauSac c where c.trangThai = 0")
    List<MauSac> getAll();

    MauSac findByTen(String ten);
}
