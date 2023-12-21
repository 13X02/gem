'use client'
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input, // Import Input component
} from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import Cookies from "js-cookie";
import { Link } from "@nextui-org/react";
import axios from "axios";
import { ChakraProvider, Avatar } from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "@chakra-ui/react";
import {  Montserrat, Poppins } from 'next/font/google'
import MessageBox from "./test/page";

const montserrat = Montserrat({weight: "600", style: "normal", subsets: ['latin']})
const poppins = Poppins({weight: "300", style: "normal", subsets: ['latin']})

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userPic = "https://pbs.twimg.com/media/FG_RujSaMAAiE87.jpg";

  useEffect(() => {
    const userDataInCookies = Cookies.get("userData");

    if (userDataInCookies !== undefined) {
      setApiKey(userDataInCookies);
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  const saveAPI = () => {
    if (apiKey.trim() === "") {
      return;
    }

    Cookies.set("userData", apiKey);
    setIsOpen(false);
  };

  const handleSendMessage = async () => {
    setIsLoading(true);
    if (inputMessage.trim() === "") {
      return;
    }

    const requestData = {
      prompt: inputMessage,
    };

    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      const sendTime = new Date().toLocaleTimeString();
      const response = await axios.post(
        "http://localhost:3000/api/prompt",
        requestData,
        requestConfig
      );

      if (response.status === 200) {
        const currentTime = new Date().toLocaleTimeString();
        const responseData = response.data;
        setIsLoading(false);
        setMessages([
          ...messages,
          {
            text: inputMessage,
            type: "end",
            name: "User",
            time: sendTime,
          },
          {
            text: responseData.response,
            type: "start",
            name: "Gemini",
            time: currentTime,
          },
        ]);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }

    setInputMessage("");
  };

  return (
    <>
      <ChakraProvider>
        <NextUIProvider>
          <Modal
            isOpen={isOpen}
            onOpenChange={() => setIsOpen(!isOpen)}
            isDismissable={false}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Hello!!
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      Welcome to Gem 💎, an open-source Web client for Google's
                      Gemini LLM.
                    </p>
                    <p>
                      It seems that it's your first time using the App. Kindly
                      enter your{" "}
                      <Link href="https://makersuite.google.com/app/apikey">
                        API KEY
                      </Link>{" "}
                      to continue.
                    </p>
                    <Input
                      key="outside"
                      type="text"
                      label=""
                      labelPlacement="outside"
                      placeholder="Enter your API Key"
                      description="Google AI Studio API Key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={saveAPI}>
                      Continue
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          {/* Chat UI */}
          <div className={`flex  w-full flex-col h-screen bg-white`} >
            {/* Class Blur */}
            <div className={`flex w-full flex-col h-screen bg-black bg-opacity-10 shadow-lg backdrop-blur-20 `}>
              {/* Fixed Heading */}
              <div className="w-full p-10 flex flex-col items-center">
                <p className={`${montserrat.className} text-8xl text-black `}>Gem </p>
                <p className={`${poppins.className} text-xl text-black-50`}>A web client for Gemini AI</p>
              </div>

              {/* Scrollable Chat */}
              {/* Scrollable Chat */}
<div className="flex flex-col flex-grow overflow-y-auto px-96">
  {messages.map((message, index) => (
    <MessageBox
      key={index}
      message={message.text}
      time={message.time}
      type={message.type}
      name={message.name}
      className="max-w-1/2"
    />
  ))}
</div>



              {/* Fixed Input */}
              <div className="flex justify-center my-10 p-5">
                <input
                  className="w-1/2 h-12 rounded-xl bg-gray-300"
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === "Return") {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div
                  className="flex justify-center items-center ml-5"
                  onClick={handleSendMessage}
                >
                  {isLoading ? (
                    <Spinner size="sm" color="blue.500" />
                  ) : (
                    <FontAwesomeIcon icon={faPaperPlane} size="xl" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </NextUIProvider>
      </ChakraProvider>
    </>
  );
}
