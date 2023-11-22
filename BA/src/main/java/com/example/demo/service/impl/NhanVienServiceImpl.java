package com.example.demo.service.impl;

import com.example.demo.entity.NhanVien;
import com.example.demo.repository.NhanVienRepository;
import com.example.demo.service.NhanVienService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.sql.rowset.serial.SerialBlob;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NhanVienServiceImpl implements NhanVienService {

    @Autowired
    private NhanVienRepository nvRepository;

    @Override
    public Page<NhanVien> getAll(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return nvRepository.findAll(pageable);
    }

    @Override
    public Page<NhanVien> searchNhanVienPage(String key, Integer trangThai, Pageable pageable) {
        return nvRepository.searchNhanVien(key, trangThai, pageable);
    }

    @Override
    public List<NhanVien> fillAll() {
        return nvRepository.findAll();
    }

    @Override
    public NhanVien getOne(UUID id) {
        return nvRepository.findById(id).orElse(null);
    }

    @Override
    public NhanVien add(NhanVien nhanVien) {
        return nvRepository.save(nhanVien);
    }

//    .id(nhanVien.getId())
//            .ma(nhanVien.getMa())
//            .ten(nhanVien.getTen())
//            .sdt(nhanVien.getSdt())
//            .email(nhanVien.getEmail())
//            .diaChi(nhanVien.getDiaChi())
//            .ngaySinh(nhanVien.getNgaySinh())
//            .ngayTao(nhanVien.getNgayTao())
//            .ngaySua(nhanVien.getNgaySua())
//            .nguoiTao(nhanVien.getNguoiTao())
//            .nguoiSua(nhanVien.getNguoiSua())
//            .matKhau(nhanVien.getMatKhau())
//            .vaiTro(VaiTro.builder().id(nhanVien.getId()).build())
//            .trangThai(nhanVien.getTrangThai())

    @Override
    public NhanVien update(NhanVien nhanVien, UUID id) {
        Optional<NhanVien> op = nvRepository.findById(id);
//        VaiTro vaiTro = vaiTroRepository.findById(id).orElse(null);
        return op.map(o -> {
            o.setMa(nhanVien.getMa());
            o.setTen(nhanVien.getTen());
            o.setSdt(nhanVien.getSdt());
            o.setEmail(nhanVien.getEmail());
            o.setDiaChi(nhanVien.getDiaChi());
            o.setNgaySinh(nhanVien.getNgaySinh());
            o.setNgayTao(nhanVien.getNgayTao());
            o.setNgaySua(nhanVien.getNgaySua());
            o.setNguoiTao(nhanVien.getNguoiTao());
            o.setNguoiSua(nhanVien.getNguoiSua());
            o.setMatKhau(nhanVien.getMatKhau());
            o.setVaiTro(nhanVien.getVaiTro());
            o.setTrangThai(nhanVien.getTrangThai());
            return nvRepository.save(o);
        }).orElse(null);
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        nvRepository.update(id);
    }

    @Override
    public NhanVien findKhachHangByEmailAndMatKhau(String email, String matKhau) {
        return nvRepository.findNhanVienByEmailAndMatKhau(email, matKhau);
    }
}
