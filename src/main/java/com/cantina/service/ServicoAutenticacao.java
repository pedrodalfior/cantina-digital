package com.cantina.service;

import com.cantina.dto.LoginDTO;
import com.cantina.dto.RegistroDTO;
import com.cantina.entity.Papel;
import com.cantina.entity.Usuario;
import com.cantina.repository.UsuarioRepositorio;
import com.cantina.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ServicoAutenticacao {

    private final UsuarioRepositorio usuarioRepositorio;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void registrar(RegistroDTO registroDTO) {
        if (usuarioRepositorio.findByNomeDeUsuario(registroDTO.getNomeDeUsuario()).isPresent()) {
            throw new RuntimeException("Nome de usuário já está em uso");
        }
        if (usuarioRepositorio.findByEmail(registroDTO.getEmail()).isPresent()) {
            throw new RuntimeException("Email já está em uso");
        }

        Usuario usuario = Usuario.builder()
                .nomeDeUsuario(registroDTO.getNomeDeUsuario())
                .email(registroDTO.getEmail())
                .senha(passwordEncoder.encode(registroDTO.getSenha()))
                .papel(Papel.USUARIO)
                .saldo(0.0)
                .build();

        usuarioRepositorio.save(usuario);
    }

    public String autenticar(LoginDTO loginDTO) {
        Optional<Usuario> usuarioOpt = usuarioRepositorio.findByEmail(loginDTO.getEmail());
        
        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Email inválido");
        }

        Usuario usuario = usuarioOpt.get();

        if (!passwordEncoder.matches(loginDTO.getSenha(), usuario.getSenha())) {
            throw new RuntimeException("Senha inválida");
        }

        return jwtUtil.gerarToken(usuario.getNomeDeUsuario());
    }
}
