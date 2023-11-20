package com.example.demo.service.impl;

import com.example.demo.entity.LichSuHoaDon;
import com.example.demo.repository.LichSuHoaDonRepository;
import com.example.demo.service.LichSuHoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LichSuHoaDonServiceImpl implements LichSuHoaDonService {
    @Autowired private LichSuHoaDonRepository res;

    @Override
    public LichSuHoaDon createLichSuDonHang(LichSuHoaDon lichSuHoaDon) {
        return res.save(lichSuHoaDon);
    }

    @Override
    public List<LichSuHoaDon> createLichSuDonHangAll(List<LichSuHoaDon> lichSuHoaDonList) {
        return res.saveAll(lichSuHoaDonList);
    }

    @Override
    public List<LichSuHoaDon> getAll() {
        return res.findAll();
    }

    @Override
    public LichSuHoaDon detail(UUID id) {
        return res.findLichSuHoaDonById(id);
    }

    @Override
    public void delete(UUID id) {
        res.delete(id);
    }

    @Override
    public List<LichSuHoaDon> findAllLSHDByIDsHD(UUID id) {
        return res.findALLLichSuHoaDonByHoaDonId(id);
    }

    @Override
    public LichSuHoaDon findLSHDByIDsHD(UUID id) {
        return res.findLichSuHoaDonByHoaDonId(id);
    }

    @Override
    public LichSuHoaDon add(LichSuHoaDon lichSuHoaDon) {
        return res.save(lichSuHoaDon);
    }
}
