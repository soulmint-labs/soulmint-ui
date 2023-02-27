export const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
}

export const trimString = (str: string) => {
    return str.slice(0, 10) + '...' + str.slice(-4);
};