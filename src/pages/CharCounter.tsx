import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { textState } from '../states/atom';
import { charCountState } from '../states/selector';

function CharCounter() {
  return (
    <div>
      <TextInput />
      <CharCount />
    </div>
  );
}

function TextInput() {
  const [text, setText] = useRecoilState(textState);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };
  return (
    <div>
      <br />
      <input
        type='text'
        value={text}
        placeholder='글자 수 계산기'
        onChange={onChange}
      />
      <br />
      <hr />
    </div>
  );
}

function CharCount() {
  const count = useRecoilValue(charCountState);
  return <>Char Count: {count}</>;
}

export default CharCounter;
