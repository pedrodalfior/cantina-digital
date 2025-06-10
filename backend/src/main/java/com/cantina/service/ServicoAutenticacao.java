package com.cantina.service;

import com.cantina.dto.LoginDTO;
import com.cantina.dto.RegistroUsuarioDTO;
import com.cantina.model.TipoUsuario;
import com.cantina.model.Usuario;
import com.cantina.repository.UsuarioRepository;
import com.cantina.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ServicoAutenticacao {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void registrar(RegistroUsuarioDTO registroDTO) {
        if (usuarioRepository.findByEmail(registroDTO.getEmail()).isPresent()) {
            log.warn("Tentativa de registro com email já existente: {}", registroDTO.getEmail());
            throw new RuntimeException("Email já está em uso");
        }

        Usuario usuario = Usuario.builder()
                .email(registroDTO.getEmail())
                .senha(passwordEncoder.encode(registroDTO.getSenha()))
                .nome(registroDTO.getNome())
                .sobrenome(registroDTO.getSobrenome())
                .tipoUsuario(TipoUsuario.USUARIO)
                .saldo(0.0)
                .build();

        usuarioRepository.save(usuario);
        log.info("Novo usuário registrado com sucesso: {}", registroDTO.getEmail());
    }

    public String autenticar(LoginDTO loginDTO) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(loginDTO.getEmail());
        
        if (usuarioOpt.isEmpty()) {
            log.warn("Tentativa de login com email não encontrado: {}", loginDTO.getEmail());
            throw new RuntimeException("Usuário não encontrado");
        }

        Usuario usuario = usuarioOpt.get();
        log.info("Usuário encontrado: {}", loginDTO.getEmail());

        if (!passwordEncoder.matches(loginDTO.getSenha(), usuario.getSenha())) {
            log.warn("Tentativa de login com senha inválida para o usuário: {}", loginDTO.getEmail());
            throw new RuntimeException("Senha inválida");
        }

        String token = jwtUtil.gerarToken(usuario.getEmail());
        log.info("Login realizado com sucesso para o usuário: {}", loginDTO.getEmail());
        return token;
    }
}
