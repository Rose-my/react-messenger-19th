import styled from 'styled-components';
import { useState } from 'react';
import { PlusIcon, VoiceIcon, EmojiIcon } from '../../assets';
import date from '../../utils/date';
import { ChatType } from '../../types/types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userIdState, chatsState } from '../../recoil/atom';

export default function Footer() {
  const [input, setInput] = useState('');
  const setChats = useSetRecoilState(chatsState);
  const userId = useRecoilValue(userIdState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (input.trim() !== '') {
      storeChat(input);
      setInput('');
      // const prevData = JSON.parse(localStorage.getItem('backup') || '[]');
      // setUpdataedChatData([...prevData, newChat]);
      // localStorage.setItem('backup', JSON.stringify(updatedChatData));
    }
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  function storeChat(input: string) {
    const newChat: ChatType = {
      id: Date.now().toString(),
      from: 0,
      to: userId,
      details: { text: input, time: date() },
    };
    setChats((prevChats) => [...prevChats, newChat]);
  }

  return (
    <Wrapper>
      <PlusIcon />
      <InputBox onSubmit={handleSubmit}>
        <InputField type="text" value={input} onChange={handleInput} autoFocus />
        <EmojiIcon />
      </InputBox>
      <VoiceIcon />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  position: relative;

  width: 100%;
  padding: 0.6rem 0.8rem;

  background-color: ${({ theme }) => theme.colors.white};

  & svg {
    cursor: pointer;
  }
`;

const InputBox = styled.form`
  display: flex;
  justify-content: center;

  width: 28.3rem;
  height: 3.4rem;
  margin-left: 0.8rem;
  margin-right: 0.4rem;

  & svg {
    position: absolute;
    right: 4.4rem;
  }
`;

const InputField = styled.input`
  display: block;
  width: 100%;
  border: none;
  border-radius: 1.7rem;
  padding: 1rem;

  background-color: ${({ theme }) => theme.colors.grey_bg};
`;
