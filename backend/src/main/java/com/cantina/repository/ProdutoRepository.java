package com.cantina.repository;

import com.cantina.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    List<Produto> findByDisponivel(boolean disponivel);
    List<Produto> findByNomeContainingIgnoreCase(String nome);
} 