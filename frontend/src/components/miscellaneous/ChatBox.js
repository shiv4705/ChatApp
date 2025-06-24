import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import {
  Box,
  Text,
  Spinner,
  FormControl,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import ScrollableChat from "../ScrollableChat";
import axios from "axios";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, user } = ChatState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data.data); // ✅ Make sure it's an array only
      setLoading(false);
    } catch (error) {
      console.error("Failed to load messages", error);
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      setSending(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/message",
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );

      setMessages([...messages, data.data]); // append the new message
      setNewMessage("");
      setSending(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setSending(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      justifyContent="space-between"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {selectedChat ? (
        <>
          <Box
            w="100%"
            h="100%"
            overflowY="hidden"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <ScrollableChat messages={messages} />
            )}
          </Box>

          <FormControl
            onSubmit={sendMessage}
            isRequired
            mt={3}
            as="form"
            display="flex"
            alignItems="center"
          >
            <Input
              variant="filled"
              bg="#E0E0E0"
              placeholder="Enter a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <IconButton
              colorScheme="blue"
              icon={<ArrowForwardIcon />}
              ml={2}
              type="submit"
              isLoading={sending}
            />
          </FormControl>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ChatBox;
