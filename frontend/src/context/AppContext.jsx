"use client"
import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [cache, setCache] = useState({ indicacoes: {}, detalhes: {} });;

    const getIndicacoes = async (categoria) => {
        if (cache.indicacoes[categoria]) return cache.indicacoes[categoria];
        
        const res = await api.get(`/indicacoes/${categoria}`);
        setCache(prev => ({
            ...prev,
            indicacoes: { ...prev.indicacoes, [categoria]: res.data }
        }));
        return res.data;
    };

    const getTop = async (categoria) => {
        if (cache.indicacoes[categoria]) return cache.indicacoes[categoria];
        
        const res = await api.get(`/global/${categoria}`);
        setCache(prev => ({
            ...prev,
            indicacoes: { ...prev.indicacoes, [categoria]: res.data }
        }));
        return res.data;
    };
    const getDetalhesComunidade = async (id) => {
        // if (cache.detalhes[id]) return cache.detalhes[id];
        // const res = await api.get(`/indicacoes/detalhes/${id}`);
        // setCache(prev => ({ ...prev, detalhes: { ...prev.detalhes, [id]: res.data } }));
        // return res.data;
    };

    return (
        <AppContext.Provider value={{ cache, getIndicacoes, setCache, getDetalhesComunidade,getTop }}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);