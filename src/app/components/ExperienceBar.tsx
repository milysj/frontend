import React from 'react';

/**
 * Componente de Barra de Experiência e Nível.
 *
 * @param {object} props
 * @param {number} props.currentLevel - Nível atual do usuário (ex: 5).
 * @param {number} props.currentXp - Experiência atual acumulada no nível (ex: 300).
 * @param {number} props.xpToNextLevel - Total de experiência necessária para o próximo nível (ex: 1000).
 */
const ExperienceBar = ({ currentLevel, currentXp, xpToNextLevel }) => {
    // Calcula a porcentagem de preenchimento da barra
    const progressPercentage = (currentXp / xpToNextLevel) * 100;

    // Estilos básicos para a barra (fáceis de customizar)
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        margin: '20px 0',
        width: '80%',
        maxWidth: '600px', // Limita a largura máxima
        fontFamily: 'Arial, sans-serif',
    };

    const levelTextStyle = {
        fontWeight: 'bold',
        fontSize: '1.2rem',
        minWidth: '40px', // Garante que o número do nível tenha espaço
        textAlign: 'center',
        color: '#333',
    };

    const barContainerStyle = {
        flex: 1, // Ocupa o espaço restante
        height: '10px',
        backgroundColor: '#e6e6e6',
        borderRadius: '5px',
        position: 'relative',
    };

    const barFillStyle = {
        height: '100%',
        width: `${progressPercentage}%`,
        backgroundColor: '#007bff', // Cor de progresso (azul)
        borderRadius: '5px',
        transition: 'width 0.5s ease-in-out',
    };

    const currentXpStyle = {
        position: 'absolute',
        top: '15px', // Posição abaixo da barra
        left: `${progressPercentage}%`,
        transform: 'translateX(-50%)',
        fontSize: '0.8rem',
        whiteSpace: 'nowrap',
        fontWeight: 'bold',
        color: '#007bff',
    };

    return (
        <div style={containerStyle}>
            {/* Nível Atual */}
            <span style={levelTextStyle}>Lv {currentLevel}</span>

            {/* Barra de Progresso */}
            <div style={barContainerStyle}>
                <div style={barFillStyle} />
                
                {/* Indicador e Valor da XP Atual */}
                <span style={currentXpStyle}>
                    {currentXp} XP
                </span>
            </div>

            {/* Nível Alvo */}
            <span style={levelTextStyle}>Lv {currentLevel + 1}</span>
            
            {/* Informação Adicional sobre a XP necessária */}
            {xpToNextLevel > 0 && (
                <span style={{ fontSize: '0.9rem', color: '#666', minWidth: '90px' }}>
                    / {xpToNextLevel} XP
                </span>
            )}
        </div>
    );
};

export default ExperienceBar;