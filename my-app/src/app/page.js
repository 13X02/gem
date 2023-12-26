"use client";
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
import { faPaperPlane, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "@chakra-ui/react";
import { Montserrat, Poppins } from "next/font/google";
import MessageBox from "./test/page";
import { Rubik_Moonrocks } from "next/font/google";

const montserrat = Rubik_Moonrocks({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});
const poppins = Poppins({ weight: "300", style: "normal", subsets: ["latin"] });

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
  const gradientStyle = {
    background:
      "radial-gradient(circle at 100% 107%, #ff89cc 0%, #9cb8ec 30%, #00ffee 60%, #62c2fe 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent", // To make the text color transparent, revealing the gradient
  };

  const handleFileUpload = async () => {

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
          <div className={`flex w-full flex-col h-screen bg-custom-background`}>
            {/* Class Blur */}
            <div
              className={`flex w-full flex-col h-screen bg-black bg-opacity-10 shadow-lg backdrop-blur-20 `}
            >
              {/* Fixed Heading */}
              <div className="w-full px-96 pt-20 m-10 flex flex-col items-start">
                <p
                  className={`${poppins.className} text-7xl shadow-lg `}
                  style={{ color: "#dddcf1", fontWeight: 1000 }}
                >
                  Gem<span style={gradientStyle}>AI</span>{" "}
                </p>
                <p
                  className={`${poppins.className} text-xl `}
                  style={{ color: "#9292a0" }}
                >
                  An Open Source Web Client for Gemini AI
                </p>
              </div>

              {/* Scrollable Chat */}
              {/* Scrollable Chat */}
              <div className="flex flex-col flex-grow overflow-y-auto py-10 px-96">
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
                  className="w-1/2 h-12 p-4 rounded-xl"
                  style={{ background: "#dddcf1", color: "#212028" }}
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
                  <FontAwesomeIcon icon={faImage} size="xl" color="#dddcf1" />
                </div>
                <div
                  className="flex justify-center items-center ml-5"
                  onClick={handleFileUpload}
                >
                  {isLoading ? (
                    <Spinner size="sm" color="#dddcf1" />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      size="xl"
                      color="#dddcf1"
                    />
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
