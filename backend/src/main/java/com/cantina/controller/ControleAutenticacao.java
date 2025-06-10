package com.cantina.controller;

import com.cantina.dto.LoginDTO;
import com.cantina.dto.RegistroUsuarioDTO;
import com.cantina.dto.RespostaAutenticacaoDTO;
import com.cantina.service.ServicoAutenticacao;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ControleAutenticacao {

    private final ServicoAutenticacao servicoAutenticacao;

    @PostMapping("/registrar")
    public ResponseEntity<Void> registrar(@RequestBody RegistroUsuarioDTO registroDTO) {
        servicoAutenticacao.registrar(registroDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<RespostaAutenticacaoDTO> login(@RequestBody LoginDTO loginDTO) {
        String token = servicoAutenticacao.autenticar(loginDTO);
        
        RespostaAutenticacaoDTO resposta = RespostaAutenticacaoDTO.builder()
                .token(token)
                .tipoToken("Bearer")
                .email(loginDTO.getEmail())
                .build();
        
        return ResponseEntity.ok(resposta);
    }
} 