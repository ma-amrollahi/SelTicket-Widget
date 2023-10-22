import { FlawLessUI } from "flawless-ui"
import { Provider } from "react-redux"
import flawlessConfig from "./flawless-ui"
import store from "./store"
import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react"
import router from "./router"

function App() {

    const [noConfig, setNoConfig] = useState<boolean>(false)

    useEffect(() => {
        if (
            window.selTicket === undefined
            ||
            window.selTicket.applicationId === undefined
            ||
            window.selTicket.token === undefined
            ||
            window.selTicket.onClose === undefined
        ) {
            setNoConfig(true)
        }
    }, [])

    if (noConfig) return (
        <div className="selticket-pt-6 selticket-flex-center">
            No Config
        </div>
    )
    return (
        <Provider store={store}>
            <FlawLessUI config={flawlessConfig}>
                <RouterProvider router={router} />
            </FlawLessUI>
        </Provider>
        
    )
}

export default App
