import './App.css';
import LongPulling from "./LongPulling/LongPulling";
import EventSourcing from "./EventSoursing/EventSourcing";
import WebSocket from "./WebSocket/WebSocket";

function App() {
  return (
    <div className="App">
        {/*<LongPulling></LongPulling>*/}
        {/*<EventSourcing></EventSourcing>*/}
        <WebSocket></WebSocket>
    </div>
  );
}

export default App;
