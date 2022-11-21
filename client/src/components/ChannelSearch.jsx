import React, { useState, useEffect } from 'react'
import { useChatContext } from 'stream-chat-react';
import { SearchIcon } from '../assets';

const ChannelSearch = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // This function will accept the text we are searching (channel)
  const getChannels = async (text) => {
    try {
      // TODO: fetch channels
    } catch (error) {
      setQuery('')
    }
  }
  
  const onSearch = (event) => {
    // Need to do this everytime we have an input/button
    // Need to do this to prevent loading the page everytime user interacts with search
    event.preventDefault()
    setLoading(true);
    // Get the value user has inputted
    setQuery(event.target.value);
    getChannels(event.target.value);
  }

  return (
    <div className='channel-search__container'>
      <div className='channel-search__input__wrapper'>
        <div className='channel-search__input__icon'>
            <SearchIcon />
        </div>
        <input 
            className='channel-search__input__text' 
            placeholder='Search' 
            type='text'
            value={query}
            onChange={onSearch}
        />
      </div>
    </div>
  )
}

export default ChannelSearch;
