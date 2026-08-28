import React, {useEffect, useState} from 'react';
import {
    Badge,
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Progress,
    SimpleGrid,
    Text,
    Tooltip,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import {Activity, BookOpen, Grid, Lightbulb, LogOut, Play, Volume2, VolumeX} from 'lucide-react';
import {GiTimeBomb} from 'react-icons/gi';
import GameBoard from './components/Grid/GameBoard';
import GameHUD from './components/HUD/GameHUD';
import CodexModal from './components/Modals/CodexModal';
import ExitConfirmModal from './components/Modals/ExitConfirmModal';
import {LEVELS} from './constants/levels';
import {useGameLoop} from './hooks/useGameLoop';
import {soundFx} from './utils/audio';
import {TbMaximize, TbMinimize} from "react-icons/tb";
import {useFullscreen} from "./hooks/useFullscreen.js";

function formatTime(totalSeconds) {
    const mins = Math.floor(Math.max(0, totalSeconds) / 60);
    const secs = Math.max(0, totalSeconds) % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function ActiveGameScreen({levelId, onPromptExit, onAdvanceLevel, isPaused}) {
    const [sessionKey, setSessionKey] = useState(0);
    const currentLevelData = LEVELS[levelId] || LEVELS[1];
    
    const handleWin = () => {
        const saved = localStorage.getItem('whisker_max_level');
        const currentMax = saved ? parseInt(saved, 10) : 1;
        if (levelId >= currentMax) {
            localStorage.setItem('whisker_max_level', (levelId + 1).toString());
        }
    };
    
    const {
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
    } = useGameLoop(currentLevelData, handleWin, isPaused);
    
    const handleRetry = () => {
        restartLevel();
        setSessionKey((prev) => prev + 1);
    };
    
    const isUrgent = timeLeft <= 15;
    const isWarning = timeLeft <= 30;
    const isTickEven = timeLeft % 2 === 0;
    
    let badgeScheme;
    if (isUrgent) {
        badgeScheme = isTickEven ? 'red' : 'pink';
    } else if (isWarning) {
        badgeScheme = isTickEven ? 'orange' : 'yellow';
    } else {
        badgeScheme = isTickEven ? 'yellow' : 'pink';
    }
    
    return (
        <VStack
            spacing={{base: 1.5, sm: 2}}
            w="full"
            maxW={{base: '100%', md: '5xl', lg: '7xl'}}
            mx="auto"
            px={{base: 1.5, sm: 3, md: 4}}
            key={sessionKey}
        >
            {/* 1. Header & Quick Menu */}
            <Flex w="full" justify="space-between" align="center" px={1}>
                <Heading
                    size={{base: 'xs', sm: 'sm'}}
                    fontSize={{base: 'xs', sm: 'sm', md: 'md'}}
                    lineHeight="shorter"
                    color="white"
                    fontWeight="black"
                    noOfLines={1}
                >
                    {currentLevelData.name}
                </Heading>
                <Button
                    size="xs"
                    variant="outline"
                    colorScheme="white"
                    fontSize={{base: '2xs', sm: 'xs'}}
                    px={{base: 2, sm: 3}}
                    h={{base: '22px', sm: '24px'}}
                    leftIcon={<LogOut size={10}/>}
                    onClick={onPromptExit}
                >
                    Menu
                </Button>
            </Flex>
            
            {/* 2. Top Detonation Timer Bar */}
            <Flex
                w="full"
                justify="space-between"
                align="center"
                px={{base: 2.5, sm: 4}}
                py={{base: 1.5, sm: 2}}
                bg="gray.850"
                rounded={{base: 'lg', sm: 'xl'}}
                border="2px solid"
                borderColor={
                    isUrgent
                        ? isTickEven ? 'red.500' : 'red.400'
                        : isWarning
                            ? isTickEven ? 'orange.500' : 'yellow.500'
                            : isTickEven ? 'yellow.500/60' : 'red.400'
                }
                boxShadow={
                    isUrgent
                        ? isTickEven
                            ? '0 0 25px rgba(239, 68, 68, 0.6)'
                            : '0 0 10px rgba(239, 68, 68, 0.2)'
                        : 'none'
                }
                transition="all 0.15s ease-in-out"
            >
                <HStack spacing={{base: 1.5, sm: 2}} align="center">
                    <GiTimeBomb
                        className={`transition-colors duration-150 ${
                            isUrgent
                                ? isTickEven ? 'text-red-500 scale-110' : 'text-rose-400 scale-100'
                                : isTickEven ? 'text-yellow-400' : 'text-red-400'
                        } w-5 h-5 sm:w-7 sm:h-7`}
                    />
                    <Text
                        fontSize={{base: '2xs', sm: 'xs'}}
                        fontWeight="black"
                        letterSpacing="wider"
                        color="gray.200"
                        whiteSpace="nowrap"
                    >
                        DETONATION IN:
                    </Text>
                    <Badge
                        colorScheme={badgeScheme}
                        fontSize={{base: '2xs', sm: 'xs', md: 'sm'}}
                        px={{base: 1.5, sm: 2.5}}
                        py={0.5}
                        rounded="md"
                        variant="solid"
                        fontWeight="black"
                        fontFamily="mono"
                        transition="all 0.15s ease-in-out"
                    >
                        {formatTime(timeLeft)}
                    </Badge>
                </HStack>
                
                <Badge
                    colorScheme="yellow"
                    px={{base: 2, sm: 3}}
                    py={0.5}
                    rounded="md"
                    fontSize={{base: '2xs', sm: 'xs'}}
                    fontWeight="bold"
                    whiteSpace="nowrap"
                >
                    CATS: {catsSaved} / {currentLevelData.totalCats}
                </Badge>
            </Flex>
            
            {/* 3. Global Hint */}
            <Flex
                w="full"
                align="center"
                justify="center"
                gap={1.5}
                px={{base: 2, sm: 3}}
                py={{base: 1, sm: 1.5}}
                bg="yellow.950/40"
                border="1px solid"
                borderColor="yellow.500/40"
                rounded="lg"
                textAlign="center"
                color="yellow.200"
                lineHeight="short"
            >
                <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 shrink-0"/>
                <Text
                    fontSize={{base: '2xs', sm: 'xs', md: '0.85rem'}}
                    fontWeight="semibold"
                    as="span"
                >
                    {currentLevelData.hint}
                </Text>
            </Flex>
            
            {/* 4. Real-Time Tactical Feed */}
            <Flex
                w="full"
                align="center"
                justify="center"
                gap={1.5}
                minH={{base: '24px', sm: '28px'}}
                px={{base: 2, sm: 2.5}}
                py={{base: 1, sm: 1.5}}
                bg={isTacticalAlert ? 'blue.900/90' : 'slate.900'}
                border="1px solid"
                borderColor={isTacticalAlert ? 'cyan.400' : 'whiteAlpha.150'}
                boxShadow={isTacticalAlert ? '0 0 12px rgba(56, 189, 248, 0.35)' : 'none'}
                rounded="md"
                textAlign="center"
                lineHeight="short"
                fontWeight={isTacticalAlert ? 'bold' : 'medium'}
                color={isTacticalAlert ? 'cyan.100' : 'gray.400'}
                transition="all 0.15s ease-in-out"
            >
                <Activity
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${
                        isTacticalAlert ? 'text-cyan-300 animate-pulse' : 'text-blue-400'
                    }`}
                />
                <Text
                    fontSize={{base: '2xs', sm: 'xs', md: '0.85rem'}}
                    as="span"
                >
                    {tacticalMessage}
                </Text>
            </Flex>
            
            {/* 5. Main Content Area (Side-by-side on desktop, stacked on mobile) */}
            <Flex
                w="full"
                direction={{base: 'column', lg: 'row'}}
                align="center"
                justify="center"
                gap={{base: 2, lg: 4}}
                mt={0.5}
            >
                {/* The Grid Area */}
                <Box flex="1" w="full" display="flex" justifyContent="center">
                    <GameBoard
                        grid={grid}
                        playerPos={playerPos}
                        visited={visited}
                        fogOfWar={currentLevelData.fogOfWar}
                        visionRadius={currentLevelData.visionRadius}
                        timeLeft={timeLeft}
                        isPaused={isPaused}
                        isLost={isLost}
                    />
                </Box>
                
                {/* Dynamic Sidebar / Bottom Inventory HUD */}
                <Box
                    w={{base: 'full', lg: '240px'}}
                    shrink={0}
                    display="flex"
                    justifyContent="center"
                >
                    <GameHUD
                        inventory={inventory}
                        isWon={isWon}
                        isLost={isLost}
                        onNextLevel={onAdvanceLevel}
                        onRetryLevel={handleRetry}
                        onMove={movePlayer}
                        onSpaceAction={handleSpaceAction}
                    />
                </Box>
            </Flex>
        </VStack>
    );
}

export default function App() {
    const {isFullscreen, toggleFullscreen} = useFullscreen();
    const [currentScreen, setCurrentScreen] = useState('LANDING');
    const [selectedLevel, setSelectedLevel] = useState(1);
    const [soundEnabled, setSoundEnabled] = useState(true);
    
    const totalLevels = Object.keys(LEVELS).length;
    
    const [maxUnlockedLevel, setMaxUnlockedLevel] = useState(() => {
        const saved = localStorage.getItem('whisker_max_level');
        return saved ? parseInt(saved, 10) : 1;
    });
    
    // Modals
    const {isOpen: isSelectOpen, onOpen: onSelectOpen, onClose: onSelectClose} = useDisclosure();
    const {isOpen: isCodexOpen, onOpen: onCodexOpen, onClose: onCodexClose} = useDisclosure();
    const {isOpen: isExitOpen, onOpen: onExitOpen, onClose: onExitClose} = useDisclosure();
    
    useEffect(() => {
        soundFx.enabled = soundEnabled;
    }, [soundEnabled]);
    
    const handleStartGame = (lvl = 1) => {
        setSelectedLevel(lvl);
        setCurrentScreen('GAME');
    };
    
    const handleAdvanceNextLevel = () => {
        const nextLvl = selectedLevel + 1;
        if (LEVELS[nextLvl]) {
            setSelectedLevel(nextLvl);
            if (nextLvl > maxUnlockedLevel) {
                setMaxUnlockedLevel(nextLvl);
                localStorage.setItem('whisker_max_level', nextLvl.toString());
            }
        } else {
            alert('All sectors cleared! Returning to HQ.');
            setCurrentScreen('LANDING');
        }
    };
    
    const handleConfirmExit = () => {
        onExitClose();
        const saved = localStorage.getItem('whisker_max_level');
        if (saved) setMaxUnlockedLevel(parseInt(saved, 10));
        setCurrentScreen('LANDING');
    };
    
    const handleResetProgress = () => {
        if (window.confirm('Reset all saved rescue operations?')) {
            localStorage.removeItem('whisker_max_level');
            setMaxUnlockedLevel(1);
            setSelectedLevel(1);
        }
    };
    
    const completedStages = Math.min(maxUnlockedLevel - 1, totalLevels);
    const progressPercent = Math.round((completedStages / totalLevels) * 100);
    
    // Pause game if either Codex or Exit Confirmation is active
    const isGamePaused = isCodexOpen || isExitOpen;
    
    const [levelSessionKey, setLevelSessionKey] = useState(0);
    
    const handleRestartCurrentLevel = () => {
        setLevelSessionKey((prev) => prev + 1);
    };
    
    return (
        <Box minH="100vh" w="100%" bg="gray.900" color="gray.100" display="flex" flexDirection="column">
            {/* Top Navbar */}
            <Flex
                as="header"
                w="100%"
                px={{base: 4, md: 8}}
                py={3}
                justify="space-between"
                align="center"
                borderBottom="1px solid"
                borderColor="whiteAlpha.200"
                bg="gray.900"
                position="sticky"
                top={0}
                zIndex={30}
            >
                <HStack
                    spacing={{base: 1.5, sm: 3}}
                    cursor="pointer"
                    onClick={() => {
                        if (currentScreen === 'GAME') {
                            onExitOpen();
                        } else {
                            setCurrentScreen('LANDING');
                        }
                    }}
                >
                    <Text fontSize={{base: 'lg', sm: '2xl'}}>🐱</Text>
                    <Heading
                        size={{base: 'xs', sm: 'md'}}
                        fontSize={{base: 'sm', sm: 'md'}}
                        lineHeight="short"
                        color="yellow.400"
                        letterSpacing="wide"
                    >
                        Whisker Rescue 911
                    </Heading>
                </HStack>
                
                <HStack spacing={2.5}>
                    {/* Field Manual Button */}
                    <Button
                        size="sm"
                        colorScheme="orange"
                        variant="solid"
                        color="gray.950"
                        fontWeight="bold"
                        leftIcon={<BookOpen size={16}/>}
                        onClick={onCodexOpen}
                    >
                        Field Manual
                    </Button>
                    
                    {/* Fullscreen Toggle Button */}
                    <Tooltip label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
                        <IconButton
                            aria-label="Toggle Fullscreen"
                            icon={
                                isFullscreen ? (
                                    <TbMinimize size={18} className="text-yellow-400"/>
                                ) : (
                                    <TbMaximize size={18} className="text-yellow-400"/>
                                )
                            }
                            variant="ghost"
                            colorScheme="yellow"
                            onClick={toggleFullscreen}
                        />
                    </Tooltip>
                    
                    {/* Audio Toggle */}
                    <Tooltip label={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}>
                        <IconButton
                            aria-label="Toggle Sound"
                            icon={soundEnabled ? <Volume2 size={18}/> : <VolumeX size={18}/>}
                            variant="ghost"
                            colorScheme="yellow"
                            onClick={() => setSoundEnabled(!soundEnabled)}
                        />
                    </Tooltip>
                </HStack>
            </Flex>
            
            {/* Main Viewport */}
            <Flex flex="1" justify="center" align="center" px={4} py={4}>
                {currentScreen === 'LANDING' && (
                    <VStack spacing={6} maxW="3xl" w="100%" textAlign="center">
                        <Box
                            position="relative"
                            p={6}
                            borderRadius="full"
                            bg="gray.800"
                            border="2px solid"
                            borderColor="yellow.400"
                            boxShadow="0 0 25px rgba(250, 204, 21, 0.25)"
                        >
                            <Text fontSize="5xl">🐈‍⬛</Text>
                            <Badge
                                position="absolute"
                                bottom="-2"
                                left="50%"
                                transform="translateX(-50%)"
                                colorScheme="red"
                                variant="solid"
                                borderRadius="full"
                                px={3}
                                py={0.5}
                                fontSize="2xs"
                                fontWeight="bold"
                            >
                                TACTICAL RESCUE
                            </Badge>
                        </Box>
                        
                        <VStack spacing={1}>
                            <Heading size="2xl" fontWeight="black" color="white">
                                Whisker Rescue <Text as="span" color="yellow.400">911</Text>
                            </Heading>
                            <Text color="gray.400" maxW="lg" fontSize="sm">
                                Infiltrate hazard sectors, scavenge tools, and evacuate trapped cats before detonation.
                            </Text>
                        </VStack>
                        
                        {/* Progress Bar */}
                        <Box w="full" maxW="xs" bg="gray.850" p={3.5} rounded="xl" border="1px solid"
                             borderColor="whiteAlpha.150">
                            <Flex justify="space-between" align="center" mb={2}>
                                <Text fontSize="xs" fontWeight="bold" color="gray.300">
                                    SECTOR PROGRESS
                                </Text>
                                <Badge colorScheme={progressPercent === 100 ? 'green' : 'yellow'} fontSize="2xs">
                                    {completedStages} / {totalLevels} COMPLETED ({progressPercent}%)
                                </Badge>
                            </Flex>
                            <Progress
                                value={progressPercent}
                                size="sm"
                                colorScheme="yellow"
                                rounded="full"
                                bg="gray.700"
                            />
                        </Box>
                        
                        <VStack spacing={3} w="full" maxW="xs">
                            <Button
                                w="full"
                                size="lg"
                                colorScheme="yellow"
                                color="gray.950"
                                fontWeight="bold"
                                leftIcon={<Play size={18}/>}
                                onClick={() => handleStartGame(maxUnlockedLevel)}
                            >
                                {maxUnlockedLevel > 1 ? `Continue Sector ${maxUnlockedLevel}` : 'Start Operation'}
                            </Button>
                            
                            <Button
                                w="full"
                                size="lg"
                                variant="outline"
                                colorScheme="yellow"
                                leftIcon={<Grid size={18}/>}
                                onClick={onSelectOpen}
                            >
                                Sector Select
                            </Button>
                        </VStack>
                    </VStack>
                )}
                
                {currentScreen === 'GAME' && (
                    <ActiveGameScreen
                        key={levelSessionKey}
                        levelId={selectedLevel}
                        onPromptExit={onExitOpen}
                        onAdvanceLevel={handleAdvanceNextLevel}
                        onRestartLevel={handleRestartCurrentLevel}
                        isPaused={isGamePaused}
                    />
                )}
            </Flex>
            
            {/* Global Modals */}
            <CodexModal isOpen={isCodexOpen} onClose={onCodexClose}/>
            <ExitConfirmModal
                isOpen={isExitOpen}
                onClose={onExitClose}
                onConfirmExit={handleConfirmExit}
                onRestartLevel={handleRestartCurrentLevel}
            />
            
            {/* Level Select Modal */}
            <Modal isOpen={isSelectOpen} onClose={onSelectClose} isCentered size="md">
                <ModalOverlay backdropFilter="blur(6px)"/>
                <ModalContent bg="gray.900" borderColor="whiteAlpha.300" borderWidth={1} color="white">
                    <ModalHeader>Select Rescue Sector</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <SimpleGrid columns={3} spacing={3} mb={6}>
                            {Object.keys(LEVELS).map((lvlKey) => {
                                const lvl = parseInt(lvlKey, 10);
                                const isUnlocked = lvl <= maxUnlockedLevel;
                                return (
                                    <Button
                                        key={lvl}
                                        h="64px"
                                        flexDirection="column"
                                        variant={isUnlocked ? 'solid' : 'outline'}
                                        colorScheme={isUnlocked ? 'yellow' : 'gray'}
                                        isDisabled={!isUnlocked}
                                        onClick={() => {
                                            onSelectClose();
                                            handleStartGame(lvl);
                                        }}
                                    >
                                        <Text fontSize="sm" fontWeight="bold">Level {lvl}</Text>
                                        <Text fontSize="2xs" opacity={0.8}>
                                            {lvl === 1 ? 'Tutorial' : isUnlocked ? 'Unlocked' : 'Locked'}
                                        </Text>
                                    </Button>
                                );
                            })}
                        </SimpleGrid>
                        
                        <Flex justify="space-between" align="center" pt={3} borderTop="1px solid"
                              borderColor="whiteAlpha.200">
                            <Button size="xs" colorScheme="red" variant="ghost" onClick={handleResetProgress}>
                                Reset Progress
                            </Button>
                            <Text fontSize="xs" color="gray.500">Auto-saved</Text>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}