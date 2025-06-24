import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  IconButton,
  Box,
  Text,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

const GroupInfoModal = ({ selectedChat }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Eye Icon Toggle */}
      <IconButton
        icon={<ViewIcon />}
        onClick={onOpen}
        variant="ghost"
        colorScheme="teal"
        aria-label="View Group Info"
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {selectedChat.chatName.toUpperCase()} Info
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={3}>
              <Text fontSize="md" fontWeight="semibold" mb={1}>
                Group Name:
              </Text>
              <Text>{selectedChat.chatName}</Text>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="semibold" mb={1}>
                Members:
              </Text>
              <Stack spacing={2}>
                {selectedChat.users.map((u) => (
                  <Text key={u._id}>{u.name}</Text>
                ))}
              </Stack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupInfoModal;
