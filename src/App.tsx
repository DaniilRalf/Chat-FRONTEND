import './App.css';
import LongPulling from "./LongPulling/LongPulling";
import EventSourcing from "./EventSoursing/EventSourcing";
import WebSock from "./WebSocket/WebSock";

function App() {
  return (
    <div className="App">
        {/*<LongPulling></LongPulling>*/}
        {/*<EventSourcing></EventSourcing>*/}
        <WebSock></WebSock>
    </div>
  );
}

export default App;
