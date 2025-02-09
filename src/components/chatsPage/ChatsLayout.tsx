import styled from 'styled-components';
import userData from '../../assets/data/userData.json';
import chatData from '../../assets/data/chatData.json';
import ChatsBox from './ChatsBox';
import formatDate from '../../utils/formatDate';

export default function ChatsLayout() {
  const backupChats = JSON.parse(localStorage.getItem('bckup') || '[]');

  return (
    <Wrapper>
      {userData.data
        .filter((user) => user.id >= 1)
        .map((user) => {
          const { id, name } = user;

          const filteredChats = [...chatData.data, ...backupChats].filter((chat) => {
            return (chat.from === 0 && chat.to === id) || (chat.to === 0 && chat.from === id);
          });

          const lastChat = filteredChats.length > 0 ? filteredChats[filteredChats.length - 1] : null;
          const text = lastChat ? lastChat.details.text : '';
          const time = lastChat ? lastChat.details.time : '';

          return <ChatsBox key={id} id={id} name={name} text={text} time={formatDate(time)} />;
        })}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 62rem;
  margin-top: 1rem;

  background-color: ${({ theme }) => theme.colors.white};
  overflow-y: scroll;
`;
