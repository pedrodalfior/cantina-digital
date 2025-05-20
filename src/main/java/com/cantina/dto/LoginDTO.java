package com.cantina.dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String nomeDeUsuarioOuEmail;
    private String senha;
}
