package com.example.demo.UploadFile;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.apache.commons.codec.binary.Base64;

import java.io.ByteArrayInputStream;
import java.io.IOException;

public class AnhKH extends JsonSerializer<ByteArrayInputStream> {

    @Override
    public void serialize(ByteArrayInputStream value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        byte[] bytes = value.readAllBytes();
        String base64Image = Base64.encodeBase64String(bytes);
        gen.writeString(base64Image);
    }
}
