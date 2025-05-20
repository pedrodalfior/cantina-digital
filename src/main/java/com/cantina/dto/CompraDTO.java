package com.cantina.dto;

import lombok.Data;

import java.util.Map;

@Data
public class CompraDTO {
    /**
     * Mapa produtoId -> quantidade
     */
    private Map<Long, Integer> produtos;
}
