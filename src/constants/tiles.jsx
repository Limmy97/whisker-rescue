import React from 'react';
import {
    GiCampfire,
    GiCrackedGlass,
    GiEntryDoor,
    GiExitDoor,
    GiGasMask,
    GiHole,
    GiHoleLadder,
    GiKey,
    GiPoisonCloud,
    GiSentryGun,
    GiStoneBlock,
    GiStonePile,
    GiTeslaTurret,
    GiTimeBomb,
    GiWoodStick
} from 'react-icons/gi';
import {TbLadder, TbMinusVertical, TbToggleLeft, TbToggleRight} from 'react-icons/tb';
import {FaGlassWater} from "react-icons/fa6";
import {MdOutlineHorizontalRule} from "react-icons/md";
import {LiaGlassWhiskeySolid} from "react-icons/lia";
import {FaCat, FaDoorClosed, FaDoorOpen} from "react-icons/fa";

export const TILE_TYPES = {
    FLOOR: 0,
    WALL: 1,
    DOOR: 2,
    FIRE: 3,
    DITCH: 4,
    BRIDGE: 5,
    GAS: 6,
    CRACKED_WALL: 7,
    LASER_H: 8,
    SWITCH_ON: 9,
    ENTRANCE: 10,
    EXIT: 11,
    KEY: 12,
    PAIL: 13,
    LADDER: 14,
    MASK: 15,
    ROCK: 16,
    STICK: 17,
    LASER_V: 18,
    LASER_EMITTER: 19,
    SWITCH_OFF: 20,
    LASER_OFF_H: 21,
    LASER_OFF_V: 22,
    // --- INVERTED LASER SYSTEM ---
    LASER_EMITTER_INVERTED: 23,
    LASER_INV_OFF_H: 24, // Inactive while Switch is ON (walkable)
    LASER_INV_OFF_V: 25, // Inactive while Switch is ON (walkable)
    LASER_INV_ON_H: 26,  // Active when Switch is OFF (lethal)
    LASER_INV_ON_V: 27,  // Active when Switch is OFF (lethal)
    // --- CLEARED WALKABLE TRACES ---
    DOOR_OPEN: 28,
    FIRE_EXTINGUISHED: 29,
    RUBBLE: 30,
    BOMB: 98,
    CAT: 99,
};

