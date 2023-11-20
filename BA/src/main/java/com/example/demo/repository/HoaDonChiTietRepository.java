package com.example.demo.repository;

import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDonChiTiet;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet, UUID> {

    @Query(value = "SELECT h.*\n" +
            "FROM HoaDonChiTiet h\n" +
            "WHERE " +
            "id_hl IS NULL \n" +
            "AND so_luong_hang_doi IS NULL\n" +
            "AND id_hd = :id\n", nativeQuery = true)
    List<HoaDonChiTiet> getAll(UUID id);

    @Query(value = "SELECT h.*\n" +
            "FROM HoaDonChiTiet h\n" +
            "WHERE " +
            "id_hl IS NULL \n" +
            "AND so_luong IS NULL\n" +
            "AND id_hd = :id\n", nativeQuery = true)
    List<HoaDonChiTiet> getAllHD(UUID id);

    @Query(value = "SELECT h.*\n" +
            "FROM HoaDonChiTiet h\n" +
            "WHERE " +
            "id_hd = :id\n", nativeQuery = true)
    List<HoaDonChiTiet> getAllByIdHD(UUID id);


    @Query(value = "SELECT *\n" +
            "FROM HoaDonChiTiet\n" +
            "WHERE id_hd = :id\n" +
            "  AND id_th IS NOT NULL;", nativeQuery = true)
    List<HoaDonChiTiet> getAllByIdHDAndIdTH(UUID id);

    @Query(value = "SELECT *\n" +
            "            FROM HoaDonChiTiet\n" +
            "            WHERE id_hd = :id\n" +
            "\t\t\t  AND so_luong_yeu_cau_doi IS NOT NULL" +
            " AND so_luong_yeu_cau_doi > 0", nativeQuery = true)
    List<HoaDonChiTiet> getAllByIdHDAndIdTHAndSLYCD(UUID id);

    @Query(value = "SELECT *\n" +
            "FROM HoaDonChiTiet\n" +
            "WHERE id_hd = :id\n" +
            "  AND id_hl IS NOT NULL;", nativeQuery = true)
    List<HoaDonChiTiet> getAllByIdHDAndIdHL(UUID id);


    @Query(value = "select h from HoaDonChiTiet h where h.chiTietSanPham = :chiTietSanPham and h.hoaDon = :hoaDon ")
    List<HoaDonChiTiet> existsById(ChiTietSanPham chiTietSanPham, HoaDon hoaDon);

    @Transactional
    @Modifying
    @Query(value = "update HoaDonChiTiet c set c.soLuong = c.soLuong + :soLuong  where c.id = :id")
    void update(Integer soLuong, UUID id);

    @Transactional
    @Modifying
    @Query(value = "update HoaDonChiTiet c set c.soLuong = :soLuong  where c.id = :id")
    void updateSL(Integer soLuong, UUID id);

    @Transactional
    @Modifying
    @Query(value = "delete from LichSuHoaDon \n" +
            "where LichSuHoaDon.id_hd = :id " +
            "delete from HoaDon_KhuyenMai \n" +
            "where HoaDon_KhuyenMai.id_hd = :id\n" +
            "delete from HoaDonChiTiet\n" +
            "where HoaDonChiTiet.id_hd = :id\n" +
            "delete from HoaDon\n" +
            "where id = :id", nativeQuery = true)
    void delete(UUID id);

    @Transactional
    @Modifying
    @Query(value = "update HoaDonChiTiet c set c.soLuongHangDoi = :soLuongHangDoi  where c.id = :id")
    void updateSLHD(@Param("soLuongHangDoi") Integer soLuongHangDoi, UUID id);

    @Transactional
    @Modifying
    @Query(value = "update HoaDonChiTiet c set c.soLuongHangLoi = :soLuongHangLoi where c.id = :id")
    void updateSLHL(@Param("soLuongHangLoi") Integer soLuongHangLoi, UUID id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE HangLoi\n" +
            "SET ghi_chu = :ghiChu, nguoi_tao = :nguoiTao\n" +
            "WHERE id IN (SELECT id_hl FROM HoaDonChiTiet WHERE id = :id);",nativeQuery = true)
    void updateHL(@Param("ghiChu") String ghiChu, @Param("nguoiTao") String nguoiTao,UUID id);
}
