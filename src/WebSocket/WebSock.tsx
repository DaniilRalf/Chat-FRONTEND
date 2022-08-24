import React, {useEffect, useRef, useState} from 'react';
import {MessageData} from "../interfaces";
import axios from "axios";
import {log} from "util";

const WebSock = () => {


    // SET STATE-------------------------------------------------
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [valueInput, setValueInput] = useState<string>('');

    const socket = useRef();
    const [socketConnect, setSocketConnect] = useState<boolean>(false);
    const [yourName, setYourName] = useState<string>('');
    // SET STATE-------------------------------------------------


    //GET MESSAGE-----------------------------------------------
        function connect() {
            // @ts-ignore
            socket.current = new WebSocket('ws://localhost:7001');
            // @ts-ignore
            socket.current.onopen = () => { //отработает в момент подключения
                setSocketConnect(true);
                const message = {
                    event: 'connection',
                    username: yourName,
                    id: Date.now()
                }
                //@ts-ignore
                socket.current.send(JSON.stringify(message));
            }
            // @ts-ignore
            socket.current.onmessage = (event) => { //отработает в момент передачи сообщения
                const message = JSON.parse(event.data);
                setMessages((prev: any[]) => [message, ...prev]);
            }
            // @ts-ignore
            socket.current.onclose = () => { //отработает в момент закрытия
                console.log('Socket close');
            }
            // @ts-ignore
            socket.current.onerror = () => { //отработает в момент получения ошибки
                console.log('Socket error');
            }
        }
    //GET MESSAGE-----------------------------------------------


    //SEND MESSAGE-----------------------------------------------
    let sendMessage = async () => {
        const message = {
            event: 'message',
            username: yourName,
            id: Date.now(),
            message: valueInput
        }
        // @ts-ignore
        socket.current.send(JSON.stringify(message));
        setValueInput('');
    }
    //SEND MESSAGE-----------------------------------------------

    if (!socketConnect){
        return (
            <div className='main'>
                <p>Enter your name</p>
                <input
                    type='text'
                    onChange={e => setYourName(e.target.value)}
                    value={yourName}
                    placeholder='Enter you name'
                />
                <button onClick={e => connect()}>Enter</button>
            </div>
        )
    } else {
        return (
            <div className='main'>
                <p>Web socket</p>
                <div className="form">
                    <input
                        type='text'
                        onChange={e => setValueInput(e.target.value)}
                        value={valueInput}/>
                    <button onClick={e => sendMessage()}>SEND</button>
                </div>
                <div className="messages">
                    {messages.map((mes: any) => {
                        return(
                            <div key={mes.id}>{mes.message}</div>
                        )
                    })}
                </div>
            </div>
        );
    }

};
export default WebSock;
