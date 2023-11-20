package com.example.demo.schedule;

import com.example.demo.entity.KhuyenMai;
import com.example.demo.repository.KhuyenMaiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class ScheduleKhuyenMai {

    @Autowired
    private KhuyenMaiRepository kmRepo;

    @Scheduled(cron = "0 0 * * * *")// Chạy vào mỗi giờ
//    @Scheduled(cron = "*/15 * * * * *")// Chạy vào mỗi 15s
    public void updateVoucherStatus() {
        // Lấy thời gian hiện tại
        Date currentTime = new Date();
        List<KhuyenMai> listKhuyenMai = kmRepo.findAll();

        for (KhuyenMai voucher : listKhuyenMai) {
            if ((voucher.getThoiGianKetThuc().after(currentTime) || voucher.getThoiGianKetThuc().equals(currentTime)) &&
                    (voucher.getThoiGianBatDau().before(currentTime) || voucher.getThoiGianBatDau().equals(currentTime))) {
                voucher.setTrangThai(2);
                kmRepo.save(voucher);
                // Nếu thời gian kết thúc lớn hơn hoặc bằng thời gian hiện tại
                // và thời gian bắt đầu nhỏ hơn hoặc bằng thời gian hiện tại, set trạng thái là 2
            } else if (voucher.getThoiGianKetThuc().before(currentTime)) {
                voucher.setTrangThai(1);
                // Nếu thời gian kết thúc nhỏ hơn thời gian hiện tại, set trạng thái là 1
                kmRepo.save(voucher);
            }
        }
    }
}
