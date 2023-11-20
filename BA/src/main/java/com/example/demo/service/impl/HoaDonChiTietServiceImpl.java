package com.example.demo.service.impl;

import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.repository.HoaDonChiTietRepository;
import com.example.demo.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class HoaDonChiTietServiceImpl implements HoaDonChiTietService {

    @Autowired
    private HoaDonChiTietRepository repository;

    @Override
    public List<HoaDonChiTiet> getAll(UUID id) {
        return repository.getAll(id);
    }

    @Override
    public List<HoaDonChiTiet> getAllByIdHD(UUID id) {
        return repository.getAllByIdHD(id);
    }

    @Override
    public List<HoaDonChiTiet> findAll() {
        return repository.findAll();
    }

    @Override
    public HoaDonChiTiet add(HoaDonChiTiet hoaDonChiTiet) {
        return repository.save(hoaDonChiTiet);
    }

    @Override
    public void taoHoaDon(List<HoaDonChiTiet> hoaDonChiTiet) {
        repository.saveAll(hoaDonChiTiet);
    }

    @Override
    public void delete(UUID id) {
        repository.deleteById(id);
    }

    @Override
    public void deleteByIdHD(UUID id) {
        repository.delete(id);
    }

    @Override
    public void update(Integer soLuong, UUID id) {
        repository.update(soLuong, id);
    }

    @Override
    public void updateSL(Integer soLuong, UUID id) {
        repository.updateSL(soLuong, id);
    }


    @Override
    public List<HoaDonChiTiet> existsById(ChiTietSanPham chiTietSanPham, HoaDon hoaDon) {
        return repository.existsById(chiTietSanPham, hoaDon);
    }

    @Override
    public HoaDonChiTiet findById(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void updateSLDH(Integer soLuong, UUID id) {
        repository.updateSLHD(soLuong,id);
    }

    @Override
    public void updateSLHL(Integer soLuong, UUID id) {
        repository.updateSLHL(soLuong,id);
    }

    @Override
    public void updateHL( String ghiChu,String nguoiTao, UUID id) {
        repository.updateHL(ghiChu,nguoiTao,id);
    }
}
