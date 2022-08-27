import { SERVER_BASE_URL } from '../../constants/constants';
import { ILogIn, ILoginResponse } from '../../interfaces/login.interface';
import { deletCookie, setCookie } from './cookies.action';

export const logIn = async (payload: ILogIn): Promise<ILoginResponse> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    };

    try {
        const response = await fetch(
            `${SERVER_BASE_URL}/log-in`,
            requestOptions
        );

        const jsonResponse = await response.json();

        if (jsonResponse.data && jsonResponse.data.user) {
            localStorage.setItem(
                'currentUser',
                JSON.stringify(jsonResponse.data.user)
            );

            setCookie('accessToken', jsonResponse.data.accessToken, 1);
        }

        return jsonResponse;
    } catch (error) {
        return {
            statusCode: 502,
            data: {},
            errorMessage: {},
            message: 'Could not connect to the server',
        };
    }
};

export const logOut = (): void => {
    localStorage.removeItem('currentUser');
    deletCookie('accessToken');
};
