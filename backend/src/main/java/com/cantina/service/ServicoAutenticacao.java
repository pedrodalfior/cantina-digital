package com.cantina.service;

import com.cantina.dto.LoginDTO;
import com.cantina.dto.RegistroUsuarioDTO;
import com.cantina.model.TipoUsuario;
import com.cantina.model.Usuario;
import com.cantina.repository.UsuarioRepository;
import com.cantina.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ServicoAutenticacao {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void registrar(RegistroUsuarioDTO registroDTO) {
        if (usuarioRepository.findByEmail(registroDTO.getEmail()).isPresent()) {
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
    }

    public String autenticar(LoginDTO loginDTO) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(loginDTO.getEmail());
        
        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Email inválido");
        }

        Usuario usuario = usuarioOpt.get();

        if (!passwordEncoder.matches(loginDTO.getSenha(), usuario.getSenha())) {
            throw new RuntimeException("Senha inválida");
        }

        return jwtUtil.gerarToken(usuario.getEmail());
    }
}
