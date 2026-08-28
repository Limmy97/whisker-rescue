import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    VStack,
    HStack,
    Text,
    Badge,
    SimpleGrid,
    Box,
    Divider, Flex,
} from '@chakra-ui/react';
import {TbArrowRight} from 'react-icons/tb';
import {TILE_TYPES, TILE_CONFIG} from '../../constants/tiles';

const T = TILE_TYPES;
const C = TILE_CONFIG;

const CODEX_CATEGORIES = [
    {
        category: 'Target & Evacuation',
        items: [
            {tileType: T.CAT, desc: 'Primary objective. Move onto tile to rescue.'},
            {tileType: T.ENTRANCE, desc: 'Mission deployment starting point.'},
            {tileType: T.EXIT, desc: 'Extract point. Unlocks once ALL cats in the sector are rescued.'},
            {tileType: T.BOMB, desc: 'Armed device ticking down to zero. Always visible through fog.'},
        ],
    },
    {
        category: 'Rescue Gear & Items',
        items: [
            {tileType: T.KEY, desc: 'Consumable tool. Automatically unlocks locked security doors.'},
            {tileType: T.PAIL, desc: 'Consumable tool. Douses roaring campfires on contact.'},
            {
                tileType: T.LADDER,
                desc: 'Reusable tool. Deploys over chasms. Press [Spacebar] from solid ground to reclaim.'
            },
            {tileType: T.MASK, desc: 'Passive gear. Grants permanent immunity to toxic fumes while held.'},
            {
                customIcon: (
                    <HStack spacing={1} className="pickup-float">
                        {C[T.ROCK]?.icon}
                        <Text fontSize="xs" className="text-gray-400">+</Text>
                        {C[T.STICK]?.icon}
                    </HStack>
                ),
                name: `${C[T.ROCK]?.label} + ${C[T.STICK]?.label}`,
                desc: 'Craft combo. Bump into cracked walls with both in inventory to break through.',
            },
        ],
    },
    {
        category: 'Hazard Barriers & Security',
        items: [
            {tileType: T.DOOR, desc: 'Impassable barrier until unlocked with a key.'},
            {tileType: T.FIRE, desc: 'Hazard barrier extinguished by water.'},
            {tileType: T.DITCH, desc: 'Deep drop bridged by placing a ladder.'},
            {tileType: T.GAS, desc: 'Hazardous fog. Walkable only with Gas Mask equipped.'},
            {tileType: T.CRACKED_WALL, desc: 'Fragile barrier breakable with makeshift tools.'},
            {tileType: T.SWITCH_ON, desc: 'Toggle terminal for standard and inverted laser networks.'},
            {tileType: T.LASER_EMITTER, desc: 'Standard Tesla Turret. Lasers are ON when switch is ON.'},
            {
                tileType: T.LASER_EMITTER_INVERTED,
                desc: 'Inverted Sentry Gun. Lasers are OFF when switch is ON, and ON when switch is OFF.'
            },
            {tileType: T.LASER_H, desc: 'Standard Red Laser. Active when Switch is ON.'},
            {tileType: T.LASER_INV_ON_H, desc: 'Inverted Purple Laser. Active when Switch is OFF.'},
        ],
    },
];

const TOOL_OBSTACLE_MAPPINGS = [
    {
        toolTile: T.KEY,
        obstacleTile: T.DOOR,
        actionNote: 'One-time consumable',
        badgeColor: 'yellow',
    },
    {
        toolTile: T.PAIL,
        obstacleTile: T.FIRE,
        actionNote: 'One-time consumable',
        badgeColor: 'cyan',
    },
    {
        toolTile: T.LADDER,
        obstacleTile: T.DITCH,
        actionNote: 'Reusable: [Spacebar] to reclaim',
        badgeColor: 'emerald',
    },
    {
        toolTile: T.MASK,
        obstacleTile: T.GAS,
        actionNote: 'Passive: walk freely while held',
        badgeColor: 'teal',
    },
    {
        customToolIcon: (
            <HStack spacing={1} className="pickup-float">
                {C[T.ROCK]?.icon}
                <Text fontSize="2xs" className="text-gray-400">+</Text>
                {C[T.STICK]?.icon}
            </HStack>
        ),
        toolName: 'Rock + Stick',
        obstacleTile: T.CRACKED_WALL,
        actionNote: 'Craft combo: consumes both to smash',
        badgeColor: 'orange',
    },
    {
        toolTile: T.SWITCH_ON,
        customObstacleIcon: (
            <HStack spacing={1}>
                {C[T.LASER_EMITTER]?.icon}
                {C[T.LASER_EMITTER_INVERTED]?.icon}
            </HStack>
        ),
        obstacleName: 'Tesla & Sentry Laser Networks',
        actionNote: 'Toggle state with [Spacebar]',
        badgeColor: 'purple',
    },
];

