package com.example.demo.response;

import java.util.Date;
import java.util.UUID;

public interface HoaDonCustom {
    UUID getid();
    String getma();
    String getten_nguoi_nhan();
    Date getngay_tao();
    Integer gettong_so_luong();
    Double gettong_tien();
    Integer gettrang_thai();
    Integer getloai_don();
}
