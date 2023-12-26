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
                  className="w-1/2 h-12 p-4 rounded-xl bg-gray-300"
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