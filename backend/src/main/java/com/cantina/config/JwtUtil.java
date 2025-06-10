package com.cantina.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key chave = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final long expiracaoMillis = 1000 * 60 * 60 * 24; // 24 horas

    public String gerarToken(String nomeDeUsuario) {
        return Jwts.builder()
                .setSubject(nomeDeUsuario)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiracaoMillis))
                .signWith(chave)
                .compact();
    }

    public String obterNomeDeUsuario(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(chave)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validarToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(chave).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
