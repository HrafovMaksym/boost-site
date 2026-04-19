"use client";
import React, { useEffect, useState } from "react";
import { Title, Description } from "@/shared/ui";
import { Order } from "@/shared/lib/generated/prisma/client";
import { AlertCircle, RefreshCw } from "lucide-react";

import { orderApi } from "../model/order-api";

const OrderTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await orderApi.getOrders();
      setOrders(data);
    } catch (err: unknown) {
      console.error("Failed to fetch orders", err);
      setError("Failed to load your orders. It might be a network issue.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <Title title="Your Orders" styles="text-3xl font-bold tracking-tight" />
        <Description description="Track and manage your boost orders." />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-bg-secondary/30 border border-dashed border-border rounded-[var(--radius-xl)] text-center">
          <div className="w-16 h-16 rounded-full bg-bg-card flex items-center justify-center mb-6">
            <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          </div>
          <p className="text-text-primary text-xl font-bold animate-pulse">Loading orders...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 bg-red-500/5 border border-red-500/20 rounded-[var(--radius-xl)] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent pointer-events-none" />
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20 text-red-500">
            <AlertCircle size={32} />
          </div>
          <p className="text-white text-xl font-bold relative z-10">Oops, something went wrong</p>
          <p className="text-red-400 mt-2 max-w-xs text-sm relative z-10">{error}</p>
          
          <button
            onClick={fetchOrders}
            className="mt-6 flex items-center gap-2 px-6 py-3 bg-[#161b28] hover:bg-[#1c2234] border border-[#2d3446] rounded-xl text-xs font-bold text-white transition-all active:scale-95 z-10 group-hover:border-red-500/50"
          >
            <RefreshCw size={14} />
            Try Again
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-bg-secondary/30 border border-dashed border-border rounded-[var(--radius-xl)] text-center">
          <div className="w-16 h-16 rounded-full bg-bg-card flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-text-primary text-xl font-bold">
            No orders found yet
          </p>
          <p className="text-text-muted mt-2 max-w-xs">
            Visit our services page to start your first boost and reach your
            desired rank!
          </p>
        </div>
      ) : (
        <div className="w-full overflow-hidden rounded-2xl border border-border bg-bg-primary shadow-xl">
          <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full">
            <table className="w-full min-w-[700px] text-left text-sm text-text-primary">
              <thead className="bg-[#161b28]/50 border-b border-border/50 text-text-secondary uppercase text-[10px] tracking-widest font-black">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Progress</th>
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30 bg-[#0b0e16]/30">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-white/[0.02] transition-colors duration-200"
                  >
                    <td className="px-6 py-4 font-mono text-xs font-bold text-gray-400">
                      #{order.id.split("-")[0]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-xs">
                          {order.service.charAt(0)}
                        </div>
                        <span className="font-bold">{order.service}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {order.status === "PENDING" && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                          PENDING
                        </span>
                      )}
                      {order.status === "IN_PROGRESS" && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                          IN PROGRESS
                        </span>
                      )}
                      {order.status === "COMPLETED" && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-500/10 text-green-500 border border-green-500/20">
                          COMPLETED
                        </span>
                      )}
                      {order.status === "CANCELLED" && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                          CANCELLED
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-gray-400">
                          {order.currentValue}
                        </span>
                        <div className="w-16 h-1 bg-border rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[50%]" />
                        </div>
                        <span className="text-xs font-black text-white">
                          {order.desiredValue}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[10px] text-gray-400 font-medium">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-black text-white text-base">
                        €{order.total.toString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTable;
