import { createMemoryRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import OrderPage from "../pages/OrderPage";
import ScreeningPage from "../pages/ScreeningPage";
import SeatsPage from "../pages/SeatsPage";
import ShowPage from "../pages/ShowPage";
import TicketsListPage from "../pages/TicketsListPage";
import React from "react";
import DetailsTicketPage from "../pages/DetailsTicketPage";

const router = createMemoryRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<ScreeningPage />} />
            <Route path="show" element={<ShowPage />} />
            <Route path="orders" element={<TicketsListPage />} />
            <Route path="seats" element={<SeatsPage />} />
            <Route path="order" element={<OrderPage />} />
            <Route path="details/:orderId" element={<DetailsTicketPage />} />
        </Route>
    )
)

export default router