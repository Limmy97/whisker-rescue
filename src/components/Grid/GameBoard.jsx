import React from 'react';
import {Box, Flex, Text} from '@chakra-ui/react';
import Tile from './Tile';
import {TILE_TYPES} from '../../constants/tiles';

export default function GameBoard({
                                      grid = [],
                                      playerPos = {r: 0, c: 0},
                                      visited = [],
                                      fogOfWar = true,
                                      visionRadius = 2,
                                      timeLeft = 60,
                                      isPaused = false,
                                      isLost = false,
                                      onTileClick,
                                  }) {
    if (!grid || grid.length === 0) {
        return (
            <Box p={4} textAlign="center" color="gray.500">
                No map loaded.
            </Box>
        );
    }
    
    const rows = grid.length;
    const cols = grid[0].length;
    
    const getVisibility = (r, c) => {
        if (!fogOfWar) return 'VISIBLE';
        const manhattanDist = Math.abs(playerPos.r - r) + Math.abs(playerPos.c - c);
        if (manhattanDist <= visionRadius) return 'VISIBLE';
        if (visited && visited[r] && visited[r][c]) return 'DIMMED';
        return 'HIDDEN';
    };
    
    return (
        <Flex
            w="full"
            justify="center"
            align="center"
            p={{base: 1.5, sm: 2.5}}
            bg="gray.950"
            rounded="xl"
            border="1px solid"
            borderColor={isLost ? 'red.500/50' : 'whiteAlpha.100'}
            boxShadow={isLost ? '0 0 25px rgba(239,68,68,0.25)' : 'inset 0 0 20px rgba(0,0,0,0.5)'}
            position="relative"
            overflow="hidden"
        >
            <Box
                display="grid"
                gap="1.5px"
                style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                    aspectRatio: `${cols} / ${rows}`,
                    width: `min(100%, calc(68vh * (${cols} / ${rows})))`,
                    maxHeight: '68vh',
                }}
                className="mx-auto select-none"
            >
                {isPaused
                    ? Array.from({length: rows}).map((_, r) =>
                        Array.from({length: cols}).map((_, c) => (
                            <Tile
                                key={`paused-${r}-${c}`}
                                type={TILE_TYPES.WALL}
                                isPlayer={false}
                                visibility="VISIBLE"
                                timeLeft={timeLeft}
                                isLost={false}
                            />
                        ))
                    )
                    : grid.map((rowArr, r) =>
                        rowArr.map((tileType, c) => (
                            <Tile
                                key={`${r}-${c}`}
                                type={tileType}
                                isPlayer={playerPos.r === r && playerPos.c === c}
                                visibility={getVisibility(r, c)}
                                timeLeft={timeLeft}
                                isLost={isLost}
                                onClick={() => onTileClick && onTileClick(r, c)}
                            />
                        ))
                    )}
            </Box>
            
            {/* Paused Overlay */}
            {isPaused && (
                <Flex
                    position="absolute"
                    inset={0}
                    bg="blackAlpha.750"
                    backdropFilter="blur(4px)"
                    rounded="xl"
                    align="center"
                    justify="center"
                    direction="column"
                    zIndex={20}
                >
                    <Text fontSize="md" fontWeight="black" color="yellow.400" letterSpacing="widest">
                        OPERATION PAUSED
                    </Text>
                    <Text fontSize="2xs" color="gray.400">
                        Field Manual open. Map view redacted.
                    </Text>
                </Flex>
            )}
        </Flex>
    );
}