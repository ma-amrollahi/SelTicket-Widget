import { configureStore } from "@reduxjs/toolkit";

import showReducer from "../features/show/show.slice"
import locationReducer from "../features/location/location.slice"
import orderReducer from "../features/order/order.slice"

const store = configureStore({
    reducer: {
        location: locationReducer,
        show: showReducer,
        order: orderReducer,
    },
})

export default store