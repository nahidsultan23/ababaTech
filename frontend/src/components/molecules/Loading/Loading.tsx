import { CircularProgress } from '@mui/material';
import { ILoadingPayload } from '../../../interfaces/loading.interface';
import styles from './Loading.module.css';

export const Loading = ({ innerLoading }: ILoadingPayload) => {
    return (
        <div
            className={
                innerLoading
                    ? `${styles.loading} ${styles.inner_loading}`
                    : `${styles.loading}`
            }
        >
            <div className={styles.loading_inline_block}>
                <CircularProgress />
            </div>
            <div
                className={`${styles.loading_inline_block} ${styles.loading_text_space}`}
            >
                Loading.....
            </div>
        </div>
    );
};
