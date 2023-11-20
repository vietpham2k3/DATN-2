package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "ChatLieu")
public class ChatLieu {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;
    @Column(name = "ma")
    private String ma;
    @Column(name = "ten")
    private String ten;
    @Column(name = "trang_thai")
    private Integer trangThai;
    @Column(name = "ngay_tao")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date ngayTao;
    @Column(name = "ngay_sua")
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private Date ngaySua;

}
