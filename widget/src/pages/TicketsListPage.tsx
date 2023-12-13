import { FC, useEffect, useState } from "react";
import { useHttp } from "flawless-ui";
import controller from "../controllers/controller";
import Loader from "../components/loader/Loader";
import OrderCard from "../components/orders/OrderCard";
import EmptyOrders from "../components/orders/EmptyOrders";
import {OrdersListI} from "../types/order.types";

const TicketsListPage: FC = () => {
  const { Feedback, loading, call } = useHttp();
  const [orders, setOrders] = useState<OrdersListI>();
  const [pages, setPages] = useState<number>(1);

  const handleGetOrdersList = async () => {
    const response = await call(controller.getOrders(pages));

    if (response.status == 200) {
      setOrders(response.data?.data);
    }
  }

  useEffect(() => {
    handleGetOrdersList()
  }, []);


  if (loading)
    return (
      <div className="selticket-flex-center selticket-p-6">
        <Loader />
      </div>
    );

  return (
    <div className="selticket-p-4">
      {orders?.result?.length! > 0 ? (orders?.result?.map((order, index) => <OrderCard key={order?.orderId} data={order} />)) : <EmptyOrders />}
    </div>
  );
};

export default TicketsListPage;
