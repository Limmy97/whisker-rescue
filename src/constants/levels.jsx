import React from 'react';
import {GiTimeBomb, GiGasMask, GiThorHammer} from 'react-icons/gi';
import {TbToggleRight, TbLadder} from 'react-icons/tb';
import {TILE_TYPES} from './tiles';
import {FaCat} from "react-icons/fa";

const T = TILE_TYPES;

export const LEVELS = {
    1: {
        id: 1,
        name: 'Sector 101: Field Training & Rescue (EASY)',
        hint: (
            <span className="inline-flex items-center gap-1.5 justify-center">
        Evacuate the <FaCat className="text-amber-300 text-sm"/> Cat before the{' '}
                <GiTimeBomb className="text-rose-400 text-sm"/> Bomb detonates!
      </span>
        ),
        timeLimit: 240,
        fogOfWar: false,
        visionRadius: 3,
        catRoaming: false,
        startPos: {r: 2, c: 0},
        totalCats: 1,
        matrix: [
            [T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL],
            [T.WALL, T.WALL, T.KEY, T.WALL, T.WALL, T.PAIL, T.WALL, T.WALL, T.LADDER, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.SWITCH_ON, T.WALL],
            [T.ENTRANCE, T.FLOOR, T.FLOOR, T.DOOR, T.FLOOR, T.FLOOR, T.FIRE, T.FLOOR, T.FLOOR, T.DITCH, T.FLOOR, T.FLOOR, T.DITCH, T.FLOOR, T.FLOOR, T.WALL],
            [T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.FLOOR, T.WALL],
            [T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.BOMB, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.LASER_EMITTER, T.LASER_H, T.WALL],
            [T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.SWITCH_ON, T.FLOOR, T.WALL],
            [T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.ROCK, T.WALL, T.STICK, T.WALL, T.WALL, T.WALL, T.MASK, T.WALL, T.LASER_EMITTER_INVERTED, T.LASER_INV_OFF_H, T.WALL],
            [T.EXIT, T.FLOOR, T.CAT, T.FLOOR, T.CRACKED_WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.GAS, T.GAS, T.GAS, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.WALL],
            [T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL],
        ],
    },
    
    2: {
        id: 2,
        name: 'Sector 222: The curious cat. (EASY)',
        hint: "Referring to the Field Manual (top right) pauses the game.",
        timeLimit: 60,
        fogOfWar: false,
        visionRadius: 3,
        catRoaming: false,
        startPos: {r: 1, c: 0},
        totalCats: 1,
        matrix: [
            [T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL],
            [T.ENTRANCE, T.FLOOR, T.FLOOR, T.DOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FIRE, T.WALL],
            [T.WALL, T.WALL, T.KEY, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.GAS, T.WALL],
            [T.WALL, T.WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.LADDER, T.WALL, T.BOMB, T.WALL, T.GAS, T.WALL],
            [T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.GAS, T.WALL],
            [T.WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.WALL, T.WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.WALL, T.GAS, T.WALL],
            [T.WALL, T.FLOOR, T.WALL, T.FLOOR, T.FLOOR, T.DITCH, T.FLOOR, T.FLOOR, T.FLOOR, T.CAT, T.FLOOR, T.WALL, T.FLOOR, T.WALL],
            [T.WALL, T.MASK, T.WALL, T.WALL, T.WALL, T.WALL, T.FLOOR, T.PAIL, T.FLOOR, T.FLOOR, T.FLOOR, T.WALL, T.FLOOR, T.WALL],
            [T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.EXIT, T.WALL],
        ],
    },
    
    3: {
        id: 3,
        name: "Sector 369: It's really foggy in here. (INTERMEDIATE)",
        hint: "Explore as much as you can but watch the timer...",
        timeLimit: 90,
        fogOfWar: true,
        visionRadius: 3,
        catRoaming: false,
        startPos: {r: 1, c: 0},
        totalCats: 2,
        matrix: [
            [T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL],
            [T.ENTRANCE, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.WALL, T.WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FIRE, T.KEY, T.WALL],
            [T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL],
            [T.WALL, T.CAT, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.FLOOR, T.FLOOR, T.WALL, T.WALL, T.LASER_EMITTER, T.WALL, T.WALL],
            [T.WALL, T.FLOOR, T.WALL, T.WALL, T.PAIL, T.WALL, T.WALL, T.FLOOR, T.WALL, T.BOMB, T.WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.LASER_V, T.FLOOR, T.WALL],
            [T.WALL, T.DOOR, T.WALL, T.WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.WALL, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.LASER_V, T.FLOOR, T.WALL],
            [T.WALL, T.FLOOR, T.MASK, T.WALL, T.WALL, T.WALL, T.WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.WALL, T.WALL, T.LASER_V, T.CAT, T.WALL],
            [T.WALL, T.FLOOR, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.LASER_V, T.FLOOR, T.WALL],
            [T.WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.SWITCH_ON, T.WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.LASER_V, T.FLOOR, T.WALL],
            [T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.EXIT, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL],
        ],
    },
    
    4: {
        id: 4,
        name: 'Sector 488: The Split Aqueduct (INTERMEDIATE)',
        hint: (
            <span className="inline-flex items-center gap-1.5 justify-center">
        Reclaim the <TbLadder className="text-emerald-400 text-sm"/> Ladder with [Space] to cross multiple chasms.
      </span>
        ),
        timeLimit: 90,
        fogOfWar: false,
        visionRadius: 2,
        catRoaming: false,
        startPos: {r: 1, c: 1},
        totalCats: 2,
        matrix: [
            [T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL],
            [T.WALL, T.ENTRANCE, T.FLOOR, T.LADDER, T.WALL, T.KEY, T.STICK, T.WALL, T.ROCK, T.PAIL, T.FLOOR, T.WALL, T.CAT, T.FLOOR, T.WALL, T.WALL],
            [T.WALL, T.FLOOR, T.WALL, T.DITCH, T.WALL, T.WALL, T.FIRE, T.WALL, T.WALL, T.WALL, T.DOOR, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL],
            [T.WALL, T.FLOOR, T.WALL, T.FLOOR, T.PAIL, T.FLOOR, T.FLOOR, T.DITCH, T.FLOOR, T.FLOOR, T.FLOOR, T.WALL, T.WALL, T.DITCH, T.WALL, T.WALL],
            [T.WALL, T.FLOOR, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL],
            [T.WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.WALL, T.CAT, T.FLOOR, T.FIRE, T.FLOOR, T.FLOOR, T.WALL, T.FLOOR, T.FLOOR, T.WALL, T.WALL],
            [T.WALL, T.WALL, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.WALL],
            [T.WALL, T.EXIT, T.DITCH, T.FLOOR, T.FLOOR, T.FLOOR, T.KEY, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.DOOR, T.FLOOR, T.WALL, T.BOMB, T.WALL],
            [T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL],
        ],
    },
    
    5: {
        id: 5,
        name: 'Sector 520: Binary Sentry Core (HARD)',
        hint: (
            <span className="inline-flex items-center gap-1.5 justify-center">
        Toggle <TbToggleRight className="text-emerald-400 text-sm"/> Switches to alternate between Red and Purple lasers.
      </span>
        ),
        timeLimit: 120,
        fogOfWar: false,
        visionRadius: 3,
        catRoaming: true,
        startPos: {r: 1, c: 0},
        totalCats: 4,
        matrix: [
            [T.WALL, T.WALL, T.SWITCH_ON, T.WALL, T.LASER_EMITTER_INVERTED, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL],
            [T.ENTRANCE, T.FLOOR, T.FLOOR, T.FLOOR, T.LASER_INV_OFF_V, T.FLOOR, T.FLOOR, T.FLOOR, T.FIRE, T.FLOOR, T.DOOR, T.FLOOR, T.FLOOR, T.DITCH, T.FLOOR, T.WALL, T.BOMB, T.WALL],
            [T.WALL, T.WALL, T.LASER_EMITTER, T.LASER_H, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.PAIL, T.WALL, T.WALL, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.WALL],
            [T.WALL, T.PAIL, T.WALL, T.FLOOR, T.WALL, T.KEY, T.FLOOR, T.WALL, T.LADDER, T.FLOOR, T.WALL, T.WALL, T.WALL, T.WALL, T.FLOOR, T.SWITCH_ON, T.WALL, T.WALL],
            [T.WALL, T.FLOOR, T.WALL, T.FLOOR, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.LASER_EMITTER, T.FLOOR, T.LASER_EMITTER_INVERTED, T.WALL, T.WALL],
            [T.WALL, T.FLOOR, T.DOOR, T.FLOOR, T.WALL, T.LASER_EMITTER, T.LASER_H, T.WALL, T.WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.FIRE, T.LASER_V, T.FLOOR, T.LASER_INV_OFF_V, T.GAS, T.WALL],
            [T.WALL, T.FLOOR, T.WALL, T.FLOOR, T.WALL, T.WALL, T.MASK, T.WALL, T.STICK, T.FLOOR, T.CAT, T.FLOOR, T.WALL, T.WALL, T.WALL, T.WALL, T.FLOOR, T.WALL],
            [T.FLOOR, T.FLOOR, T.WALL, T.DITCH, T.WALL, T.WALL, T.WALL, T.LASER_EMITTER, T.WALL, T.WALL, T.LASER_H, T.LASER_EMITTER, T.WALL, T.WALL, T.WALL, T.WALL, T.ROCK, T.WALL],
            [T.FLOOR, T.FLOOR, T.WALL, T.FLOOR, T.WALL, T.FLOOR, T.CAT, T.LASER_V, T.DOOR, T.LASER_INV_OFF_V, T.CRACKED_WALL, T.LASER_V, T.PAIL, T.WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR],
            [T.CAT, T.FLOOR, T.WALL, T.FLOOR, T.WALL, T.FLOOR, T.WALL, T.WALL, T.DITCH, T.LASER_EMITTER_INVERTED, T.LASER_INV_OFF_H, T.WALL, T.WALL, T.FLOOR, T.FLOOR, T.CAT, T.FLOOR, T.FLOOR],
            [T.FLOOR, T.FLOOR, T.WALL, T.FLOOR, T.LASER_V, T.FLOOR, T.WALL, T.LASER_EMITTER_INVERTED, T.LASER_INV_OFF_H, T.WALL, T.FIRE, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR],
            [T.FLOOR, T.KEY, T.WALL, T.WALL, T.LASER_EMITTER, T.WALL, T.WALL, T.WALL, T.EXIT, T.WALL, T.WALL, T.WALL, T.WALL, T.KEY, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR],
        ],
    },
    
    // 6: {
    //     id: 6,
    //     name: 'Sector 666: Sub-Zero Protocol',
    //     hint: (
    //         <span className="inline-flex items-center gap-1.5 justify-center">
    //     Forge the <GiThorHammer className="text-amber-400 text-sm"/> Breaker and equip the{' '}
    //             <GiGasMask className="text-teal-300 text-sm"/> Mask to extract all 4 cats!
    //   </span>
    //     ),
    //     timeLimit: 260,
    //     fogOfWar: false,
    //     visionRadius: 2,
    //     catRoaming: false,
    //     startPos: {r: 1, c: 1},
    //     totalCats: 4,
    //     matrix: [
    //         [T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL],
    //         [T.WALL, T.ENTRANCE, T.FLOOR, T.WALL, T.ROCK, T.WALL, T.KEY, T.WALL, T.MASK, T.WALL, T.FLOOR, T.CAT, T.WALL, T.PAIL, T.FLOOR, T.FLOOR, T.CAT, T.WALL],
    //         [T.WALL, T.FLOOR, T.WALL, T.WALL, T.FLOOR, T.WALL, T.DOOR, T.WALL, T.WALL, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.FIRE, T.WALL, T.WALL, T.WALL],
    //         [T.WALL, T.FLOOR, T.FLOOR, T.CRACKED_WALL, T.FLOOR, T.WALL, T.FLOOR, T.GAS, T.GAS, T.GAS, T.GAS, T.FLOOR, T.WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.WALL, T.WALL],
    //         [T.WALL, T.STICK, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.WALL, T.DITCH, T.WALL, T.WALL],
    //         [T.WALL, T.FLOOR, T.WALL, T.CAT, T.FLOOR, T.SWITCH_ON, T.WALL, T.FLOOR, T.BOMB, T.FLOOR, T.WALL, T.FLOOR, T.SWITCH_ON, T.WALL, T.LADDER, T.FLOOR, T.WALL, T.WALL],
    //         [T.WALL, T.FLOOR, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL],
    //         [T.WALL, T.FLOOR, T.LASER_EMITTER, T.LASER_H, T.LASER_H, T.FLOOR, T.WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.WALL, T.LASER_EMITTER_INVERTED, T.LASER_INV_OFF_H, T.LASER_INV_OFF_H, T.FLOOR, T.FLOOR, T.CAT, T.WALL],
    //         [T.WALL, T.FLOOR, T.WALL, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL],
    //         [T.WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.WALL, T.FLOOR, T.GAS, T.GAS, T.FLOOR, T.WALL, T.KEY, T.WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.WALL, T.WALL],
    //         [T.WALL, T.WALL, T.WALL, T.FLOOR, T.WALL, T.WALL, T.WALL, T.WALL, T.DOOR, T.WALL, T.FLOOR, T.WALL, T.FLOOR, T.WALL, T.WALL, T.SWITCH_ON, T.WALL, T.WALL],
    //         [T.WALL, T.EXIT, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.FLOOR, T.WALL, T.FLOOR, T.FLOOR, T.FLOOR, T.WALL],
    //         [T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL, T.WALL],
    //     ],
    // },
};