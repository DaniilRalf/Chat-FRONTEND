import {useEffect, useState} from "react";
import {MessageData} from "../interfaces";
import axios from "axios";


const EventSourcing = () => {
    // SET STATE-------------------------------------------------
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [valueInput, setValueInput] = useState<string>('');
    // SET STATE-------------------------------------------------


    //GET MESSAGE-----------------------------------------------
    useEffect(() => {
        getAllMessage();
    }, [])

    let getAllMessage = async () => {
        console.log('test1')
        const eventSource = new EventSource('http://localhost:7000/connect');
        console.log('test2')

        eventSource.onmessage = function (event) {

            console.log(event.data);
            console.log(event);

            const message = JSON.parse(event.data);
            setMessages((prev: any[]) => [message, ...prev])

            console.log(message)
        }
    }
    //GET MESSAGE-----------------------------------------------


    //SEND MESSAGE-----------------------------------------------
    let sendMessage = async () => {

        let data: MessageData = {
            message: valueInput,
            id: Date.now()
        };

        console.log(data);

        await axios.post(
            'http://localhost:7000/new-messages',
            data
        )
    }
    //SEND MESSAGE-----------------------------------------------


    return (
        <div className='main'>
            <p>Event Sourcing</p>
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

export default EventSourcing;
