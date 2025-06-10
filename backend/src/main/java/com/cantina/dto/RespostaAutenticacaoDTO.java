package com.cantina.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RespostaAutenticacaoDTO {
    private String token;
    private String tipoToken;
    private String email;
    private String nome;
} 