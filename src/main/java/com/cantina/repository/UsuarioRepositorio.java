package com.cantina.repository;

import com.cantina.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByNomeDeUsuario(String nomeDeUsuario);
    Optional<Usuario> findByEmail(String email);
}
