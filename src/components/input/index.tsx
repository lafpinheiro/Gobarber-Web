import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled]=useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  //SubFunções declaradas dentro de funções são sempre recriadas em memória quando a função pai é chamada.
  //Isso causa uma mutação que faz o React renderizar o componente novamente.
  //Para evitar isso o useCallback cria a subfunção uma só vez e assim o componente não é renderizado novamente.
  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
      setIsFilled(!!inputRef.current?.value)
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
  <Container isFilled = {isFilled} isFocused = {isFocused}>
    { Icon && <Icon size={20}/> }
    <input onFocus={handleInputFocus} onBlur={handleInputBlur} defaultValue={defaultValue} ref={inputRef} {...rest} />
  </Container>
  )
  };

export default Input;
