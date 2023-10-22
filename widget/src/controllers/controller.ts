import server from "../api/server";
import PATHS from "../constants/paths/paths";
import {ReserveDtoI} from "../dtos/reserve.dto";
import {HttpResponse} from "../types/http.types";
import {OrderDetailsDataI, OrderI, OrdersListI} from "../types/order.types";
import {PlaceI} from "../types/place.types";
import {CitiesT, ProvincesT} from "../types/province.types";
import {SchedulesI} from "../types/schedules.types";
import {ScreeningI} from "../types/screening.type";
import {BlockUnsanitizedI, SeatStatus} from "../types/seats.types";
import {ShowI} from "../types/show.types";
import {SaleI} from "../types/sale.type";

const customHeader = {
    Auth: window?.selTicket?.token
};

const controller = {
    getScreening: () => server.get<HttpResponse<ScreeningI[]>>(PATHS.getScreening),
    getProvinces: () => server.get<HttpResponse<ProvincesT>>(PATHS.getProvinces),
    getCities: (provinceId: number) => server.get<HttpResponse<CitiesT>>(PATHS.getCities + provinceId, {
        params: {
            provinceId,
        },
    }),
    getShows: (screeningId: number) => server.get<HttpResponse<ShowI[]>>(PATHS.getShows + screeningId, {
        params: {
            screeningId,
        },
    }),
    getPlaces: (showId: number, provinceId: number, cityId: number) => server.get<HttpResponse<PlaceI[]>>(PATHS.getPlaces, {
        params: {
            showId,
            provinceId,
            cityId,
        },
    }),
    getSchedules: (placeId: number, showId: number) => server.get<HttpResponse<SchedulesI[]>>(PATHS.getSchedules, {
        params: {
            placeId,
            showId,
        },
    }),
    getSeats: (scheduleId: number) => server.get<
        HttpResponse<{
            blocks: BlockUnsanitizedI[];
        }>
    >(PATHS.getSeats + scheduleId, {
        params: {
            scheduleId,
        },
    }),
    getSeatStatus: (scheduleId: number) => server.get<HttpResponse<SeatStatus>>(PATHS.getSeatStatus + scheduleId, {
        params: {
            scheduleId,
        },
    }),
    getOrders: (page: number) => server.get<HttpResponse<OrdersListI>>(PATHS.getOrders, {
        params: {
            applicationId: window.selTicket?.applicationId,
            Page: page,
            Size: 15,
            Sort: "Default",
        },
        headers: customHeader,
    }),
    reserve: (dto: ReserveDtoI) => server.post<HttpResponse<OrderI>>(PATHS.reserve, dto, {headers: customHeader}),
    sale: (order_id:number) => server.post<HttpResponse<SaleI>>(PATHS.sale, {order_id, applicationId: window.selTicket?.applicationId}, {headers: customHeader}),
    fail: (order_id:number) => server.get<HttpResponse<any>>(PATHS.fail + order_id + `/${window.selTicket?.applicationId}`),
    check: (order_id:number) => server.get<HttpResponse<OrderDetailsDataI>>(PATHS.check + order_id + `/${window.selTicket?.applicationId}`, {headers: customHeader})
};

export default controller;
