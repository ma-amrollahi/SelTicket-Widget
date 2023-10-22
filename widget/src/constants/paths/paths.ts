import controller from "../../controllers/controller";

const PATHS: Record<keyof typeof controller, string> = {
    getScreening: "Data/Screenings",        // GetScreening
    getShows: "Show/Shows/",                // GetShows
    getPlaces: "Place",                     // GetPlaces
    getSchedules: "Schedule/Schedules",     // GetSchedules
    getSeats: "Schedule/Seats/",            // GetSeats
    getSeatStatus: "Schedule/SeatStatus/",  // GetSeatStatus
    getProvinces: "Data/Provinces",         // GetProvinces
    getCities: "Data/Provinces/",           // GetCities
    getOrders: "Order",                     // GetOrders
    reserve: "Order/Reserve",               //Reserve
    sale: "Order/Sale",                     //Sale
    fail: "Order/Fail/",                    //Fail
    check: "Order/Check/",                    //Check
}

export default PATHS