import axios from "axios";
import { useEffect, useState } from "react";

const Fetch = (url, { }) => {
    const [data, setData] = useState([]);
    useEffect(() => {

        (async () => {
            try {

                let res = await axios.post(url, {});
                let data = res && res.data ? res.data : [];

                setData(data);


            } catch (e) {
                console.log(e);
            }
        })();

    });

    return {
        data
    };
};

export default Fetch;