import React from 'react';
import { Stack, Text, Link, FontWeights, IStackTokens, IStackStyles, ITextStyles } from '@fluentui/react';
import logo from './logo.svg';
import './App.css';
import { LoginComponent } from './Login';

const boldStyle: Partial<ITextStyles> = { root: { fontWeight: FontWeights.semibold } };
const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    margin: '0 auto',
    color: '#605e5c',
    backgroundColor: '#faf9f8'
  },
};

export const App: React.FunctionComponent = () => {
  return (
    <Stack verticalFill verticalAlign='center' styles={stackStyles} tokens={stackTokens}>
      <LoginComponent></LoginComponent>
    </Stack>
  );
};
