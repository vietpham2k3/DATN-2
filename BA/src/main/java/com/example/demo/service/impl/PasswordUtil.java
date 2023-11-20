package com.example.demo.service.impl;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Formatter;

public class PasswordUtil {

        public static String hashPassword(String password) {
            try {
                MessageDigest md = MessageDigest.getInstance("SHA-256");
                md.update(password.getBytes());

                byte[] byteData = md.digest();

                Formatter formatter = new Formatter();
                for (byte b : byteData) {
                    formatter.format("%02x", b);
                }

                return formatter.toString();
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
                return null;
            }
        }
    }