export default function CodexModal({isOpen, onClose}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" scrollBehavior="inside">
            <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.800"/>
            <ModalContent bg="gray.900" borderColor="whiteAlpha.300" borderWidth={1} color="white" rounded="xl">
                <ModalHeader borderBottom="1px solid" borderColor="whiteAlpha.200" pb={3}>
                    <HStack justify="space-between" pr={6}>
                        <HStack spacing={2}>
                            <Text fontSize="xl">📖</Text>
                            <Text fontWeight="black" letterSpacing="wide">
                                Tactical Codex & Field Manual
                            </Text>
                        </HStack>
                        <Badge colorScheme="red" variant="solid" px={2} py={0.5} rounded="md" fontSize="2xs">
                            TIME PAUSED
                        </Badge>
                    </HStack>
                </ModalHeader>
                <ModalCloseButton/>
                
                <ModalBody py={4} px={5}>
                    <VStack spacing={5} align="stretch">
                        {CODEX_CATEGORIES.map((cat, idx) => {
                            const isGearCategory = cat.category === 'Rescue Gear & Items';
                            
                            return (
                                <Box key={idx}>
                                    <Text
                                        fontSize="xs"
                                        fontWeight="black"
                                        letterSpacing="widest"
                                        color="yellow.400"
                                        textTransform="uppercase"
                                        mb={2.5}
                                    >
                                        {cat.category}
                                    </Text>
                                    
                                    <SimpleGrid columns={{base: 1, sm: 2}} spacing={2.5}>
                                        {cat.items.map((item, i) => {
                                            const config = item.tileType !== undefined ? C[item.tileType] : null;
                                            const rawIcon = item.customIcon || config?.icon;
                                            const name = item.name || config?.label;
                                            
                                            return (
                                                <Flex
                                                    key={i}
                                                    p={2}
                                                    bg="gray.850"
                                                    rounded="lg"
                                                    border="1px solid"
                                                    borderColor="whiteAlpha.100"
                                                    align="center"
                                                    gap={3}
                                                >
                                                    <Box
                                                        p={1.5}
                                                        bg="gray.900"
                                                        rounded="md"
                                                        border="1px solid"
                                                        borderColor="whiteAlpha.200"
                                                        shrink={0}
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        minW="36px"
                                                        minH="36px"
                                                    >
                                                        {/* Apply pickup-float for rescue gear icons */}
                                                        {isGearCategory && item.tileType !== undefined ? (
                                                            <Box
                                                                className="pickup-float flex items-center justify-center">
                                                                {rawIcon}
                                                            </Box>
                                                        ) : (
                                                            rawIcon
                                                        )}
                                                    </Box>
                                                    <VStack align="start" spacing={0}>
                                                        <Text fontSize="xs" fontWeight="bold" color="white">
                                                            {name}
                                                        </Text>
                                                        <Text fontSize="2xs" color="gray.400" lineHeight="short">
                                                            {item.desc}
                                                        </Text>
                                                    </VStack>
                                                </Flex>
                                            );
                                        })}
                                    </SimpleGrid>
                                    {idx < CODEX_CATEGORIES.length - 1 &&
                                        <Divider borderColor="whiteAlpha.100" mt={4}/>}
                                </Box>
                            );
                        })}
                        
                        <Divider borderColor="whiteAlpha.200" my={1}/>
                        
                        {/* Quick Reference */}
                        <Box>
                            <Text
                                fontSize="xs"
                                fontWeight="black"
                                letterSpacing="widest"
                                color="yellow.400"
                                textTransform="uppercase"
                                mb={2.5}
                            >
                                Tool ➔ Obstacle Quick Reference
                            </Text>
                            
                            <VStack spacing={2} align="stretch">
                                {TOOL_OBSTACLE_MAPPINGS.map((map, i) => {
                                    const toolConfig = map.toolTile !== undefined ? C[map.toolTile] : null;
                                    const obstacleConfig = map.obstacleTile !== undefined ? C[map.obstacleTile] : null;
                                    
                                    const rawToolIcon = map.customToolIcon || toolConfig?.icon;
                                    const toolName = map.toolName || toolConfig?.label;
                                    
                                    const obstacleIcon = map.customObstacleIcon || obstacleConfig?.icon;
                                    const obstacleName = map.obstacleName || obstacleConfig?.label;
                                    
                                    // Exclude switch terminal from float effect in tools list
                                    const shouldFloat = map.toolTile !== T.SWITCH_ON;
                                    
                                    return (
                                        <Flex
                                            key={i}
                                            p={2.5}
                                            bg="gray.850"
                                            rounded="lg"
                                            border="1px solid"
                                            borderColor="whiteAlpha.150"
                                            justify="space-between"
                                            align="center"
                                            wrap="wrap"
                                            gap={2}
                                        >
                                            <HStack spacing={3} align="center">
                                                <HStack spacing={1.5} minW="120px">
                                                    <Box p={1} bg="gray.900" rounded="md" border="1px solid"
                                                         borderColor="whiteAlpha.100">
                                                        {shouldFloat && map.toolTile !== undefined ? (
                                                            <Box
                                                                className="pickup-float flex items-center justify-center">
                                                                {rawToolIcon}
                                                            </Box>
                                                        ) : (
                                                            rawToolIcon
                                                        )}
                                                    </Box>
                                                    <Text fontSize="xs" fontWeight="bold">
                                                        {toolName}
                                                    </Text>
                                                </HStack>
                                                
                                                <TbArrowRight className="text-gray-500 shrink-0" size={16}/>
                                                
                                                <HStack spacing={1.5}>
                                                    <Box p={1} bg="gray.900" rounded="md" border="1px solid"
                                                         borderColor="whiteAlpha.100">
                                                        {obstacleIcon}
                                                    </Box>
                                                    <Text fontSize="xs" fontWeight="bold" color="gray.300">
                                                        {obstacleName}
                                                    </Text>
                                                </HStack>
                                            </HStack>
                                            
                                            <Badge colorScheme={map.badgeColor} fontSize="2xs" px={2} py={0.5}
                                                   rounded="md" variant="subtle">
                                                {map.actionNote}
                                            </Badge>
                                        </Flex>
                                    );
                                })}
                            </VStack>
                        </Box>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}