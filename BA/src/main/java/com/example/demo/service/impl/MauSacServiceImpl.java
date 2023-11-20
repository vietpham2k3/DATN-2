package com.example.demo.service.impl;

import com.example.demo.entity.MauSac;
import com.example.demo.repository.MauSacRepository;
import com.example.demo.service.MauSacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class MauSacServiceImpl implements MauSacService {
    @Autowired public MauSacRepository res;

    @Override
    public List<MauSac> getAllMS(){
        return res.getAll();
    }

    @Override
    public Page<MauSac> pageMS(Pageable pageable){
        return res.findAll(pageable);
    }

    @Override
    public Page<MauSac> pageSearchMS(String key,Integer trangThai,Pageable pageable){
        return res.searchPageMS(key,trangThai,pageable);
    }

    @Override
    public MauSac add(MauSac mauSac){
        return res.save(mauSac);
    }

    @Override
    public MauSac detail(UUID id){
        return res.findById(id).orElse(null);
    }

    @Override
    public MauSac xoa(UUID id){
        MauSac mauSac = res.findById(id).orElse(null);
        mauSac.setTrangThai(1);
        mauSac.setNgaySua(new Date());
        mauSac.setNgayTao(mauSac.getNgayTao());
        mauSac.setTen(mauSac.getMa());
        return res.save(mauSac);
    }

    @Override
    public List<MauSac> findByListString(List<String> msacString) {
        List<MauSac> mauSacs = new ArrayList<>();
        for (String msac: msacString) {
            MauSac m = res.findByTen(msac);
            mauSacs.add(m);
        }
        return mauSacs;
    }


}
