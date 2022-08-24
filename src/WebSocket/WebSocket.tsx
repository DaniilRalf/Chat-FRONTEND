import React, {useEffect, useState} from 'react';
import {MessageData} from "../interfaces";
import axios from "axios";

const WebSocket = () => {


    // SET STATE-------------------------------------------------
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [valueInput, setValueInput] = useState<string>('');
    // SET STATE-------------------------------------------------


    //GET MESSAGE-----------------------------------------------
    useEffect(() => {

    }, [])

    //GET MESSAGE-----------------------------------------------


    //SEND MESSAGE-----------------------------------------------
    let sendMessage = async () => {

        let data: MessageData = {
            message: valueInput,
            id: Date.now()
        };

        await axios.post(
            'http://localhost:7000/new-messages',
            data
        )
    }
    //SEND MESSAGE-----------------------------------------------


    return (
        <div className='main'>
            <p>Long Pulling</p>
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
};
export default WebSocket;
