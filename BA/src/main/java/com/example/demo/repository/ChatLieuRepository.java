package com.example.demo.repository;

import com.example.demo.entity.ChatLieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface ChatLieuRepository extends JpaRepository<ChatLieu, UUID> {
    @Query(value = "select c from ChatLieu c where c.trangThai = 0")
    List<ChatLieu> getAll();

    @Query(value = "SELECT * FROM ChatLieu\n" +
            "WHERE ((ma is null or ma LIKE lower(CONCAT('%', ?1, '%')))\n" +
            "or (ten is null or ten LIKE lower(CONCAT('%', ?1, '%'))))\n" +
            "and (trang_thai is null or trang_thai LIKE lower(CONCAT('%', ?2, '%')))", nativeQuery = true)
    Page<ChatLieu> searchPageMS(@Param("key") String key,
                                @Param("trangThai") Integer trangThai,
                                Pageable pageable);

    ChatLieu findByTen(String ten);

}
