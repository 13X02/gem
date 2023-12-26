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
import { ChakraProvider, Avatar, VStack, HStack, Text, Card, CardBody } from "@chakra-ui/react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from "@chakra-ui/react";
import {  Montserrat, Poppins } from 'next/font/google'

const montserrat = Montserrat({weight: "600", style: "normal", subsets: ['latin']})
const poppins = Poppins({weight: "300", style: "normal", subsets: ['latin']})

// ... (your imports)

export default function MessageBox(props) {
    const { message, time, name, type } = props;
  
    const renderMessageBox = () => {
      const avatar = <Avatar src={type === 'start' ? 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/12/Gradient_builder_2.jpg?auto=format&q=60&w=1815&h=1020.9375&fit=crop&crop=faces' : 'https://cdn-icons-png.flaticon.com/512/4174/4174470.png'} />;
      const messageContent = (
        <VStack alignItems={type === "start" ? "start" : "end"} className="" style={{color:"#dddcf1"}}>
          <HStack justifyContent={type === "start" ? "start" : "end"} className="my-2">
            <Text>{name}</Text>
            <Text>{time}</Text>
          </HStack>
          <div className={`bg-red-50 p-3 rounded-3xl ${type === "start"? "bg-gray-100 rounded-tl-none":"rounded-tr-none"} min-w-16 m-0 ${type === "start" ? "text-left" : "text-right"}`} style={{
    background: type === "end"
      ? 'radial-gradient(circle at 100% 107%, #ff89cc 0%, #9cb8ec 30%, #00ffee 60%, #62c2fe 100%)'
      : '#dddcf1' ,
      color:"#212028"// Replace '#f00' with the desired background color for type !== "start"
  }}>
            {message}
          </div>
        </VStack>
      );
  
      if (type === "start") {
        return (
          <HStack alignItems="start" className="max-w-1/2">
            {avatar}
            {messageContent}
          </HStack>
        );
      } else {
        return (
          <HStack justifyContent="end" alignItems="start" className="max-w-1/2">
            {messageContent}
            {avatar}
          </HStack>
        );
      }
    };
  
    return (
      <>
        
            {renderMessageBox()}
          
      </>
    );
  }
  
