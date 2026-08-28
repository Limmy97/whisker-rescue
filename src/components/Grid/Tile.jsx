import {RiMapPinUserFill} from "react-icons/ri";
import React from 'react';
import {Box} from '@chakra-ui/react';
import {GiMineExplosion, GiExplosionRays} from 'react-icons/gi';
import {FaSkullCrossbones} from 'react-icons/fa6';
import {WiDayCloudy} from 'react-icons/wi';
import {TILE_TYPES, TILE_CONFIG} from '../../constants/tiles';
import {TbGhost2Filled} from "react-icons/tb";

export default function Tile({
                                 type = TILE_TYPES.FLOOR,
                                 isPlayer = false,
                                 visibility = 'VISIBLE',
                                 timeLeft = 60,
                                 isLost = false,
                                 onClick,
                             }) {
    const config = TILE_CONFIG[type] || TILE_CONFIG[TILE_TYPES.FLOOR];
    
    // Dynamic bomb vibration intensity
    let bombShakeClass = 'shake-mild';
    if (timeLeft <= 15) {
        bombShakeClass = 'shake-critical';
    } else if (timeLeft <= 30) {
        bombShakeClass = 'shake-medium';
    }
    
    const isBomb = type === TILE_TYPES.BOMB;
    const isCat = type === TILE_TYPES.CAT;
    const isCollectible = [
        TILE_TYPES.KEY,
        TILE_TYPES.PAIL,
        TILE_TYPES.LADDER,
        TILE_TYPES.MASK,
        TILE_TYPES.ROCK,
        TILE_TYPES.STICK,
    ].includes(type);
    
    const isFloorTile =
        type === TILE_TYPES.FLOOR ||
        type === TILE_TYPES.BRIDGE ||
        type === TILE_TYPES.DOOR_OPEN ||
        type === TILE_TYPES.FIRE_EXTINGUISHED ||
        type === TILE_TYPES.RUBBLE ||
        type === TILE_TYPES.LASER_OFF_H ||
        type === TILE_TYPES.LASER_OFF_V ||
        type === TILE_TYPES.LASER_INV_OFF_H ||
        type === TILE_TYPES.LASER_INV_OFF_V;
    
    // Fog of War shroud
    if (visibility === 'HIDDEN' && !isBomb) {
        return (
            <Box
                className="w-full h-full aspect-square bg-slate-950 border border-slate-900/60 rounded-[2px] flex items-center justify-center relative overflow-hidden">
                <WiDayCloudy className="w-3/4 h-3/4 text-slate-800/80 animate-pulse"/>
            </Box>
        );
    }
    
    const isDimmed = visibility === 'DIMMED' && !isBomb;
    
    // Background and border styling
    const tileBg =
        isLost && isFloorTile
            ? 'bg-red-950/80'
            : isLost && isBomb
                ? 'bg-orange-950/90'
                : config.bg;
    
    const tileBorder =
        isLost && isFloorTile
            ? 'border-red-600/50'
            : isLost && isBomb
                ? 'border-orange-500'
                : config.border;
    
    return (
        <Box
            onClick={onClick}
            className={`
        relative w-full h-full aspect-square flex items-center justify-center
        select-none rounded-[3px] border transition-all duration-200 overflow-hidden
        ${tileBg} ${tileBorder}
        ${isDimmed ? 'opacity-35 grayscale-[70%] contrast-75' : 'opacity-100'}
        ${isPlayer && !isLost ? 'ring-1 sm:ring-2 ring-yellow-400 ring-offset-1 ring-offset-slate-950 z-10' : ''}
        ${isPlayer && isLost ? 'ring-1 sm:ring-2 ring-red-500 ring-offset-1 ring-offset-slate-950 z-10' : ''}
        [&_svg]:w-full [&_svg]:h-full [&_svg]:max-w-full [&_svg]:max-h-full
      `}
        >
            {/* 1. Dead Player Icon */}
            {isPlayer && isLost && (
                <Box className="w-full h-full p-[15%] flex items-center justify-center pointer-events-none">
                    <FaSkullCrossbones
                        className="text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.9)] animate-pulse"/>
                </Box>
            )}
            
            {/* 2. Alive Player Avatar */}
            {isPlayer && !isLost && (
                <Box
                    className="w-full h-full p-[12%] flex items-center justify-center pointer-events-none text-yellow-300">
                    <RiMapPinUserFill className="drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"/>
                </Box>
            )}
            
            {/* 3. Dead Cat Icon */}
            {!isPlayer && isCat && isLost && (
                <Box className="w-full h-full p-[15%] flex items-center justify-center pointer-events-none">
                    <TbGhost2Filled className="text-rose-300 drop-shadow-[0_0_6px_rgba(244,63,94,0.8)]"/>
                </Box>
            )}
            
            {/* 4. Floor Blast Crater */}
            {!isPlayer && isFloorTile && isLost && (
                <Box className="w-full h-full p-[15%] flex items-center justify-center pointer-events-none">
                    <GiMineExplosion
                        className="text-orange-500 drop-shadow-[0_0_6px_rgba(249,115,22,0.9)] animate-pulse"/>
                </Box>
            )}
            
            {/* 5. Exploded Bomb */}
            {!isPlayer && isBomb && isLost && (
                <Box className="w-full h-full p-[10%] flex items-center justify-center pointer-events-none">
                    <GiExplosionRays className="text-amber-400 drop-shadow-[0_0_14px_rgba(251,191,36,1)] animate-spin"/>
                </Box>
            )}
            
            {/* 6. Standard Tile Icons */}
            {!isPlayer && !(isLost && (isFloorTile || isCat || isBomb)) && config.icon && (
                <Box
                    className={`w-full h-full p-[15%] flex items-center justify-center pointer-events-none ${
                        isBomb ? bombShakeClass : isCollectible ? 'pickup-float' : ''
                    }`}
                >
                    {config.icon}
                </Box>
            )}
            
            {/* Wall Texture */}
            {type === TILE_TYPES.WALL && (
                <Box
                    className="w-full h-full bg-slate-950/80 border border-slate-900 rounded-[1px] flex items-center justify-center">
                    <Box className="w-3/5 h-3/5 border border-slate-800/40 rounded-[1px]"/>
                </Box>
            )}
        </Box>
    );
}