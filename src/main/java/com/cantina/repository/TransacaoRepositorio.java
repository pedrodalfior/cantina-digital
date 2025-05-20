package com.cantina.repository;

import com.cantina.entity.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransacaoRepositorio extends JpaRepository<Transacao, Long> {
}
