import React, {useCallback, useEffect, useRef, useState} from 'react';
import confetti from 'canvas-confetti';
import {GiCampfire, GiExitDoor, GiGasMask, GiKey, GiRock, GiWaterDrop, GiWoodStick} from 'react-icons/gi';
import {TbLadder, TbToggleLeft, TbToggleRight} from 'react-icons/tb';
import {TILE_TYPES} from '../constants/tiles';
import {soundFx} from '../utils/audio';
import {FaCat} from "react-icons/fa";

export function useGameLoop(levelData, onWinLevel, isPaused = false) {
    const [grid, setGrid] = useState(levelData.matrix.map((row) => [...row]));
    const [playerPos, setPlayerPos] = useState(levelData.startPos);
    const [inventory, setInventory] = useState({
        key: 0,
        pail: 0,
        ladder: 0,
        mask: 0,
        rock: 0,
        stick: 0,
    });
    const [catsSaved, setCatsSaved] = useState(0);
    const [visited, setVisited] = useState(() => {
        const v = Array(levelData.matrix.length)
            .fill(null)
            .map(() => Array(levelData.matrix[0].length).fill(false));
        const vr = levelData.visionRadius || 2;
        for (let r = 0; r < v.length; r++) {
            for (let c = 0; c < v[0].length; c++) {
                if (Math.abs(levelData.startPos.r - r) + Math.abs(levelData.startPos.c - c) <= vr) {
                    v[r][c] = true;
                }
            }
        }
        return v;
    });
    
    const [tacticalMessage, setTacticalMessage] = useState('Sector active. Stand by for tactical updates.');
    const [isTacticalAlert, setIsTacticalAlert] = useState(false); // <--- Flash trigger
    const [timeLeft, setTimeLeft] = useState(levelData.timeLimit || 90);
    const [isWon, setIsWon] = useState(false);
    const [isLost, setIsLost] = useState(false);
    
    const stateRef = useRef({
        grid,
        playerPos,
        inventory,
        catsSaved,
        isWon,
        isLost,
        isPaused,
        levelData,
    });
    
    useEffect(() => {
        stateRef.current = {
            grid,
            playerPos,
            inventory,
            catsSaved,
            isWon,
            isLost,
            isPaused,
            levelData,
        };
    }, [grid, playerPos, inventory, catsSaved, isWon, isLost, isPaused, levelData]);
    
    // Helper to set message + trigger flash
    const triggerAlert = (msg) => {
        setTacticalMessage(msg);
        setIsTacticalAlert(true);
    };
    
    const restartLevel = useCallback(() => {
        setGrid(levelData.matrix.map((row) => [...row]));
        setPlayerPos(levelData.startPos);
        setInventory({key: 0, pail: 0, ladder: 0, mask: 0, rock: 0, stick: 0});
        setCatsSaved(0);
        setIsWon(false);
        setIsLost(false);
        setTimeLeft(levelData.timeLimit || 90);
        setTacticalMessage('Sector reset. All hazard barriers online.');
        setIsTacticalAlert(false);
        
        const v = Array(levelData.matrix.length)
            .fill(null)
            .map(() => Array(levelData.matrix[0].length).fill(false));
        const vr = levelData.visionRadius || 2;
        for (let r = 0; r < v.length; r++) {
            for (let c = 0; c < v[0].length; c++) {
                if (Math.abs(levelData.startPos.r - r) + Math.abs(levelData.startPos.c - c) <= vr) {
                    v[r][c] = true;
                }
            }
        }
        setVisited(v);
    }, [levelData]);
    
    useEffect(() => {
        restartLevel();
    }, [levelData.id, restartLevel]);
    
    // Timer Interval
    useEffect(() => {
        if (isWon || isLost || isPaused) return;
        
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    soundFx.playExplosion();
                    setIsLost(true);
                    triggerAlert('💥 DETONATION! Bomb detonated before evacuation!');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        
        return () => clearInterval(timer);
    }, [isWon, isLost, isPaused, levelData.id]);
    
    // Roaming Cat Engine respects pause state
    useEffect(() => {
        if (!levelData.catRoaming || isWon || isLost || isPaused) return;
        
        const initialCats = [];
        levelData.matrix.forEach((row, r) => {
            row.forEach((tile, c) => {
                if (tile === TILE_TYPES.CAT) initialCats.push({r, c});
            });
        });
        
        const maxRadius = levelData.catRoamRadius || 2;
        
        const interval = setInterval(() => {
            setGrid((prevGrid) => {
                const {playerPos: curPlayer} = stateRef.current;
                const currentCats = [];
                
                for (let r = 0; r < prevGrid.length; r++) {
                    for (let c = 0; c < prevGrid[0].length; c++) {
                        if (prevGrid[r][c] === TILE_TYPES.CAT) {
                            const origin = initialCats[currentCats.length] || {r, c};
                            currentCats.push({r, c, origin});
                        }
                    }
                }
                
                if (currentCats.length === 0) return prevGrid;
                
                const newGrid = prevGrid.map((row) => [...row]);
                const directions = [
                    {r: -1, c: 0},
                    {r: 1, c: 0},
                    {r: 0, c: -1},
                    {r: 0, c: 1},
                ];
                
                currentCats.forEach(({r, c, origin}) => {
                    const validMoves = directions
                        .map((d) => ({r: r + d.r, c: c + d.c}))
                        .filter((pos) => {
                            if (
                                pos.r < 0 ||
                                pos.r >= newGrid.length ||
                                pos.c < 0 ||
                                pos.c >= newGrid[0].length
                            ) {
                                return false;
                            }
                            
                            const tile = newGrid[pos.r][pos.c];
                            const isPlayerHere = pos.r === curPlayer.r && pos.c === curPlayer.c;
                            const isExitTile = tile === TILE_TYPES.EXIT;
                            const isBombTile = tile === TILE_TYPES.BOMB;
                            const isWalkableFloor =
                                tile === TILE_TYPES.FLOOR ||
                                tile === TILE_TYPES.BRIDGE ||
                                tile === TILE_TYPES.DOOR_OPEN ||
                                tile === TILE_TYPES.FIRE_EXTINGUISHED ||
                                tile === TILE_TYPES.RUBBLE;
                            
                            const distanceFromOrigin =
                                Math.abs(pos.r - origin.r) + Math.abs(pos.c - origin.c);
                            
                            return (
                                isWalkableFloor &&
                                !isPlayerHere &&
                                !isExitTile &&
                                !isBombTile &&
                                distanceFromOrigin <= maxRadius
                            );
                        });
                    
                    if (validMoves.length > 0 && Math.random() > 0.45) {
                        const chosenMove = validMoves[Math.floor(Math.random() * validMoves.length)];
                        newGrid[r][c] = TILE_TYPES.FLOOR;
                        newGrid[chosenMove.r][chosenMove.c] = TILE_TYPES.CAT;
                    }
                });
                
                return newGrid;
            });
        }, 1500);
        
        return () => clearInterval(interval);
    }, [levelData, isWon, isLost, isPaused]);
    
    // Spacebar Toggle Switch & Reclaim Ladder
    const handleSpaceAction = useCallback(() => {
        const {
            grid: currentGrid,
            playerPos: currentPos,
            isWon: currentWon,
            isLost: currentLost,
            isPaused: currentPaused,
        } = stateRef.current;
        
        if (currentWon || currentLost || currentPaused) return;
        
        // Check orthogonal adjacent tiles only (Up, Down, Left, Right)
        const deltas = [
            {r: -1, c: 0},
            {r: 1, c: 0},
            {r: 0, c: -1},
            {r: 0, c: 1},
        ];
        
        // Check Switch Toggle
        for (const d of deltas) {
            const checkR = currentPos.r + d.r;
            const checkC = currentPos.c + d.c;
            
            if (
                checkR >= 0 &&
                checkR < currentGrid.length &&
                checkC >= 0 &&
                checkC < currentGrid[0].length
            ) {
                const cell = currentGrid[checkR][checkC];
                if (cell === TILE_TYPES.SWITCH_ON || cell === TILE_TYPES.SWITCH_OFF) {
                    const turningOff = cell === TILE_TYPES.SWITCH_ON;
                    soundFx.playSwitch();
                    
                    setGrid((prev) =>
                        prev.map((row) =>
                            row.map((val) => {
                                // 1. Synchronize ALL switches across the entire map
                                if (val === TILE_TYPES.SWITCH_ON || val === TILE_TYPES.SWITCH_OFF) {
                                    return turningOff ? TILE_TYPES.SWITCH_OFF : TILE_TYPES.SWITCH_ON;
                                }
                                
                                // 2. Synchronize Laser Beams
                                if (turningOff) {
                                    // Standard Tesla Lasers -> Offline
                                    if (val === TILE_TYPES.LASER_H) return TILE_TYPES.LASER_OFF_H;
                                    if (val === TILE_TYPES.LASER_V) return TILE_TYPES.LASER_OFF_V;
                                    
                                    // Inverted Sentry Lasers -> Energized (Lethal)
                                    if (val === TILE_TYPES.LASER_INV_OFF_H) return TILE_TYPES.LASER_INV_ON_H;
                                    if (val === TILE_TYPES.LASER_INV_OFF_V) return TILE_TYPES.LASER_INV_ON_V;
                                } else {
                                    // Standard Tesla Lasers -> Energized (Lethal)
                                    if (val === TILE_TYPES.LASER_OFF_H) return TILE_TYPES.LASER_H;
                                    if (val === TILE_TYPES.LASER_OFF_V) return TILE_TYPES.LASER_V;
                                    
                                    // Inverted Sentry Lasers -> Offline
                                    if (val === TILE_TYPES.LASER_INV_ON_H) return TILE_TYPES.LASER_INV_OFF_H;
                                    if (val === TILE_TYPES.LASER_INV_ON_V) return TILE_TYPES.LASER_INV_OFF_V;
                                }
                                
                                return val;
                            })
                        )
                    );
                    
                    triggerAlert(
                        turningOff ? (
                            <span className="inline-flex items-center gap-1.5 justify-center">
                                <TbToggleLeft className="text-rose-400 text-sm"/> All switches OFF. Red laser disabled, purple laser active!
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 justify-center">
                                <TbToggleRight className="text-emerald-400 text-sm"/> All switches ON. Red laser active, purple laser disabled!
                            </span>
                        )
                    );
                    return;
                }
            }
        }
        
        // Check Ladder Reclaim
        for (const d of deltas) {
            const checkR = currentPos.r + d.r;
            const checkC = currentPos.c + d.c;
            
            if (
                checkR >= 0 &&
                checkR < currentGrid.length &&
                checkC >= 0 &&
                checkC < currentGrid[0].length
            ) {
                if (currentGrid[checkR][checkC] === TILE_TYPES.BRIDGE) {
                    if (checkR === currentPos.r && checkC === currentPos.c) {
                        triggerAlert('Step off the bridge onto solid ground before reclaiming ladder!');
                        return;
                    }
                    
                    soundFx.playPickup();
                    setGrid((prev) => {
                        const next = prev.map((row) => [...row]);
                        next[checkR][checkC] = TILE_TYPES.DITCH;
                        return next;
                    });
                    setInventory((prev) => ({...prev, ladder: prev.ladder + 1}));
                    triggerAlert(
                        <span className="inline-flex items-center gap-1.5 justify-center">
              Retrieved <TbLadder className="text-emerald-400 text-sm"/> Ladder into inventory!
            </span>
                    );
                    return;
                }
            }
        }
    }, []);
    
    const movePlayer = useCallback(
        (deltaR, deltaC) => {
            const {
                grid: currentGrid,
                playerPos: currentPos,
                inventory: currentInv,
                catsSaved: currentCats,
                isWon: currentWon,
                isLost: currentLost,
                isPaused: currentPaused,
                levelData: currentLevel,
            } = stateRef.current;
            
            if (currentWon || currentLost || currentPaused) return;
            
            const targetR = currentPos.r + deltaR;
            const targetC = currentPos.c + deltaC;
            
            if (
                targetR < 0 ||
                targetR >= currentGrid.length ||
                targetC < 0 ||
                targetC >= currentGrid[0].length
            ) {
                soundFx.playThud();
                return;
            }
            
            const targetTile = currentGrid[targetR][targetC];
            
            // 1. Solid Walls, Emitters, Bomb, and Switches (Impassable)
            if (
                targetTile === TILE_TYPES.WALL ||
                targetTile === TILE_TYPES.LASER_EMITTER ||
                targetTile === TILE_TYPES.LASER_EMITTER_INVERTED ||
                targetTile === TILE_TYPES.BOMB ||
                targetTile === TILE_TYPES.SWITCH_ON ||
                targetTile === TILE_TYPES.SWITCH_OFF
            ) {
                soundFx.playThud();
                if (targetTile === TILE_TYPES.BOMB) {
                    triggerAlert('⚠️ Armed bomb device! Evacuate all cats before it detonates!');
                } else if (
                    targetTile === TILE_TYPES.SWITCH_ON ||
                    targetTile === TILE_TYPES.SWITCH_OFF
                ) {
                    triggerAlert('Laser switch console. Press [Spacebar] while next to it to toggle.');
                }
                return;
            }
            
            // 2. Door Bump -> Converts to DOOR_OPEN
            if (targetTile === TILE_TYPES.DOOR) {
                if (currentInv.key > 0) {
                    soundFx.playUnlock();
                    setInventory((prev) => ({...prev, key: prev.key - 1}));
                    setGrid((prev) => {
                        const next = prev.map((row) => [...row]);
                        next[targetR][targetC] = TILE_TYPES.DOOR_OPEN;
                        return next;
                    });
                    triggerAlert(
                        <span className="inline-flex items-center gap-1.5 justify-center">
              Unlocked door with <GiKey className="text-yellow-400 text-sm"/> Golden Key!
            </span>
                    );
                    return;
                }
                soundFx.playThud();
                triggerAlert(
                    <span className="inline-flex items-center gap-1.5 justify-center">
            Locked! Find a <GiKey className="text-yellow-400 text-sm"/> Golden Key.
          </span>
                );
                return;
            }
            
            // 3. Fire Bump -> Converts to FIRE_EXTINGUISHED
            if (targetTile === TILE_TYPES.FIRE) {
                if (currentInv.pail > 0) {
                    soundFx.playUnlock();
                    setInventory((prev) => ({...prev, pail: prev.pail - 1}));
                    setGrid((prev) => {
                        const next = prev.map((row) => [...row]);
                        next[targetR][targetC] = TILE_TYPES.FIRE_EXTINGUISHED;
                        return next;
                    });
                    triggerAlert(
                        <span className="inline-flex items-center gap-1.5 justify-center">
              Doused <GiCampfire className="text-orange-400 text-sm"/> flames with <GiWaterDrop
                            className="text-cyan-400 text-sm"/> Water Pail!
            </span>
                    );
                    return;
                }
                soundFx.playThud();
                triggerAlert(
                    <span className="inline-flex items-center gap-1.5 justify-center">
            Flames too hot! Retrieve a <GiWaterDrop className="text-cyan-400 text-sm"/> Water Pail.
          </span>
                );
                return;
            }
            
            // 4. Ditch & Ladder
            if (targetTile === TILE_TYPES.DITCH) {
                if (currentInv.ladder > 0) {
                    soundFx.playUnlock();
                    setInventory((prev) => ({...prev, ladder: prev.ladder - 1}));
                    setGrid((prev) => {
                        const next = prev.map((row) => [...row]);
                        next[targetR][targetC] = TILE_TYPES.BRIDGE;
                        return next;
                    });
                    triggerAlert(
                        <span className="inline-flex items-center gap-1.5 justify-center">
              Deployed <TbLadder className="text-emerald-400 text-sm"/> Ladder! (Press Space to reclaim)
            </span>
                    );
                    return;
                }
                soundFx.playThud();
                triggerAlert(
                    <span className="inline-flex items-center gap-1.5 justify-center">
                        Deep chasm! Retrieve a <TbLadder className="text-emerald-400 text-sm"/> Ladder. (Hint: Use [Spacebar] to reclaim)
                    </span>
                );
                return;
            }
            
            // 5. Cracked Wall -> Converts to RUBBLE
            if (targetTile === TILE_TYPES.CRACKED_WALL) {
                if (currentInv.rock > 0 && currentInv.stick > 0) {
                    soundFx.playUnlock();
                    setInventory((prev) => ({
                        ...prev,
                        rock: prev.rock - 1,
                        stick: prev.stick - 1,
                    }));
                    setGrid((prev) => {
                        const next = prev.map((row) => [...row]);
                        next[targetR][targetC] = TILE_TYPES.RUBBLE;
                        return next;
                    });
                    triggerAlert(
                        <span className="inline-flex items-center gap-1.5 justify-center">
              Combined <GiRock className="text-stone-300 text-sm"/> Rock + <GiWoodStick
                            className="text-amber-600 text-sm"/> Stick to smash barrier!
            </span>
                    );
                    return;
                }
                soundFx.playThud();
                triggerAlert(
                    <span className="inline-flex items-center gap-1.5 justify-center">
            Reinforced barrier! Collect 1 <GiRock className="text-stone-300 text-sm"/> Rock + 1 <GiWoodStick
                        className="text-amber-600 text-sm"/> Stick.
          </span>
                );
                return;
            }
            
            // 6. Toxic Gas
            if (targetTile === TILE_TYPES.GAS) {
                if (currentInv.mask === 0) {
                    soundFx.playThud();
                    triggerAlert(
                        <span className="inline-flex items-center gap-1.5 justify-center">
              Toxic fumes! Equip a <GiGasMask className="text-teal-300 text-sm"/> Gas Mask.
            </span>
                    );
                    return;
                }
            }
            
            // 7. Active Lasers
            if (
                targetTile === TILE_TYPES.LASER_H ||
                targetTile === TILE_TYPES.LASER_V ||
                targetTile === TILE_TYPES.LASER_INV_ON_H ||
                targetTile === TILE_TYPES.LASER_INV_ON_V
            ) {
                soundFx.playThud();
                triggerAlert(
                    <span className="inline-flex items-center gap-1.5 justify-center">
            Lethal laser beam! Toggle the <TbToggleRight className="text-emerald-400 text-sm"/> Switch with [Spacebar].
          </span>
                );
                return;
            }
            
            // 8. Evacuation Gate
            if (targetTile === TILE_TYPES.EXIT) {
                if (currentCats >= currentLevel.totalCats) {
                    soundFx.playVictory();
                    confetti({particleCount: 90, spread: 70, origin: {y: 0.6}});
                    setIsWon(true);
                    triggerAlert(
                        <span className="inline-flex items-center gap-1.5 justify-center">
              <FaCat className="text-amber-300 text-sm"/> Cat evacuated! Sector cleared!
            </span>
                    );
                    if (onWinLevel) onWinLevel();
                } else {
                    soundFx.playThud();
                    triggerAlert(
                        <span className="inline-flex items-center gap-1.5 justify-center">
              <GiExitDoor
                  className="text-emerald-400 text-sm"/> Evacuation locked! Rescue all cats first ({currentCats}/{currentLevel.totalCats}).
            </span>
                    );
                    return;
                }
            }
            
            // 9. Item Pickups
            const itemConfigs = {
                [TILE_TYPES.KEY]: {
                    key: 'key',
                    icon: <GiKey className="text-yellow-400 text-sm"/>,
                    label: 'Golden Key',
                },
                [TILE_TYPES.PAIL]: {
                    key: 'pail',
                    icon: <GiWaterDrop className="text-cyan-400 text-sm"/>,
                    label: 'Water Pail',
                },
                [TILE_TYPES.LADDER]: {
                    key: 'ladder',
                    icon: <TbLadder className="text-emerald-400 text-sm"/>,
                    label: 'Ladder',
                },
                [TILE_TYPES.MASK]: {
                    key: 'mask',
                    icon: <GiGasMask className="text-teal-300 text-sm"/>,
                    label: 'Gas Mask',
                },
                [TILE_TYPES.ROCK]: {
                    key: 'rock',
                    icon: <GiRock className="text-stone-300 text-sm"/>,
                    label: 'Rock',
                },
                [TILE_TYPES.STICK]: {
                    key: 'stick',
                    icon: <GiWoodStick className="text-amber-600 text-sm"/>,
                    label: 'Stick',
                },
            };
            
            if (itemConfigs[targetTile]) {
                soundFx.playPickup();
                const info = itemConfigs[targetTile];
                setInventory((prev) => ({...prev, [info.key]: prev[info.key] + 1}));
                setGrid((prev) => {
                    const next = prev.map((row) => [...row]);
                    next[targetR][targetC] = TILE_TYPES.FLOOR;
                    return next;
                });
                triggerAlert(
                    <span className="inline-flex items-center gap-1.5 justify-center">
                        Acquired 1 {info.icon} {info.label}!
                    </span>
                );
            }
            
            // 10. Cat Rescue
            if (targetTile === TILE_TYPES.CAT) {
                soundFx.playPickup();
                const nextSaved = currentCats + 1;
                setCatsSaved(nextSaved);
                setGrid((prev) => {
                    const next = prev.map((row) => [...row]);
                    next[targetR][targetC] = TILE_TYPES.FLOOR;
                    return next;
                });
                
                if (nextSaved >= currentLevel.totalCats) {
                    triggerAlert(
                        <span className="inline-flex items-center gap-1.5 justify-center">
              <FaCat className="text-amber-300 text-sm"/> All cats rescued! Proceed to the <GiExitDoor
                            className="text-emerald-400 text-sm"/> Exit Gate.
            </span>
                    );
                } else {
                    triggerAlert(
                        <span className="inline-flex items-center gap-1.5 justify-center">
              Rescued <FaCat className="text-amber-300 text-sm"/> cat! ({nextSaved}/{currentLevel.totalCats})
            </span>
                    );
                }
            } else if (targetTile !== TILE_TYPES.EXIT && !itemConfigs[targetTile]) {
                // Standard floor movement -> Quiet footstep & reset alert state
                soundFx.playStep();
                setIsTacticalAlert(false);
            }
            
            setPlayerPos({r: targetR, c: targetC});
            
            const vr = currentLevel.visionRadius || 2;
            setVisited((prev) => {
                const next = prev.map((row) => [...row]);
                for (let r = 0; r < next.length; r++) {
                    for (let c = 0; c < next[0].length; c++) {
                        if (Math.abs(targetR - r) + Math.abs(targetC - c) <= vr) {
                            next[r][c] = true;
                        }
                    }
                }
                return next;
            });
        },
        [onWinLevel]
    );
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' || e.key === ' ') {
                e.preventDefault();
                handleSpaceAction();
                return;
            }
            
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    e.preventDefault();
                    movePlayer(-1, 0);
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    e.preventDefault();
                    movePlayer(1, 0);
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    e.preventDefault();
                    movePlayer(0, -1);
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    e.preventDefault();
                    movePlayer(0, 1);
                    break;
                default:
                    break;
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [movePlayer, handleSpaceAction]);
    
    return {
        grid,
        playerPos,
        inventory,
        catsSaved,
        visited,
        tacticalMessage,
        isTacticalAlert,
        timeLeft,
        isWon,
        isLost,
        movePlayer,
        handleSpaceAction,
        restartLevel,
    };
}