package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class FilterProductClient {

    private Double giaBanMin;

    private Double giaBanMax;

    private List<String> listChatLieu;

    private List<String> listSize;

    private List<String> listMau;

    private List<String> listLoaiSanPham;

    private List<String> listCoAo;

    private List<String> listNhaSanXuat;


}
