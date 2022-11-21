import './App.css';
import { StreamChat } from 'stream-chat';
import { ChannelList, Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelListContainer, ChannelContainer } from './components';
import './App.css';

// initialise the chat
const apiKey = '7m4tfvuh65c7';

// create instance of stream chat
const client = StreamChat.getInstance(apiKey);

function App() {
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer />

        <ChannelContainer />
      </Chat>
    </div>
  );
}

export default App;
