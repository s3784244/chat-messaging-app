import React from 'react'
import { Avatar, useChatContext } from 'stream-chat-react'

const TeamChannelPreview = ({ channel, type}) => {
  const { channel: activeChannel, client} = useChatContext();

  const ChannelPreview = () => (
    <p className='channel-preview__item'>
      {/* Get channel name */}
      # {channel?.data?.name || channel?.data?.id}
    </p>
  )

  const DirectPreview = () => {
    // Need to use Object.values to get the value of the objects, as it is not an array
    // Need to destructure user to get the data of the object
    // Mapping over all users and keeping all the ones where the id is not equal to the clientID (our id)
    const members = Object.values(channel.state.members).filter(({ user }) => user.id != client.userID);
    return (
      <div className='channel-preview__item single'>
        <Avatar 
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName}
          size={24}
        />
        <p>{members[0]?.user?.fullName}</p>
      </div>
    )
  }

  return (
    <div className={
      channel?.id === activeChannel?.id
      ? 'channel-preview__wrapper__selected'
      : 'channel-preview__wrapper'
    }
    onClick={() => {
      console.log(channel);
    }}
    >
      {type === 'team' ? <ChannelPreview/> : <DirectPreview />}
    </div>
  )
}

export default TeamChannelPreview
