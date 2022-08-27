import { IErrorPayload } from '../../../interfaces/error.interface';
import styles from './Error.module.css';

export const Error = ({ text }: IErrorPayload) => {
    return <div className={styles.error_text}>{text}</div>;
};
