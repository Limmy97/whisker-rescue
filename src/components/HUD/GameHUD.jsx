import React from 'react';
import {
    Box,
    Flex,
    HStack,
    VStack,
    Text,
    Badge,
    Button,
    IconButton,
    Tooltip,
    SimpleGrid,
} from '@chakra-ui/react';
import {
    FaArrowUp,
    FaArrowDown,
    FaArrowLeft,
    FaArrowRight,
    FaHand,
    FaRotateLeft,
} from 'react-icons/fa6';
import {GiThorHammer} from 'react-icons/gi';
import {TILE_TYPES, TILE_CONFIG} from '../../constants/tiles';

const T = TILE_TYPES;
const C = TILE_CONFIG;

export default function GameHUD({
                                    inventory = {key: 0, pail: 0, ladder: 0, mask: 0, rock: 0, stick: 0},
                                    isWon = false,
                                    isLost = false,
                                    onNextLevel,
                                    onRetryLevel,
                                    onMove,
                                    onSpaceAction,
                                }) {
    const hasGasMask = inventory.mask > 0;
    const isHammerCrafted = inventory.rock > 0 && inventory.stick > 0;
    const hammerCount = Math.min(inventory.rock, inventory.stick);
    
    return (
        <VStack w="full" spacing={2.5} align="stretch" justify="center">
            {/* Tactical Gear Inventory Box */}
            <Box
                p={2.5}
                bg="gray.850"
                rounded="xl"
                border="1px solid"
                borderColor="whiteAlpha.150"
            >
                <Text
                    fontSize="2xs"
                    fontWeight="black"
                    color="gray.400"
                    letterSpacing="widest"
                    mb={2}
                    textAlign="center"
                    textTransform="uppercase"
                >
                    Tactical Gear
                </Text>
                
                {/* 2-Column Grid on desktop sidebar (fits 240px perfectly), 3-Column on mobile */}
                <SimpleGrid columns={{base: 3, sm: 3, lg: 2}} spacing={1.5}>
                    {/* 1. Golden Key */}
                    <HStack
                        justify="space-between"
                        px={2}
                        py={1.5}
                        bg="gray.900"
                        rounded="md"
                        border="1px solid"
                        borderColor={inventory.key > 0 ? 'yellow.500/50' : 'whiteAlpha.100'}
                        opacity={inventory.key > 0 ? 1 : 0.45}
                    >
                        <HStack spacing={1.5} minW={0}>
                            <Box p={0.5} shrink={0}>{C[T.KEY]?.icon}</Box>
                            <Text fontSize="2xs" color="gray.300" fontWeight="semibold" noOfLines={1}>
                                Key
                            </Text>
                        </HStack>
                        <Badge
                            colorScheme={inventory.key > 0 ? 'yellow' : 'gray'}
                            variant={inventory.key > 0 ? 'solid' : 'subtle'}
                            fontSize="2xs"
                            px={1.5}
                            py={0.2}
                            rounded="sm"
                        >
                            x{inventory.key}
                        </Badge>
                    </HStack>
                    
                    {/* 2. Water Pail */}
                    <HStack
                        justify="space-between"
                        px={2}
                        py={1.5}
                        bg="gray.900"
                        rounded="md"
                        border="1px solid"
                        borderColor={inventory.pail > 0 ? 'cyan.500/50' : 'whiteAlpha.100'}
                        opacity={inventory.pail > 0 ? 1 : 0.45}
                    >
                        <HStack spacing={1.5} minW={0}>
                            <Box p={0.5} shrink={0}>{C[T.PAIL]?.icon}</Box>
                            <Text fontSize="2xs" color="gray.300" fontWeight="semibold" noOfLines={1}>
                                Pail
                            </Text>
                        </HStack>
                        <Badge
                            colorScheme={inventory.pail > 0 ? 'cyan' : 'gray'}
                            variant={inventory.pail > 0 ? 'solid' : 'subtle'}
                            fontSize="2xs"
                            px={1.5}
                            py={0.2}
                            rounded="sm"
                        >
                            x{inventory.pail}
                        </Badge>
                    </HStack>
                    
                    {/* 3. Ladder */}
                    <HStack
                        justify="space-between"
                        px={2}
                        py={1.5}
                        bg="gray.900"
                        rounded="md"
                        border="1px solid"
                        borderColor={inventory.ladder > 0 ? 'emerald.500/50' : 'whiteAlpha.100'}
                        opacity={inventory.ladder > 0 ? 1 : 0.45}
                    >
                        <HStack spacing={1.5} minW={0}>
                            <Box p={0.5} shrink={0}>{C[T.LADDER]?.icon}</Box>
                            <Text fontSize="2xs" color="gray.300" fontWeight="semibold" noOfLines={1}>
                                Ladder
                            </Text>
                        </HStack>
                        <Badge
                            colorScheme={inventory.ladder > 0 ? 'emerald' : 'gray'}
                            variant={inventory.ladder > 0 ? 'solid' : 'subtle'}
                            fontSize="2xs"
                            px={1.5}
                            py={0.2}
                            rounded="sm"
                        >
                            x{inventory.ladder}
                        </Badge>
                    </HStack>
                    
                    {/* 4. Gas Mask */}
                    <HStack
                        justify="space-between"
                        px={2}
                        py={1.5}
                        bg={hasGasMask ? 'teal.950/60' : 'gray.900'}
                        rounded="md"
                        border="1px solid"
                        borderColor={hasGasMask ? 'teal.400/60' : 'whiteAlpha.100'}
                        opacity={hasGasMask ? 1 : 0.45}
                    >
                        <HStack spacing={1.5} minW={0}>
                            <Box p={0.5} shrink={0}>{C[T.MASK]?.icon}</Box>
                            <Text fontSize="2xs" color="gray.300" fontWeight="semibold" noOfLines={1}>
                                Mask
                            </Text>
                        </HStack>
                        <Badge
                            colorScheme={hasGasMask ? 'teal' : 'gray'}
                            variant={hasGasMask ? 'solid' : 'subtle'}
                            fontSize="3xs"
                            px={1}
                            py={0.5}
                            rounded="sm"
                        >
                            {hasGasMask ? 'ON' : 'OFF'}
                        </Badge>
                    </HStack>
                    
                    {/* 5 & 6. Hammer OR Separate Rock + Stick */}
                    {isHammerCrafted ? (
                        <HStack
                            gridColumn={{base: 'span 2', lg: 'span 2'}}
                            justify="space-between"
                            px={2.5}
                            py={1.5}
                            bg="amber.950/60"
                            rounded="md"
                            border="1px solid"
                            borderColor="amber.400/60"
                        >
                            <HStack spacing={1.5} minW={0}>
                                <GiThorHammer className="w-4 h-4 text-amber-400 shrink-0"/>
                                <Text fontSize="2xs" color="amber-300" fontWeight="bold" noOfLines={1}>
                                    Breaker
                                </Text>
                            </HStack>
                            <Badge colorScheme="orange" variant="solid" fontSize="2xs" px={2} py={0.2} rounded="sm">
                                x{hammerCount} READY
                            </Badge>
                        </HStack>
                    ) : (
                        <>
                            {/* Rock */}
                            <HStack
                                justify="space-between"
                                px={2}
                                py={1.5}
                                bg="gray.900"
                                rounded="md"
                                border="1px solid"
                                borderColor={inventory.rock > 0 ? 'stone.500/50' : 'whiteAlpha.100'}
                                opacity={inventory.rock > 0 ? 1 : 0.45}
                            >
                                <HStack spacing={1.5} minW={0}>
                                    <Box p={0.5} shrink={0}>{C[T.ROCK]?.icon}</Box>
                                    <Text fontSize="2xs" color="gray.300" fontWeight="semibold" noOfLines={1}>
                                        Rock
                                    </Text>
                                </HStack>
                                <Badge
                                    colorScheme={inventory.rock > 0 ? 'stone' : 'gray'}
                                    variant={inventory.rock > 0 ? 'solid' : 'subtle'}
                                    fontSize="2xs"
                                    px={1.5}
                                    py={0.2}
                                    rounded="sm"
                                >
                                    x{inventory.rock}
                                </Badge>
                            </HStack>
                            
                            {/* Stick */}
                            <HStack
                                justify="space-between"
                                px={2}
                                py={1.5}
                                bg="gray.900"
                                rounded="md"
                                border="1px solid"
                                borderColor={inventory.stick > 0 ? 'amber.600/50' : 'whiteAlpha.100'}
                                opacity={inventory.stick > 0 ? 1 : 0.45}
                            >
                                <HStack spacing={1.5} minW={0}>
                                    <Box p={0.5} shrink={0}>{C[T.STICK]?.icon}</Box>
                                    <Text fontSize="2xs" color="gray.300" fontWeight="semibold" noOfLines={1}>
                                        Stick
                                    </Text>
                                </HStack>
                                <Badge
                                    colorScheme={inventory.stick > 0 ? 'orange' : 'gray'}
                                    variant={inventory.stick > 0 ? 'solid' : 'subtle'}
                                    fontSize="2xs"
                                    px={1.5}
                                    py={0.2}
                                    rounded="sm"
                                >
                                    x{inventory.stick}
                                </Badge>
                            </HStack>
                        </>
                    )}
                </SimpleGrid>
            </Box>
            
            {/* Outcome Buttons */}
            {isWon && (
                <Button
                    w="full"
                    size="sm"
                    colorScheme="yellow"
                    color="gray.950"
                    fontWeight="black"
                    onClick={onNextLevel}
                    boxShadow="0 0 15px rgba(250, 204, 21, 0.4)"
                >
                    Next Sector →
                </Button>
            )}
            
            {isLost && (
                <Button
                    w="full"
                    size="sm"
                    colorScheme="red"
                    fontWeight="black"
                    leftIcon={<FaRotateLeft/>}
                    onClick={onRetryLevel}
                    boxShadow="0 0 15px rgba(239, 68, 68, 0.4)"
                >
                    Retry Sector
                </Button>
            )}
            
            {/* Controls Container */}
            <Flex
                direction={{base: 'row', lg: 'column'}}
                align="center"
                justify="space-between"
                gap={{base: 2.5, lg: 2.5}}
                p={2.5}
                bg="gray.850"
                rounded="xl"
                border="1px solid"
                borderColor="whiteAlpha.150"
            >
                {/* Left Side: Space / Action Trigger */}
                <Tooltip label="Toggle Switch / Reclaim Ladder (Spacebar)">
                    <Button
                        size="sm"
                        w={{base: '110px', sm: '130px', lg: 'full'}}
                        h={{base: '84px', lg: '38px'}}
                        colorScheme="yellow"
                        variant="outline"
                        borderColor="yellow.500/60"
                        color="yellow.400"
                        leftIcon={<FaHand size={16}/>}
                        isDisabled={isLost || isWon}
                        _disabled={{
                            opacity: 0.5,
                            borderColor: 'whiteAlpha.200',
                            color: 'gray.500',
                            cursor: 'not-allowed',
                        }}
                        onClick={onSpaceAction}
                        px={2}
                        fontSize="xs"
                        fontWeight="bold"
                        whiteSpace="normal"
                        textAlign="center"
                    >
                        Action / Space
                    </Button>
                </Tooltip>
                
                {/* Right Side: D-Pad */}
                <Flex direction="column" align="center" gap={1.5}>
                    {/* UP */}
                    <IconButton
                        aria-label="Up"
                        icon={<FaArrowUp size={16}/>}
                        size="md"
                        w={{base: '46px', sm: '48px'}}
                        h={{base: '42px', sm: '44px'}}
                        bg="gray.700"
                        color="white"
                        border="1px solid"
                        borderColor="whiteAlpha.300"
                        _hover={{bg: 'gray.600'}}
                        _active={{bg: 'yellow.500', color: 'gray.950'}}
                        _disabled={{
                            opacity: 0.45,
                            bg: 'gray.800',
                            color: 'gray.400',
                            borderColor: 'whiteAlpha.100',
                            cursor: 'not-allowed',
                        }}
                        isDisabled={isLost || isWon}
                        onClick={() => onMove(-1, 0)}
                    />
                    
                    {/* LEFT - DOWN - RIGHT */}
                    <HStack spacing={1.5}>
                        <IconButton
                            aria-label="Left"
                            icon={<FaArrowLeft size={16}/>}
                            size="md"
                            w={{base: '46px', sm: '48px'}}
                            h={{base: '42px', sm: '44px'}}
                            bg="gray.700"
                            color="white"
                            border="1px solid"
                            borderColor="whiteAlpha.300"
                            _hover={{bg: 'gray.600'}}
                            _active={{bg: 'yellow.500', color: 'gray.950'}}
                            _disabled={{
                                opacity: 0.45,
                                bg: 'gray.800',
                                color: 'gray.400',
                                borderColor: 'whiteAlpha.100',
                                cursor: 'not-allowed',
                            }}
                            isDisabled={isLost || isWon}
                            onClick={() => onMove(0, -1)}
                        />
                        <IconButton
                            aria-label="Down"
                            icon={<FaArrowDown size={16}/>}
                            size="md"
                            w={{base: '46px', sm: '48px'}}
                            h={{base: '42px', sm: '44px'}}
                            bg="gray.700"
                            color="white"
                            border="1px solid"
                            borderColor="whiteAlpha.300"
                            _hover={{bg: 'gray.600'}}
                            _active={{bg: 'yellow.500', color: 'gray.950'}}
                            _disabled={{
                                opacity: 0.45,
                                bg: 'gray.800',
                                color: 'gray.400',
                                borderColor: 'whiteAlpha.100',
                                cursor: 'not-allowed',
                            }}
                            isDisabled={isLost || isWon}
                            onClick={() => onMove(1, 0)}
                        />
                        <IconButton
                            aria-label="Right"
                            icon={<FaArrowRight size={16}/>}
                            size="md"
                            w={{base: '46px', sm: '48px'}}
                            h={{base: '42px', sm: '44px'}}
                            bg="gray.700"
                            color="white"
                            border="1px solid"
                            borderColor="whiteAlpha.300"
                            _hover={{bg: 'gray.600'}}
                            _active={{bg: 'yellow.500', color: 'gray.950'}}
                            _disabled={{
                                opacity: 0.45,
                                bg: 'gray.800',
                                color: 'gray.400',
                                borderColor: 'whiteAlpha.100',
                                cursor: 'not-allowed',
                            }}
                            isDisabled={isLost || isWon}
                            onClick={() => onMove(0, 1)}
                        />
                    </HStack>
                </Flex>
            </Flex>
        </VStack>
    );
}