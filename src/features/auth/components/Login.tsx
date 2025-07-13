// features/auth/components/Login.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../authSlice';
import { useAppSelector, useAppDispatch } from '@/redux/store/hook';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation('auth');
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, error } = useAppSelector(state => state.auth);

  const handleLogin = () => {
    return;
    dispatch(loginRequest({ email, password }));
  };

  return (
    <View>
      <TextInput
        placeholder={t('username')}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder={t('password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Button
        title={isLoading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
      />
    </View>
  );
};

export default Login;
