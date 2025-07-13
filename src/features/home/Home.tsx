// features/auth/components/Login.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector, useAppDispatch } from '@/redux/store/hook';

const Login = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, error } = useAppSelector(state => state.auth);

  return (
    <View>
      <Text>Welcome Home</Text>
    </View>
  );
};

export default Login;
