export const getCookie = (name: string) => {
    let cookie = null;
    const nameEq = name + '=';
    const splittedCookie = document.cookie.split(';');

    for (let i = 0; i < splittedCookie.length; i++) {
        let c = splittedCookie[i];

        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEq) === 0) {
            cookie = c.substring(nameEq.length, c.length);
            break;
        }
    }

    return cookie;
};

export const setCookie = (name: string, value: string, days: number) => {
    let expires = '';

    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }

    document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

export const deletCookie = (name: string) => {
    document.cookie = name + '=; Max-Age=-99999999;';
};
