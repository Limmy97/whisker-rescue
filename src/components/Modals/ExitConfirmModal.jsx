import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    VStack,
    HStack,
    Text,
    Badge,
} from '@chakra-ui/react';
import {AlertTriangle, RotateCcw, Play, LogOut} from 'lucide-react';

export default function ExitConfirmModal({
                                             isOpen,
                                             onClose,
                                             onConfirmExit,
                                             onRestartLevel,
                                         }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
            <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.800"/>
            <ModalContent
                bg="gray.900"
                borderColor="yellow.500/40"
                borderWidth={1}
                color="white"
                rounded="xl"
                p={2}
                boxShadow="0 0 30px rgba(0,0,0,0.8)"
            >
                <ModalHeader pb={2}>
                    <HStack justify="space-between" align="center">
                        <HStack spacing={2}>
                            <AlertTriangle className="w-5 h-5 text-yellow-400"/>
                            <Text fontSize="md" fontWeight="black" letterSpacing="wide">
                                Operation Options
                            </Text>
                        </HStack>
                        <Badge colorScheme="red" variant="solid" px={2} py={0.5} rounded="md" fontSize="2xs">
                            TIME PAUSED
                        </Badge>
                    </HStack>
                </ModalHeader>
                
                <ModalBody py={2}>
                    <VStack spacing={2} align="start">
                        <Text fontSize="xs" color="gray.300">
                            Choose an action for the current sector.
                        </Text>
                        <Text fontSize="2xs" color="gray.500">
                            Restarting resets the timer, fog, and item positions. Exiting returns to the main menu.
                        </Text>
                    </VStack>
                </ModalBody>
                
                <ModalFooter pt={4} gap={2} wrap="wrap" justify="space-between">
                    <Button
                        size="sm"
                        colorScheme="green"
                        leftIcon={<Play size={14}/>}
                        onClick={onClose}
                    >
                        Resume
                    </Button>
                    
                    <HStack spacing={2}>
                        {/* Quick Level Reload */}
                        <Button
                            size="sm"
                            colorScheme="orange"
                            variant="solid"
                            color="gray.950"
                            fontWeight="bold"
                            leftIcon={<RotateCcw size={14}/>}
                            onClick={() => {
                                onRestartLevel();
                                onClose();
                            }}
                        >
                            Restart Sector
                        </Button>
                        
                        {/* Exit to Main Menu */}
                        <Button
                            size="sm"
                            colorScheme="red"
                            variant="outline"
                            fontWeight="bold"
                            leftIcon={<LogOut size={14}/>}
                            onClick={onConfirmExit}
                        >
                            Menu
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}