export const TILE_CONFIG = {
    [TILE_TYPES.FLOOR]: {
        label: 'Floor',
        icon: null,
        bg: 'bg-slate-850/60',
        border: 'border-slate-750/30',
        isWalkable: true,
    },
    [TILE_TYPES.WALL]: {
        label: 'Wall',
        icon: null,
        bg: 'bg-slate-950',
        border: 'border-slate-850',
        isWalkable: false,
    },
    [TILE_TYPES.ENTRANCE]: {
        label: 'Entry Gate',
        icon: <GiEntryDoor className="w-5 h-5 sm:w-7 sm:h-7 text-blue-400"/>,
        bg: 'bg-blue-950/40',
        border: 'border-blue-500/60',
        isWalkable: true,
    },
    [TILE_TYPES.EXIT]: {
        label: 'Evacuation Gate',
        icon: <GiExitDoor className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-400 animate-pulse"/>,
        bg: 'bg-emerald-950/40',
        border: 'border-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.3)]',
        isWalkable: true,
    },
    [TILE_TYPES.BOMB]: {
        label: 'Ticking Bomb',
        icon: <GiTimeBomb className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500 drop-shadow-[0_0_12px_rgba(244,63,94,0.9)]"/>,
        bg: 'bg-rose-950/70',
        border: 'border-rose-500/80',
        isWalkable: false,
    },
    [TILE_TYPES.DOOR]: {
        label: 'Locked Door',
        icon: <FaDoorClosed className="w-5 h-5 sm:w-7 sm:h-7 text-amber-500"/>,
        bg: 'bg-amber-950/40',
        border: 'border-amber-700/60',
        isWalkable: false,
    },
    [TILE_TYPES.DOOR_OPEN]: {
        label: 'Unlocked Doorway',
        icon: <FaDoorOpen className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400/60 opacity-75"/>,
        bg: 'bg-amber-950/20',
        border: 'border-amber-700/30 border-dashed',
        isWalkable: true,
    },
    [TILE_TYPES.FIRE]: {
        label: 'Campfire',
        icon: <GiCampfire className="w-5 h-5 sm:w-7 sm:h-7 text-orange-500 animate-pulse"/>,
        bg: 'bg-orange-950/40',
        border: 'border-orange-600/60',
        isWalkable: false,
    },
    [TILE_TYPES.FIRE_EXTINGUISHED]: {
        label: 'Extinguished Fire',
        icon: <LiaGlassWhiskeySolid className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400/70 opacity-80"/>,
        bg: 'bg-cyan-950/20',
        border: 'border-cyan-800/30 border-dashed',
        isWalkable: true,
    },
    [TILE_TYPES.DITCH]: {
        label: 'Chasm',
        icon: <GiHole className="w-5 h-5 sm:w-7 sm:h-7 text-stone-500"/>,
        bg: 'bg-stone-950',
        border: 'border-stone-800',
        isWalkable: false,
    },
    [TILE_TYPES.BRIDGE]: {
        label: 'Bridged Chasm',
        icon: <GiHoleLadder className="w-5 h-5 sm:w-7 sm:h-7 text-amber-300"/>,
        bg: 'bg-amber-900/30',
        border: 'border-amber-600/60',
        isWalkable: true,
    },
    [TILE_TYPES.GAS]: {
        label: 'Toxic Fumes',
        icon: <GiPoisonCloud className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-400/80 animate-pulse"/>,
        bg: 'bg-emerald-950/60',
        border: 'border-emerald-600/40',
        isWalkable: false,
    },
    [TILE_TYPES.CRACKED_WALL]: {
        label: 'Cracked Wall',
        icon: <GiCrackedGlass className="w-5 h-5 sm:w-7 sm:h-7 text-stone-400"/>,
        bg: 'bg-stone-900',
        border: 'border-stone-600/60',
        isWalkable: false,
    },
    [TILE_TYPES.RUBBLE]: {
        label: 'Crumbled Rubble',
        icon: <GiStonePile className="w-5 h-5 sm:w-6 sm:h-6 text-stone-400/60 opacity-80"/>,
        bg: 'bg-stone-900/30',
        border: 'border-stone-700/30 border-dashed',
        isWalkable: true,
    },
    // Default Laser Network (Standard: ON when Switch is ON)
    [TILE_TYPES.LASER_EMITTER]: {
        label: 'Tesla Turret (Normal Emitter)',
        icon: <GiTeslaTurret className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"/>,
        bg: 'bg-slate-950',
        border: 'border-red-600/60',
        isWalkable: false,
    },
    [TILE_TYPES.LASER_H]: {
        label: 'Active Horizontal Laser',
        icon: <MdOutlineHorizontalRule
            className="w-7 h-7 sm:w-9 sm:h-9 text-red-500 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]"/>,
        bg: 'bg-red-950/40',
        border: 'border-red-500/40',
        isWalkable: false,
    },
    [TILE_TYPES.LASER_V]: {
        label: 'Active Vertical Laser',
        icon: <TbMinusVertical
            className="w-7 h-7 sm:w-9 sm:h-9 text-red-500 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]"/>,
        bg: 'bg-red-950/40',
        border: 'border-red-500/40',
        isWalkable: false,
    },
    [TILE_TYPES.LASER_OFF_H]: {
        label: 'Offline Laser Track',
        icon: <MdOutlineHorizontalRule className="w-6 h-6 sm:w-8 sm:h-8 text-slate-600 opacity-40"/>,
        bg: 'bg-slate-900/40',
        border: 'border-slate-800/40 border-dashed',
        isWalkable: true,
    },
    [TILE_TYPES.LASER_OFF_V]: {
        label: 'Offline Laser Track',
        icon: <TbMinusVertical className="w-6 h-6 sm:w-8 sm:h-8 text-slate-600 opacity-40"/>,
        bg: 'bg-slate-900/40',
        border: 'border-slate-800/40 border-dashed',
        isWalkable: true,
    },
    // Inverted Laser Network (Inverted: OFF when Switch is ON, ON when Switch is OFF)
    [TILE_TYPES.LASER_EMITTER_INVERTED]: {
        label: 'Sentry Gun (Inverted Emitter)',
        icon: <GiSentryGun
            className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.9)]"/>,
        bg: 'bg-slate-950',
        border: 'border-purple-600/60',
        isWalkable: false,
    },
    [TILE_TYPES.LASER_INV_OFF_H]: {
        label: 'Inverted Laser Track (Offline)',
        icon: <MdOutlineHorizontalRule className="w-6 h-6 sm:w-8 sm:h-8 text-purple-900/50 opacity-40"/>,
        bg: 'bg-purple-950/20',
        border: 'border-purple-900/40 border-dashed',
        isWalkable: true,
    },
    [TILE_TYPES.LASER_INV_OFF_V]: {
        label: 'Inverted Laser Track (Offline)',
        icon: <TbMinusVertical className="w-6 h-6 sm:w-8 sm:h-8 text-purple-900/50 opacity-40"/>,
        bg: 'bg-purple-950/20',
        border: 'border-purple-900/40 border-dashed',
        isWalkable: true,
    },
    [TILE_TYPES.LASER_INV_ON_H]: {
        label: 'Inverted Horizontal Laser (Active)',
        icon: <MdOutlineHorizontalRule
            className="w-7 h-7 sm:w-9 sm:h-9 text-purple-400 animate-pulse drop-shadow-[0_0_8px_rgba(192,132,252,0.9)]"/>,
        bg: 'bg-purple-950/50',
        border: 'border-purple-500/50',
        isWalkable: false,
    },
    [TILE_TYPES.LASER_INV_ON_V]: {
        label: 'Inverted Vertical Laser (Active)',
        icon: <TbMinusVertical
            className="w-7 h-7 sm:w-9 sm:h-9 text-purple-400 animate-pulse drop-shadow-[0_0_8px_rgba(192,132,252,0.9)]"/>,
        bg: 'bg-purple-950/50',
        border: 'border-purple-500/50',
        isWalkable: false,
    },
    [TILE_TYPES.SWITCH_ON]: {
        label: 'Laser Switch (ON)',
        icon: <TbToggleRight
            className="w-7 h-7 sm:w-9 sm:h-9 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]"/>,
        bg: 'bg-emerald-950/30',
        border: 'border-emerald-500/60',
        isWalkable: false,
    },
    [TILE_TYPES.SWITCH_OFF]: {
        label: 'Laser Switch (OFF)',
        icon: <TbToggleLeft className="w-7 h-7 sm:w-9 sm:h-9 text-rose-400"/>,
        bg: 'bg-rose-950/30',
        border: 'border-rose-500/40',
        isWalkable: false,
    },
    [TILE_TYPES.KEY]: {
        label: 'Golden Key',
        icon: <GiKey className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-400"/>,
        bg: 'bg-slate-800/80',
        border: 'border-yellow-500/40',
        isWalkable: true,
    },
    [TILE_TYPES.PAIL]: {
        label: 'Water Pail',
        icon: <FaGlassWater className="w-5 h-5 sm:w-7 sm:h-7 text-cyan-400"/>,
        bg: 'bg-slate-800/80',
        border: 'border-cyan-500/40',
        isWalkable: true,
    },
    [TILE_TYPES.LADDER]: {
        label: 'Ladder',
        icon: <TbLadder className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-400"/>,
        bg: 'bg-slate-800/80',
        border: 'border-emerald-500/40',
        isWalkable: true,
    },
    [TILE_TYPES.MASK]: {
        label: 'Gas Mask',
        icon: <GiGasMask className="w-5 h-5 sm:w-7 sm:h-7 text-teal-300"/>,
        bg: 'bg-slate-800/80',
        border: 'border-teal-500/40',
        isWalkable: true,
    },
    [TILE_TYPES.ROCK]: {
        label: 'Heavy Rock',
        icon: <GiStoneBlock className="w-5 h-5 sm:w-7 sm:h-7 text-stone-300"/>,
        bg: 'bg-slate-800/80',
        border: 'border-stone-500/40',
        isWalkable: true,
    },
    [TILE_TYPES.STICK]: {
        label: 'Sturdy Stick',
        icon: <GiWoodStick className="w-5 h-5 sm:w-7 sm:h-7 text-amber-600"/>,
        bg: 'bg-slate-800/80',
        border: 'border-amber-600/40',
        isWalkable: true,
    },
    [TILE_TYPES.CAT]: {
        label: 'Trapped Cat',
        icon: <FaCat className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300 animate-bounce"/>,
        bg: 'bg-amber-900/40',
        border: 'border-yellow-400/80',
        isWalkable: true,
    },
};