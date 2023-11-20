package com.example.demo.repository;

import com.example.demo.entity.Anh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AnhRepository extends JpaRepository<Anh, UUID> {

    Anh findFirstByChiTietSanPhamId(UUID id);

    @Query("SELECT DISTINCT a FROM Anh a WHERE a.chiTietSanPham.id = :chiTietSanPhamId")
    List<Anh> findAllByChiTietSanPhamId(UUID chiTietSanPhamId);
}
