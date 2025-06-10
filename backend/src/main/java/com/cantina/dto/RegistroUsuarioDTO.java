package com.cantina.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistroUsuarioDTO {
    private String nome;
    private String sobrenome;
    private String email;
    private String senha;
} 