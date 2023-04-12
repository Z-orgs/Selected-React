import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    useEffect(() => {

        (async () => {
            try {

                let res = await axios.get(url);
                let data = res && res.data ? res.data : [];

                setData(data);


            } catch (e) {
                console.log(e);
            }
        })();

    }, []);

    return {
        data
    };
};

export default useFetch;