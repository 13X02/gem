'use client'
import React, { useState ,useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import Cookies from 'js-cookie';
import {Link} from "@nextui-org/react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false); // Fix: use useState instead of useEffect
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const userDataInCookies = Cookies.get('userData');

    console.log(userDataInCookies);

    if (userDataInCookies !== undefined) {
      // 'userData' cookie is present, close the modal
      setIsOpen(false);
    } else {
      // 'userData' cookie is not present, open the modal
      setIsOpen(true);
    }
  }, []);

  const saveAPI = () => {
    // Validate apiKey (you may want to add more robust validation)
    if (apiKey.trim() === '') {
      // Handle invalid API key, show an error message, etc.
      return;
    }

    // Save the API key to cookies
    Cookies.set('userData', apiKey);

    // Close the modal or perform any other actions based on your requirements
    setIsOpen(false);
  }

  return (
    <>
      <NextUIProvider>
        <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)} isDismissable={false}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Hello!!</ModalHeader>
                <ModalBody>
                  <p>
                    Welcome to Gem 💎, an open-source Web client for Google's Gemini LLM.
                  </p>
                  <p>
                    It seems that it's your first time using the App. Kindly enter your <Link href="https://makersuite.google.com/app/apikey" >API KEY</Link> to continue.
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

        {/*Chat UI*/}
      </NextUIProvider>
    </>
  );
}

