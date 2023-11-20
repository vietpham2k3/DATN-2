package com.example.demo.service.impl;

import com.example.demo.dto.FilterProductClient;
import com.example.demo.dto.response.ProductDetailClientRespose;
import com.example.demo.entity.Anh;
import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.repository.ChiTietSanPhamRepository;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ChiTietSanPhamServiceImpl implements ChiTietSanPhamService {

    @Autowired
    private ChiTietSanPhamRepository repository;

    @Autowired
    private MauSacService mauSacService;

    @Autowired
    private ChatLieuService chatLieuService;

    @Autowired
    private KichCoService kichCoService;

    @Autowired
    private LoaiSanPhamService loaiSanPhamService;

    @Autowired
    private NhaSanXuatService nhaSanXuatService;

    @Override
    public List<ChiTietSanPham> getAll() {
        return repository.getAll();
    }

    @Override
    public List<ChiTietSanPham> getAllByIdSP(UUID id) {
        return repository.getAllByIdSP(id);
    }

    @Override
    public List<ChiTietSanPham> getAllByIdSPTT(UUID id) {
        return repository.getAllByIdSPTT(id);
    }

    @Override
    public List<String> getAllMSByIdSP(UUID id) {
        return repository.getAllMSByIdSP(id);
    }

    @Override
    public List<ChiTietSanPham> updateAll(List<ChiTietSanPham> chiTietSanPham) {
        return repository.saveAll(chiTietSanPham);
    }

    @Override
    public List<String> getKCByIdMSAndIdSP(UUID idMS, UUID idSP) {
        return repository.getKCByIdMSAndIdSP(idMS, idSP);
    }

    @Override
    public List<Anh> findAnhByIdMSAndIdSP(UUID idSP, UUID idMS) {
        return repository.findAnhByIdMSAndIdSP(idSP, idMS);
    }

    @Override
    public List<ChiTietSanPham> getAllSPNEW() {
        return repository.getAllSPNew();
    }

    @Override
    public Page<ChiTietSanPham> page(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return repository.getAll(pageable);
    }

    @Override
    public List<ChiTietSanPham> getAllBestseller() {
        return repository.getAllBestseller();
    }

    @Override
    public List<ChiTietSanPham> detailByIdSP(UUID id) {
        return repository.detailByIdSP(id);
    }


    @Override
    public List<ChiTietSanPham> getAllProduct() {
        return repository.getAllProduct();
    }

    @Override
    public Page<ChiTietSanPham> search(
            String key,
            Integer trangThai,
            Double min,
            Double max,
            List<String> mauSac,
            List<String> chatLieu,
            List<String> loaiSanPham,
            List<String> nhaSanXuat,
            Integer page
    ) {
        Pageable pageable = PageRequest.of(page, 5);
        return repository.search(key, trangThai, min, max, mauSac, chatLieu, loaiSanPham, nhaSanXuat, pageable);
    }


    @Override
    public ChiTietSanPham add(ChiTietSanPham chiTietSanPham) {
        return repository.save(chiTietSanPham);
    }

    @Override
    public ChiTietSanPham detail(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void delete(UUID id) {
        repository.delete(id);
    }

    @Override
    public void deleteMSKC(UUID id) {
        repository.deleteMSKC(id);
    }

    @Override
    public void update(Integer soLuong, UUID id) {
        repository.update(soLuong, id);
    }

    @Override
    public Page<ChiTietSanPham> pageWeb(Integer page) {
        Pageable pageable = PageRequest.of(page, 15);
        return repository.getAll(pageable);
    }

    @Override
    public ChiTietSanPham findID(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Page<ChiTietSanPham> filter(FilterProductClient filterProductClient, int page) {
        if (filterProductClient == null) {
            return null;
        }
        Pageable pageable = PageRequest.of(page, 15);

        List<ProductDetailClientRespose> chiTietSanPhams = repository.filter(filterProductClient);
        List<ChiTietSanPham> ctsps = new ArrayList<>();

        chiTietSanPhams.forEach((ctsp) -> {
            ctsps.add(findID(ctsp.getId()));
        });

        List<ChiTietSanPham> filteredCtsps = new ArrayList<>();
        ctsps.forEach((ctsp -> {
            if (!checkExist(ctsp, filteredCtsps)) {
                filteredCtsps.add(ctsp);
            }
        }));

        Page<ChiTietSanPham> pageSp = new PageImpl<>(filteredCtsps, pageable, filteredCtsps.size());
        return pageSp;
    }

    @Override
    public Page<ChiTietSanPham> searchMaAndTen(String key, Integer page) {
        Pageable pageable = PageRequest.of(page, 15);
        return repository.searchMaAndTen(key, pageable);
    }

    private boolean checkExist(ChiTietSanPham chiTietSanPham, List<ChiTietSanPham> list) {
        for (ChiTietSanPham ctsp : list) {
            if (chiTietSanPham.getSanPham().getId().equals(ctsp.getSanPham().getId())) {
                return true;
            }
        }
        return false;
    }
}
