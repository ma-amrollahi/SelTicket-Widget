import { createConfig, STATUS_CODE_MESSAGES } from "flawless-ui";
import server from "../api/server";
import Alert from "../components/alert/Alert";

const flawlessConfig = createConfig({
    axiosInstance: server,
    components: {
        alerts: {
            success: (props) => {
                return <Alert type={'success'} message={props.message} />
            },
            error : (props) => {
                return <Alert type={'error'} message={props.message} />
            }
        }
    },
    statusCodeMessages:{
        ...STATUS_CODE_MESSAGES,
        error:{
            message: (data) => {
                return data?.message ? data?.message : undefined
            }
        },
        2:{
            message: "tnx"
        }
    }
})

export default flawlessConfig