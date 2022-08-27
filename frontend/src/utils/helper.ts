import { ICreateGetUrlProperties } from '../interfaces/helper.interface';

export const createGetUrl = (
    baseUrl: string,
    properties: ICreateGetUrlProperties
) => {
    let url = baseUrl;
    let queryString = '';

    for (const key in properties) {
        if (queryString) {
            queryString += `&${key}=`;
        } else {
            queryString += `${key}=`;
        }

        queryString += properties[key];
    }

    if (queryString) {
        queryString = `?${queryString}`;
    }

    url += queryString;

    return url;
};

export const isEmptyObject = (obj: any) => {
    return Object.keys(obj).length === 0;
};

export const truncateString = (string: string, num: number) => {
    return string?.length > num ? string.substring(0, num - 1) + '...' : string;
};

export const createFilteredTitle = (
    movieName: string | null,
    movieGroup: string | null,
    movieType: string | null
) => {
    let result = '';

    if (movieName) {
        result += movieName;
    }

    if (movieGroup) {
        if (result) {
            result += ` & ${movieGroup}`;
        } else {
            result += movieGroup;
        }
    }

    if (movieType) {
        if (result) {
            result += ` & ${movieType}`;
        } else {
            result += movieType;
        }
    }

    return result;
};
