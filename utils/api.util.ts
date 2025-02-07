import axios, { AxiosResponse } from 'axios';

export class APIUtil {
  async sendPostRequest(url: string, data: any, headers?: Record<string, string>): Promise<AxiosResponse> {
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Ошибка при отправке POST-запроса:', error.message);
        throw error;
      } else {
        console.error('Неизвестная ошибка:', error);
        throw error;
      }
    }
  }
}
