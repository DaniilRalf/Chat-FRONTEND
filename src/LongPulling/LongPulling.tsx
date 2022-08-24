import {useEffect, useState} from "react";
import axios from "axios";
import {MessageData} from "../interfaces";


const LongPulling = () => {


    // SET STATE-------------------------------------------------
        const [messages, setMessages] = useState<MessageData[]>([]);
        const [valueInput, setValueInput] = useState<string>('');
    // SET STATE-------------------------------------------------


    //GET MESSAGE------------------------------------------------
        useEffect(() => {
            getAllMessage();
        }, [])

        let getAllMessage = async () => {
            try {
                let {data} = await axios.get('http://localhost:7000/get-messages');
                setMessages((prev: any[]) => [data, ...prev]);
                await getAllMessage();
            } catch (e) {
                setTimeout(() => {
                    getAllMessage();
                }, 1000)
            }
        }
    //GET MESSAGE------------------------------------------------


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

export default LongPulling;

