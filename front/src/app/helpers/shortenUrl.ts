export const shortenUrl = async (url: string): Promise<string> => {
    return `http://short.url/${btoa(url).slice(0, 6)}`
}
