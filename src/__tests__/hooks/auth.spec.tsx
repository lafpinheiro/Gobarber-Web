import { renderHook, act } from "@testing-library/react-hooks"
import { useAuth, AuthProvider } from "../../hooks/auth"
import mockAdapter from 'axios-mock-adapter';
import api from '../../services/api';

const apiMock = new mockAdapter(api);

describe('Auth hook',() => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user:{
        id: 'user-123',
        name: 'John Doe',
        email: 'johndoe@example.com.br'
      },
      token: 'token-123'
    }

    apiMock.onPost('sessions').reply(200, apiResponse)

    const setIntemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(()=>useAuth(), {
      wrapper: AuthProvider,
    });
    result.current.signIn({
      email: 'johndoe@example.com.br',
      password: '123456',
    })

    await waitForNextUpdate(); // aguarda que alguma coisa mude dentro do hook, como a variável de sessão

    expect(setIntemSpy).toHaveBeenCalledWith('@GoBarber:token', apiResponse.token);
    expect(setIntemSpy).toHaveBeenCalledWith('@GoBarber:user', JSON.stringify(apiResponse.user));

    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });

  it('should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user-123',
            name: 'John Doe',
            email: 'johndoe@example.com.br'
          });
        default:
          return null;
      }
    })

    const { result } = renderHook(()=>useAuth(), {
      wrapper: AuthProvider,
    });
    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });

  it('should restorebe able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify({
            id: 'user-123',
            name: 'John Doe',
            email: 'johndoe@example.com.br'
          });
        default:
          return null;
      }
    })

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem')

    const { result } = renderHook(()=>useAuth(), {
      wrapper: AuthProvider,
    });

    // use o act quando não for uma funcão assincrona
    act(() =>{
      result.current.signOut();
    })

    expect(removeItemSpy).toBeCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });


  it('should be able to update user data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(()=>useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: 'user-123',
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      avatar_url: 'image-test-jpg',
    };

    act(()=>{
      result.current.updateUser(user);
    })

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );

    expect(result.current.user).toEqual(user);
  });

})
