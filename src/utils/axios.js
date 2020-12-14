import axios from "axios";

export const getData = (url) => {
    const fetchData = async () => {
        const result = await axios(url)
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                return undefined;
            });
        return result;
    };
    return fetchData();
}