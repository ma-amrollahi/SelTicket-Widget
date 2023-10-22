import axios from "axios";

const server = axios.create({
    baseURL: "https://api.selticket.ir/api/v1/General/",
})

export default server