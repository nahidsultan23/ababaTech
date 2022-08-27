import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface IDiscoversPayload {
    banner: string;
    title: string;
    des: string;
    rating: number;
    Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string;
    };
    releaseYear: number;
    type: string;
    id: string;
}
