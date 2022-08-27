export interface ILogIn {
    email: string;
    password: string;
}

interface IUser {
    email: string;
    username: string;
}

interface IData {
    accessToken?: string;
    user?: IUser;
}

interface IErrorMessage {
    email?: string;
    password?: string;
}

export interface ILoginResponse {
    statusCode: number;
    data: IData;
    errorMessage: IErrorMessage;
    message: string;
}
