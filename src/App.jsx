import { useState, useEffect,useRef } from 'react'
import robotImage from './assets/robot.png'
import userImage from './assets/user.png'
import { chatbot } from 'supersimpledev'


import './App.css'


function InputMessage({chat,setChat}){
  const [inputText,setInputText] = useState('')

  function saveInputText(event){
         setInputText(event.target.value)
    }

function sendMessage(){
   const chatValue =  [...chat,{
      message : inputText,
      sender : 'user',
      id : crypto.randomUUID()}]

setChat(chatValue);

const response = chatbot.getResponse(inputText);

setChat(
  [
    ...chatValue,{
      message : response,
      sender : 'robot',
      id : crypto.randomUUID()
    }
  ],

setInputText('')

)
   }


  return ( <div className = 'input-container'>
      <input
       placeholder='Send a message to ChatBot'
        size = '30'
        onChange = {saveInputText}
        value = {inputText}
        className = 'chat-input'
         />

      <button 
      onClick = {sendMessage}
      className = 'send-button'
      >Send</button>
    </div>
  )
}

function ChatMessage({message,sender}){
    return(
      <div className = {sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
        {sender === 'robot' && (
          <img src = {robotImage} className = 'chat-message-profile' />
          )}
          <div className = 'chat-message-text'>
        {message}
        </div>
        {sender === 'user' && (
          <img src = {userImage} className = 'chat-message-profile' />
          )}
      </div>
    )
}

function ChatMessages({chat}){

const chatMessageRef = useRef(null);

useEffect(()=>{
  const containerElem = chatMessageRef.current

  if (containerElem){
    containerElem.scrollTop = containerElem.scrollHeight
  }
},[chat])

return (
  <div
   className = 'chat-message-container'
   ref={chatMessageRef}>
  {
    chat.map((chat)=>{
 return(
<ChatMessage
 message = {chat.message}
  sender = {chat.sender} />
 )
    })
  }
  </div>
)

}





function App() {

    const [chat,setChat] = useState([])

  return(
    <div className = 'app-container'>
      <ChatMessages 
      chat={chat} />

      <InputMessage
       chat={chat} 
       setChat={setChat} />
    </div>
  )


}

export default App
