export const api = {
  login: async (email: string, password: string): Promise<{ error: string, token?: string }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (email !== 'burguer@gmail.com') {
          resolve({
            error: 'E-mail e/ou senha estao incorrectos'
          });
        } else {
          resolve({
            error: '',
            token: '123'
          });
        }
      }, 1000);
    });
  }
}