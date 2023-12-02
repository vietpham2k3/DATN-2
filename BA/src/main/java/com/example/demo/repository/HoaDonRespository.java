package com.example.demo.repository;

import com.example.demo.entity.HoaDon;
import com.example.demo.response.HoaDonCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface HoaDonRespository extends JpaRepository<HoaDon, UUID> {

    @Query(value = "SELECT HD.id, HD.ma, HD.ten_nguoi_nhan, HD.ngay_tao, SUM(HDCT.so_luong) AS tong_so_luong,\n" +
            "SUM(HDCT.so_luong * HDCT.don_gia) as tong_tien, HD.trang_thai, HD.loai_don\n" +
            "FROM HoaDon HD\n" +
            "JOIN HoaDonChiTiet HDCT ON HD.id = HDCT.id_hd\n" +
            "GROUP BY HD.id, HD.ma, HD.ten_nguoi_nhan, HD.ngay_tao, HD.tong_tien, HD.trang_thai, HD.loai_don\n" +
            "ORDER BY HD.ngay_tao DESC",
            nativeQuery = true)
    public Page<HoaDonCustom> hienThiPageHD(Pageable pageable);

    @Query(value = "SELECT hd.*, hdct.id as idHDCT, hdct.id_ctsp, hdct.id_hd, hdct.don_gia, hdct.so_luong\n" +
            "FROM HoaDon HD\n" +
            "JOIN HoaDonChiTiet HDCT ON HD.id = HDCT.id_hd\n" +
            "WHERE HD.trang_thai in :trangThai \n" +
            "and hd.id_kh = :idKH \n" +
            "and loai_don = 1\n" +
            "ORDER BY HD.ngay_sua DESC",
            nativeQuery = true)
    List<HoaDon> searchByTrangThai(@Param("trangThai") Integer[] trangThai, @Param("idKH") UUID idKH);

    @Query(value = "SELECT HD.id, HD.ma, HD.ten_nguoi_nhan, HD.ngay_tao, \n" +
            "       SUM(HDCT.so_luong) AS tong_so_luong,\n" +
            "       SUM(HDCT.so_luong * HDCT.don_gia) as tong_tien, \n" +
            "       HD.trang_thai, HD.loai_don\n" +
            "FROM HoaDon HD\n" +
            "JOIN HoaDonChiTiet HDCT ON HD.id = HDCT.id_hd\n" +
            "WHERE ((:key IS NULL OR HD.ma LIKE CONCAT('%', :key, '%')) \n" +
            "       OR (:key IS NULL OR HD.ten_nguoi_nhan LIKE CONCAT('%', :key, '%')))\n" +
            "       AND (:tuNgay IS NULL OR HD.ngay_tao >= :tuNgay) \n" +
            "       AND (:denNgay IS NULL OR HD.ngay_tao <= :denNgay) \n" +
            "       AND (:trangThai IS NULL OR HD.trang_thai = :trangThai) \n" +
            "       AND (:loaiDon IS NULL OR HD.loai_don = :loaiDon)\n" +
            "GROUP BY HD.id, HD.ma, HD.ten_nguoi_nhan, HD.ngay_tao, HD.trang_thai, HD.loai_don\n" +
            "HAVING ((:minSL IS NULL OR SUM(HDCT.so_luong) >= :minSL) \n" +
            "       AND (:maxSL IS NULL OR SUM(HDCT.so_luong) <= :maxSL)) \n" +
            "       AND ((:minTT IS NULL OR SUM(HDCT.so_luong * HDCT.don_gia) >= :minTT) \n" +
            "       AND (:maxTT IS NULL OR SUM(HDCT.so_luong * HDCT.don_gia) <= :maxTT))\n" +
            "\t   ORDER BY HD.ngay_tao DESC",
            nativeQuery = true)
    public Page<HoaDonCustom> findVIP(@Param("key") String key,
                                      @Param("tuNgay") Date tuNgay,
                                      @Param("denNgay") Date denNgay,
                                      @Param("trangThai") Integer trangThai,
                                      @Param("loaiDon") Integer loaiDon,
                                      @Param("minSL") Double minSL,
                                      @Param("maxSL") Double maxSL,
                                      @Param("minTT") Double minTT,
                                      @Param("maxTT") Double maxTT,
                                      Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "UPDATE HoaDon SET ten_nguoi_nhan = :tenNguoiNhan, \n" +
            "            sdt = :soDienThoai, dia_chi = :diaChi, tinh = :tinh," +
            " huyen = :huyen, xa = :xa ,ngay_sua = GETDATE(),tong_tien = :tongTien," +
            " tong_tien_sau_khi_giam = :tongTienKhiGiam," +
            "tien_ship = :tienShip WHERE id = :id", nativeQuery = true)
    public void updateHD(UUID id, String tenNguoiNhan, String soDienThoai,
                         String diaChi, String tinh,
                         String huyen, String xa, Double tongTien,
                         Double tongTienKhiGiam, Double tienShip);

    @Query(value = "select h from HoaDon h where h.trangThai = 0 and h.loaiDon = 0")
    List<HoaDon> getAllHD();

    @Query(value = "SELECT\n" +
            "  DH.ma,\n" +
            "  ISNULL(DH.tong_tien_hang_doi, '') as tong_tien_hang_doi,\n" +
            "  ISNULL(DH.so_hang_doi, '') as so_hang_doi,\n" +
            "  ISNULL(DH.trang_thai, '') as trang_thai,\n" +
            "  ISNULL(DH.ngay_tao, '') as ngay_tao,\n" +
            "  ISNULL(DH.nguoi_tao, '') as nguoi_tao,\n" +
            "  ISNULL(DH.ghi_chu, '') as ghi_chu\n" +
            "FROM\n" +
            "  DoiHang DH\n" +
            "JOIN\n" +
            "  HoaDonChiTiet HDCT ON DH.id = HDCT.id_th\n" +
            "WHERE id_hd = :idHD", nativeQuery = true)
    List<String> doiHang(@Param("idHD") UUID idHD);

    @Query(value = "SELECT\n" +
            "  DH.ma,\n" +
            "  ISNULL(DH.tong_tien_hang_doi, '') as tong_tien_hang_doi,\n" +
            "  ISNULL(DH.so_hang_doi, '') as so_hang_doi,\n" +
            "  ISNULL(DH.trang_thai, '') as trang_thai,\n" +
            "  ISNULL(DH.ngay_tao, '') as ngay_tao,\n" +
            "  ISNULL(DH.nguoi_tao, '') as nguoi_tao,\n" +
            "  ISNULL(DH.ghi_chu, '') as ghi_chu\n" +
            "FROM\n" +
            "  DoiHang DH\n" +
            "JOIN\n" +
            "  HoaDonChiTiet HDCT ON DH.id = HDCT.id_th\n" +
            "WHERE id_hd = :idHD \n" +
            "\t\t\t  AND so_luong_yeu_cau_doi IS NOT NULL", nativeQuery = true)
    List<String> doiHangYC(@Param("idHD") UUID idHD);

    @Query(value = "SELECT\n" +
            "    COALESCE(SUM(HD.tong_tien_sau_khi_giam), 0) AS doanh_thu_ngay_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            " WHERE\n" +
            "    (\n" +
            "      (DAY(HD.ngay_thanh_toan) = DAY(GETDATE()) AND\n" +
            "       MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "       YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 4 AND\n" +
            "       HD.loai_don = 0)\n" +
            "    )\n" +
            "    OR\n" +
            "    (\n" +
            "      (DAY(HD.ngay_thanh_toan) = DAY(GETDATE()) AND\n" +
            "       MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "       YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 4 AND\n" +
            "       HD.loai_don = 1)\n" +
            "    )", nativeQuery = true)
    public Double doanhThuTongNgayCurrent();

    @Query(value = "SELECT\n" +
            "    COALESCE(SUM(HD.tong_tien_sau_khi_giam), 0) AS doanh_thu_ngay_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            "WHERE\n" +
            "    DAY(HD.ngay_thanh_toan) = DAY(GETDATE())AND\n" +
            "\t MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "\t YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "    AND HD.trang_thai = 4\n" +
            "\tAND HD.loai_don = 0", nativeQuery = true)
    public Double doanhThuTaiQuayNgayCurrent();

    @Query(value = "SELECT\n" +
            "    COALESCE(SUM(HD.tong_tien_sau_khi_giam), 0) AS doanh_thu_ngay_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            "WHERE\n" +
            "    DAY(HD.ngay_thanh_toan) = DAY(GETDATE())AND\n" +
            "\t MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "\t YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "    AND HD.trang_thai = 4\n" +
            "\tAND HD.loai_don = 1", nativeQuery = true)
    public Double doanhThuOnlineNgayCurrent();

    @Query(value = "SELECT\n" +
            "    COALESCE(SUM(HD.tong_tien_sau_khi_giam), 0) AS doanh_thu_ngay_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            " WHERE\n" +
            "    (\n" +
            "      (MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "       YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 4 AND\n" +
            "       HD.loai_don = 0)\n" +
            "    )\n" +
            "    OR\n" +
            "    (\n" +
            "      (MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "       YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 4 AND\n" +
            "       HD.loai_don = 1)\n" +
            "    )", nativeQuery = true)
    public Double doanhThuTongThangCurrent();

    @Query(value = "SELECT\n" +
            "    SUM(HD.tong_tien_sau_khi_giam) AS doanh_thu_thang_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            "WHERE\n" +
            "    MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "\t YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "\tAND HD.trang_thai = 4\n" +
            "\tAND HD.loai_don = 0", nativeQuery = true)
    public Double doanhThuTaiQuayThangCurrent();

    @Query(value = "SELECT\n" +
            "    SUM(HD.tong_tien_sau_khi_giam) AS doanh_thu_thang_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            "WHERE\n" +
            "    MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "\t YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "\tAND HD.trang_thai = 4\n" +
            "\tAND HD.loai_don = 1", nativeQuery = true)
    public Double doanhThuOnlineThangCurrent();

    @Query(value = "SELECT\n" +
            "    COALESCE(SUM(HD.tong_tien_sau_khi_giam), 0) AS doanh_thu_ngay_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            " WHERE\n" +
            "      ( YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 4 )\n"
            , nativeQuery = true)
    public Double doanhThuTongNamCurrent();

    @Query(value = "SELECT\n" +
            "    SUM(HD.tong_tien_sau_khi_giam) AS doanh_thu_nam_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            "WHERE\n" +
            "    YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "\t\tAND HD.trang_thai = 4\n" +
            "\t\tAND HD.loai_don = 0", nativeQuery = true)
    public Double doanhThuTaiquayNamCurrent();

    @Query(value = "SELECT\n" +
            "    SUM(HD.tong_tien_sau_khi_giam) AS doanh_thu_nam_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            "WHERE\n" +
            "    YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "\t\tAND HD.trang_thai = 4\n" +
            "\t\tAND HD.loai_don = 1", nativeQuery = true)
    public Double doanhThuOnlineNamCurrent();

    @Query(value = "SELECT COALESCE(COUNT(*), 0) AS so_don_ngay\n" +
            "            FROM HoaDon HD WHERE\n" +
            "                DAY(HD.ngay_thanh_toan) = DAY(GETDATE())AND\n" +
            "             MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "            YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "              AND HD.trang_thai = 2", nativeQuery = true)
    public Integer soDonHuyNgay();

    @Query(value = "SELECT COALESCE(COUNT(*), 0) AS so_don_ngay\n" +
            "            FROM HoaDon HD WHERE\n" +
            "                DAY(HD.ngay_thanh_toan) = DAY(GETDATE())AND\n" +
            "             MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "            YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "              AND HD.trang_thai = 0", nativeQuery = true)
    public Integer soDonChoXacNhanNgay();

    @Query(value = "\tSELECT COALESCE(COUNT(*), 0) AS so_don_ngay\n" +
            "FROM HoaDon HD\n" +
            "WHERE\n" +
            "    (\n" +
            "        (DAY(HD.ngay_thanh_toan) = DAY(GETDATE()) AND\n" +
            "         MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "         YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "         HD.trang_thai = 4 AND\n" +
            "         HD.loai_don = 0)\n" +
            "    )\n" +
            "    OR\n" +
            "    (\n" +
            "        (DAY(HD.ngay_thanh_toan) = DAY(GETDATE()) AND\n" +
            "         MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "         YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "         HD.trang_thai = 4 AND\n" +
            "         HD.loai_don = 1)\n" +
            "    );", nativeQuery = true)
    public Integer soDonThanhCongNgay();

    @Query(value = "SELECT COALESCE(COUNT(*), 0) AS so_don_thang\n" +
            "            FROM HoaDon HD WHERE\n" +
            "             MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "            YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "              AND HD.trang_thai = 2", nativeQuery = true)
    public Integer soDonHuyThang();

    @Query(value = "SELECT COALESCE(COUNT(*), 0) AS so_don_thang\n" +
            "            FROM HoaDon HD WHERE\n" +
            "             MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "            YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "              AND HD.trang_thai = 1", nativeQuery = true)
    public Integer soDonTraThang();

    @Query(value = "SELECT COALESCE(COUNT(*), 0) AS so_don_thang\n" +
            "            FROM HoaDon HD WHERE\n" +
            "             MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "            YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "              AND HD.trang_thai = 0", nativeQuery = true)
    public Integer soDonChoXacNhanThang();

    @Query(value = "\tSELECT COALESCE(COUNT(*), 0) AS so_don_ngay\n" +
            "FROM HoaDon HD\n" +
            "WHERE\n" +
            "    (\n" +
            "        (MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "         YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "         HD.trang_thai = 4 AND\n" +
            "         HD.loai_don = 0)\n" +
            "    )\n" +
            "    OR\n" +
            "    (\n" +
            "        (MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "         YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "         HD.trang_thai = 4 AND\n" +
            "         HD.loai_don = 1)\n" +
            "    );", nativeQuery = true)
    public Integer soDonThanhCongThang();

    @Query(value = "SELECT COALESCE(COUNT(*), 0) AS so_don_nam\n" +
            "            FROM HoaDon HD WHERE\n" +
            "            YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "              AND HD.trang_thai = 2", nativeQuery = true)
    public Integer soDonHuyNam();

    @Query(value = "SELECT COALESCE(COUNT(*), 0) AS so_don_nam\n" +
            "            FROM HoaDon HD WHERE\n" +
            "            YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "              AND HD.trang_thai = 16", nativeQuery = true)
    public Integer soDonTraNam();

    @Query(value = "SELECT COALESCE(COUNT(*), 0) AS so_don_nam\n" +
            "            FROM HoaDon HD WHERE\n" +
            "            YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "              AND HD.trang_thai = 0", nativeQuery = true)
    public Integer soDonChoXacNhanNam();

    @Query(value = "\tSELECT COALESCE(COUNT(*), 0) AS so_don_ngay\n" +
            "FROM HoaDon HD\n" +
            "WHERE\n" +
            "    (\n" +
            "        (YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "         HD.trang_thai = 4 AND\n" +
            "         HD.loai_don = 0)\n" +
            "    )\n" +
            "    OR\n" +
            "    (\n" +
            "        (YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "         HD.trang_thai = 4 AND\n" +
            "         HD.loai_don = 1)\n" +
            "    );", nativeQuery = true)
    public Integer soDonThanhCongNam();

    @Query(value = "SELECT SP.ten AS san_pham_ten,\n" +
            "       SUM(CASE\n" +
            "             WHEN (\n" +
            "               (DAY(HD.ngay_thanh_toan) = DAY(GETDATE()) AND\n" +
            "                MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "                YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "                HD.trang_thai = 4 AND\n" +
            "                HD.loai_don = 0)\n" +
            "             ) THEN HDCT.so_luong\n" +
            "             WHEN (\n" +
            "               (DAY(HD.ngay_thanh_toan) = DAY(GETDATE()) AND\n" +
            "                MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "                YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "                HD.trang_thai = 4 AND\n" +
            "                HD.loai_don = 1)\n" +
            "             ) THEN HDCT.so_luong\n" +
            "             ELSE 0\n" +
            "           END) AS so_luong_sp_dh\n" +
            "FROM SanPham SP\n" +
            "LEFT JOIN ChiTietSanPham CTSP ON CTSP.id_sp = SP.id\n" +
            "LEFT JOIN HoaDonChiTiet HDCT ON HDCT.id_ctsp = CTSP.id\n" +
            "LEFT JOIN HoaDon HD ON HD.id = HDCT.id_hd\n" +
            "GROUP BY SP.ten\n" +
            "ORDER BY so_luong_sp_dh DESC", nativeQuery = true)
    public List<String> sanPhamBanChayTrongNgay();

    @Query(value = "SELECT SP.ten AS san_pham_ten,\n" +
            "       SUM(CASE\n" +
            "             WHEN (\n" +
            "               (MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "                YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "                HD.trang_thai = 4 AND\n" +
            "                HD.loai_don = 0)\n" +
            "             ) THEN HDCT.so_luong\n" +
            "             WHEN (\n" +
            "               (MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "                YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "                HD.trang_thai = 4 AND\n" +
            "                HD.loai_don = 1)\n" +
            "             ) THEN HDCT.so_luong\n" +
            "             ELSE 0\n" +
            "           END) AS so_luong_sp_dh\n" +
            "FROM SanPham SP\n" +
            "LEFT JOIN ChiTietSanPham CTSP ON CTSP.id_sp = SP.id\n" +
            "LEFT JOIN HoaDonChiTiet HDCT ON HDCT.id_ctsp = CTSP.id\n" +
            "LEFT JOIN HoaDon HD ON HD.id = HDCT.id_hd\n" +
            "GROUP BY SP.ten\n" +
            "ORDER BY so_luong_sp_dh DESC", nativeQuery = true)
    public List<String> sanPhamBanChayTrongThang();

    @Query(value = "SELECT SP.ten AS san_pham_ten,\n" +
            "       SUM(CASE\n" +
            "             WHEN (\n" +
            "               (YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "                HD.trang_thai = 4 AND\n" +
            "                HD.loai_don = 0)\n" +
            "             ) THEN HDCT.so_luong\n" +
            "             WHEN (\n" +
            "               (YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "                HD.trang_thai = 4 AND\n" +
            "                HD.loai_don = 1)\n" +
            "             ) THEN HDCT.so_luong\n" +
            "             ELSE 0\n" +
            "           END) AS so_luong_sp_dh\n" +
            "FROM SanPham SP\n" +
            "LEFT JOIN ChiTietSanPham CTSP ON CTSP.id_sp = SP.id\n" +
            "LEFT JOIN HoaDonChiTiet HDCT ON HDCT.id_ctsp = CTSP.id\n" +
            "LEFT JOIN HoaDon HD ON HD.id = HDCT.id_hd\n" +
            "GROUP BY SP.ten\n" +
            "ORDER BY so_luong_sp_dh DESC", nativeQuery = true)
    public List<String> sanPhamBanChayTrongNam();

    @Query(value = "SELECT\n" +
            "    SP.ten AS san_pham_ten,\n" +
            "    SUM(\n" +
            "        CASE\n" +
            "            WHEN (\n" +
            "                DAY(HD.ngay_thanh_toan) = DAY(GETDATE())\n" +
            "                AND MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE())\n" +
            "                AND YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "                AND HD.trang_thai = 4\n" +
            "                AND HD.loai_don = 0\n" +
            "            ) THEN HDCT.so_luong\n" +
            "            WHEN (\n" +
            "                DAY(HD.ngay_thanh_toan) = DAY(GETDATE())\n" +
            "                AND MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE())\n" +
            "                AND YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "                AND HD.trang_thai = 4\n" +
            "                AND HD.loai_don = 1\n" +
            "            ) THEN HDCT.so_luong\n" +
            "            ELSE 0\n" +
            "        END\n" +
            "    ) AS so_luong_sp_dh\n" +
            "FROM SanPham SP\n" +
            "LEFT JOIN ChiTietSanPham CTSP ON CTSP.id_sp = SP.id\n" +
            "LEFT JOIN HoaDonChiTiet HDCT ON HDCT.id_ctsp = CTSP.id\n" +
            "LEFT JOIN HoaDon HD ON HD.id = HDCT.id_hd\n" +
            "WHERE (:key IS NULL OR SP.ten LIKE CONCAT('%', :key, '%'))\n" +
            "GROUP BY SP.ten\n" +
            "ORDER BY so_luong_sp_dh DESC\n", nativeQuery = true)
    public List<String> sanPhamBanChayTrongNgaySearchTenSP(@Param("key") String key);

    @Query(value = "SELECT\n" +
            "    SP.ten AS san_pham_ten,\n" +
            "    SUM(\n" +
            "        CASE\n" +
            "            WHEN (MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE())\n" +
            "                AND YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "                AND HD.trang_thai = 4\n" +
            "                AND HD.loai_don = 0\n" +
            "            ) THEN HDCT.so_luong\n" +
            "            WHEN (MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE())\n" +
            "                AND YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "                AND HD.trang_thai = 4\n" +
            "                AND HD.loai_don = 1\n" +
            "            ) THEN HDCT.so_luong\n" +
            "            ELSE 0\n" +
            "        END\n" +
            "    ) AS so_luong_sp_dh\n" +
            "FROM SanPham SP\n" +
            "LEFT JOIN ChiTietSanPham CTSP ON CTSP.id_sp = SP.id\n" +
            "LEFT JOIN HoaDonChiTiet HDCT ON HDCT.id_ctsp = CTSP.id\n" +
            "LEFT JOIN HoaDon HD ON HD.id = HDCT.id_hd\n" +
            "WHERE (:key IS NULL OR SP.ten LIKE CONCAT('%', :key, '%'))\n" +
            "GROUP BY SP.ten\n" +
            "ORDER BY so_luong_sp_dh DESC\n", nativeQuery = true)
    public List<String> sanPhamBanChayTrongThangSearchTenSP(@Param("key") String key);

    @Query(value = "SELECT\n" +
            "    SP.ten AS san_pham_ten,\n" +
            "    SUM(\n" +
            "        CASE\n" +
            "            WHEN (YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "                AND HD.trang_thai = 4\n" +
            "                AND HD.loai_don = 0\n" +
            "            ) THEN HDCT.so_luong\n" +
            "            WHEN (YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "                AND HD.trang_thai = 4\n" +
            "                AND HD.loai_don = 1\n" +
            "            ) THEN HDCT.so_luong\n" +
            "            ELSE 0\n" +
            "        END\n" +
            "    ) AS so_luong_sp_dh\n" +
            "FROM SanPham SP\n" +
            "LEFT JOIN ChiTietSanPham CTSP ON CTSP.id_sp = SP.id\n" +
            "LEFT JOIN HoaDonChiTiet HDCT ON HDCT.id_ctsp = CTSP.id\n" +
            "LEFT JOIN HoaDon HD ON HD.id = HDCT.id_hd\n" +
            "WHERE (:key IS NULL OR SP.ten LIKE CONCAT('%', :key, '%'))\n" +
            "GROUP BY SP.ten\n" +
            "ORDER BY so_luong_sp_dh DESC\n", nativeQuery = true)
    public List<String> sanPhamBanChayTrongNamSearchTenSP(@Param("key") String key);

    @Query(value = "SELECT\n" +
            "    COALESCE(SUM(CASE WHEN HD.trang_thai = 6 AND HD.loai_don = 0 THEN HD.tong_tien_sau_khi_giam ELSE 0 END), 0) AS tong_doanh_thu_tai_quay,\n" +
            "    COALESCE(SUM(CASE WHEN HD.trang_thai = 4 AND HD.loai_don = 1 THEN HD.tong_tien_sau_khi_giam ELSE 0 END), 0) AS tong_doanh_thu_online,\n" +
            "    COALESCE(SUM(CASE WHEN (HD.trang_thai = 6 AND HD.loai_don = 0) OR (HD.trang_thai = 4 AND HD.loai_don = 1) THEN HD.tong_tien_sau_khi_giam ELSE 0 END), 0) AS tong_doanh_thu_ngay\n" +
            "FROM HoaDon HD\n" +
            " WHERE\n" +
            "    (\n" +
            "      (DAY(HD.ngay_thanh_toan) = DAY(GETDATE()) AND\n" +
            "       MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "       YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 6 AND\n" +
            "       HD.loai_don = 0)\n" +
            "    )\n" +
            "    OR\n" +
            "    (\n" +
            "      (DAY(HD.ngay_thanh_toan) = DAY(GETDATE()) AND\n" +
            "       MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "       YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 4 AND\n" +
            "       HD.loai_don = 1)\n" +
            "    )", nativeQuery = true)
    public String[] doanhThuAllNgay();

    @Query(value = "SELECT\n" +
            "    COALESCE(SUM(CASE WHEN HD.trang_thai = 4 AND HD.loai_don = 0 THEN HD.tong_tien_sau_khi_giam ELSE 0 END), 0) AS tong_doanh_thu_tai_quay,\n" +
            "    COALESCE(SUM(CASE WHEN HD.trang_thai = 4 AND HD.loai_don = 1 THEN HD.tong_tien_sau_khi_giam ELSE 0 END), 0) AS tong_doanh_thu_online,\n" +
            "    COALESCE(SUM(CASE WHEN (HD.trang_thai = 4 AND HD.loai_don = 0) OR (HD.trang_thai = 4 AND HD.loai_don = 1) THEN HD.tong_tien_sau_khi_giam ELSE 0 END), 0) AS tong_doanh_thu_ngay\n" +
            "FROM HoaDon HD\n" +
            " WHERE\n" +
            "    (\n" +
            "      (MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "       YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 4 AND\n" +
            "       HD.loai_don = 0)\n" +
            "    )\n" +
            "    OR\n" +
            "    (\n" +
            "      (MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "       YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 4 AND\n" +
            "       HD.loai_don = 1)\n" +
            "    )", nativeQuery = true)
    public String[] doanhThuAllThang();

    @Query(value = "SELECT\n" +
            "    COALESCE(SUM(CASE WHEN HD.trang_thai = 6 AND HD.loai_don = 0 THEN HD.tong_tien_sau_khi_giam ELSE 0 END), 0) AS tong_doanh_thu_tai_quay,\n" +
            "    COALESCE(SUM(CASE WHEN HD.trang_thai = 4 AND HD.loai_don = 1 THEN HD.tong_tien_sau_khi_giam ELSE 0 END), 0) AS tong_doanh_thu_online,\n" +
            "    COALESCE(SUM(CASE WHEN (HD.trang_thai = 6 AND HD.loai_don = 0) OR (HD.trang_thai = 4 AND HD.loai_don = 1) THEN HD.tong_tien_sau_khi_giam ELSE 0 END), 0) AS tong_doanh_thu_ngay\n" +
            "FROM HoaDon HD\n" +
            " WHERE\n" +
            "    (\n" +
            "      (YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 6 AND\n" +
            "       HD.loai_don = 0)\n" +
            "    )\n" +
            "    OR\n" +
            "    (\n" +
            "      (YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 4 AND\n" +
            "       HD.loai_don = 1)\n" +
            "    )", nativeQuery = true)
    public String[] doanhThuAllNam();

    @Query(value = "WITH Thang_Mac_Dinh AS (\n" +
            "    SELECT 1 AS thang\n" +
            "    UNION SELECT 2\n" +
            "    UNION SELECT 3\n" +
            "    UNION SELECT 4\n" +
            "    UNION SELECT 5\n" +
            "    UNION SELECT 6\n" +
            "    UNION SELECT 7\n" +
            "    UNION SELECT 8\n" +
            "    UNION SELECT 9\n" +
            "    UNION SELECT 10\n" +
            "    UNION SELECT 11\n" +
            "    UNION SELECT 12\n" +
            ")\n" +
            "\n" +
            "SELECT\n" +
            "    CONCAT('Tháng ', CAST(Thang_Mac_Dinh.thang AS NVARCHAR)) AS thang,\n" +
            "    COALESCE(SUM(HD.tong_tien_sau_khi_giam), 0) AS doanh_thu_thang\n" +
            "FROM\n" +
            "    Thang_Mac_Dinh\n" +
            "LEFT JOIN\n" +
            "    HoaDon HD ON Thang_Mac_Dinh.thang = MONTH(HD.ngay_thanh_toan)\n" +
            "            AND YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "            AND (\n" +
            "                (HD.trang_thai = 6 AND HD.loai_don = 0)\n" +
            "                OR\n" +
            "                (HD.trang_thai = 4 AND HD.loai_don = 1)\n" +
            "            )\n" +
            "GROUP BY\n" +
            "    Thang_Mac_Dinh.thang\n" +
            "ORDER BY\n" +
            "    Thang_Mac_Dinh.thang", nativeQuery = true)
    public List<String> bieuDoNam();

    @Query(value = "\tWITH Gio_Mac_Dinh AS (\n" +
            "    SELECT 0 AS gio\n" +
            "    UNION SELECT 1\n" +
            "    UNION SELECT 2\n" +
            "    UNION SELECT 3\n" +
            "    UNION SELECT 4\n" +
            "    UNION SELECT 5\n" +
            "    UNION SELECT 6\n" +
            "    UNION SELECT 7\n" +
            "    UNION SELECT 8\n" +
            "    UNION SELECT 9\n" +
            "    UNION SELECT 10\n" +
            "    UNION SELECT 11\n" +
            "    UNION SELECT 12\n" +
            "    UNION SELECT 13\n" +
            "    UNION SELECT 14\n" +
            "    UNION SELECT 15\n" +
            "    UNION SELECT 16\n" +
            "    UNION SELECT 17\n" +
            "    UNION SELECT 18\n" +
            "    UNION SELECT 19\n" +
            "    UNION SELECT 20\n" +
            "    UNION SELECT 21\n" +
            "    UNION SELECT 22\n" +
            "    UNION SELECT 23\n" +
            ")\n" +
            "\n" +
            "SELECT\n" +
            "    CAST(Gio_Mac_Dinh.gio AS NVARCHAR) + 'H' AS gio,\n" +
            "    COALESCE(SUM(HD.tong_tien_sau_khi_giam), 0) AS doanh_thu_gio\n" +
            "FROM\n" +
            "    Gio_Mac_Dinh\n" +
            "LEFT JOIN\n" +
            "    HoaDon HD ON Gio_Mac_Dinh.gio = DATEPART(HOUR, HD.ngay_thanh_toan)\n" +
            "            AND CAST(HD.ngay_thanh_toan AS DATE) = CAST(GETDATE() AS DATE)\n" +
            "            AND (\n" +
            "                (HD.trang_thai = 6 AND HD.loai_don = 0)\n" +
            "                OR\n" +
            "                (HD.trang_thai = 4 AND HD.loai_don = 1)\n" +
            "            )\n" +
            "GROUP BY\n" +
            "    Gio_Mac_Dinh.gio\n" +
            "ORDER BY\n" +
            "    Gio_Mac_Dinh.gio;\n", nativeQuery = true)
    public List<String> bieuDoNgay();

    @Query(value = "DECLARE @StartDate DATE = DATEADD(DAY, 1, EOMONTH(GETDATE(), -1)); " +
            "DECLARE @EndDate DATE = EOMONTH(GETDATE()); \n" +
            "DECLARE @SoNgayTrongThang INT = DATEDIFF(DAY, @StartDate, @EndDate) + 1;\n" +
            "WITH Ngay_Mac_Dinh AS (\n" +
            "    SELECT DATEADD(DAY, number, @StartDate) AS ngay\n" +
            "    FROM master.dbo.spt_values\n" +
            "    WHERE type = 'P' AND number BETWEEN 0 AND @SoNgayTrongThang - 1\n" +
            ")\n" +
            "\n" +
            "SELECT\n" +
            "    'N' + CAST(ROW_NUMBER() OVER (ORDER BY Ngay_Mac_Dinh.ngay) AS NVARCHAR) AS ngay,\n" +
            "    COALESCE(SUM(HD.tong_tien_sau_khi_giam), 0) AS doanh_thu_ngay\n" +
            "FROM\n" +
            "    Ngay_Mac_Dinh\n" +
            "LEFT JOIN\n" +
            "    HoaDon HD ON CAST(HD.ngay_thanh_toan AS DATE) = CAST(Ngay_Mac_Dinh.ngay AS DATE)\n" +
            "            AND (\n" +
            "                (HD.trang_thai = 6 AND HD.loai_don = 0)\n" +
            "                OR\n" +
            "                (HD.trang_thai = 4 AND HD.loai_don = 1)\n" +
            "            )\n" +
            "GROUP BY\n" +
            "    Ngay_Mac_Dinh.ngay\n" +
            "ORDER BY\n" +
            "    Ngay_Mac_Dinh.ngay;", nativeQuery = true)
    public List<String> bieuDoThang();
}
