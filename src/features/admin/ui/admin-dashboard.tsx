"use client";
import React, { useEffect, useState } from "react";
import { Title, Description } from "@/shared/ui";
import { ShieldAlert, Activity, Users, Package } from "lucide-react";
import { api } from "@/shared/config/axios-config";
import type { AdminOrder, AdminUser } from "../model/types";

type Tab = "orders" | "users";

export const AdminDashboard = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("orders");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, usersRes] = await Promise.all([
          api.get<AdminOrder[]>("admin/orders"),
          api.get<AdminUser[]>("admin/users"),
        ]);
        setOrders(ordersRes.data);
        setUsers(usersRes.data);
      } catch {
        setError("Failed to load admin data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-red-500/5 border border-red-500/20 rounded-[var(--radius-xl)] text-center">
        <ShieldAlert size={48} className="text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Error</h2>
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  const totalRevenue = orders.reduce((acc, o) => acc + Number(o.total || 0), 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <Title title="Admin Dashboard" styles="text-3xl font-bold tracking-tight text-purple-400" />
        <Description description="Manage all system orders and activity." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={<Package size={18} />} label="Total Orders" value={loading ? "..." : String(orders.length)} />
        <StatCard icon={<Activity size={18} />} label="Total Revenue" value={loading ? "..." : `€${totalRevenue.toFixed(2)}`} valueColor="text-green-400" />
        <StatCard icon={<Users size={18} />} label="Total Users" value={loading ? "..." : String(users.length)} valueColor="text-blue-400" />
      </div>

      <div className="flex gap-2">
        <TabButton active={tab === "orders"} onClick={() => setTab("orders")} label="Orders" />
        <TabButton active={tab === "users"} onClick={() => setTab("users")} label="Users" />
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : tab === "orders" ? (
        <OrdersTable orders={orders} />
      ) : (
        <UsersTable users={users} />
      )}
    </div>
  );
};

function StatCard({ icon, label, value, valueColor = "text-white" }: { icon: React.ReactNode; label: string; value: string; valueColor?: string }) {
  return (
    <div className="bg-[#161b28] p-6 rounded-2xl border border-[#2d3446]">
      <div className="flex items-center gap-3 text-gray-400 mb-2">
        {icon}
        <span className="font-bold uppercase tracking-wider text-xs">{label}</span>
      </div>
      <p className={`text-3xl font-black ${valueColor}`}>{value}</p>
    </div>
  );
}

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
        active
          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
          : "bg-[#161b28] text-gray-400 border border-[#2d3446] hover:bg-[#1c2234]"
      }`}
    >
      {label}
    </button>
  );
}

function OrdersTable({ orders }: { orders: AdminOrder[] }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-bg-primary shadow-xl">
      <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full">
        <table className="w-full min-w-[800px] text-left text-sm text-text-primary">
          <thead className="bg-[#161b28]/50 border-b border-border/50 text-text-secondary uppercase text-[10px] tracking-widest font-black">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30 bg-[#0b0e16]/30">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/[0.02] transition-colors duration-200">
                <td className="px-6 py-4 font-mono text-xs font-bold text-gray-400">
                  #{order.id.split("-")[0]}
                </td>
                <td className="px-6 py-4">
                  <div className="text-white font-bold">{order.user?.name || "Unknown"}</div>
                  <div className="text-xs text-gray-500">{order.user?.email || ""}</div>
                </td>
                <td className="px-6 py-4 font-bold text-blue-400">{order.service}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 font-black">€{Number(order.total).toFixed(2)}</td>
                <td className="px-6 py-4 text-right text-[10px] text-gray-400 font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UsersTable({ users }: { users: AdminUser[] }) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-bg-primary shadow-xl">
      <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full">
        <table className="w-full min-w-[700px] text-left text-sm text-text-primary">
          <thead className="bg-[#161b28]/50 border-b border-border/50 text-text-secondary uppercase text-[10px] tracking-widest font-black">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Orders</th>
              <th className="px-6 py-4 text-right">Registered</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30 bg-[#0b0e16]/30">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-white/[0.02] transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xs uppercase">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-bold">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-6 py-4 font-black text-white">{user._count.orders}</td>
                <td className="px-6 py-4 text-right text-[10px] text-gray-400 font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  IN_PROGRESS: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  COMPLETED: "bg-green-500/10 text-green-500 border-green-500/20",
  CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold border ${statusStyles[status] || statusStyles.PENDING}`}>
      {status.replace("_", " ")}
    </span>
  );
}

function RoleBadge({ role }: { role: string }) {
  const isAdmin = role === "ADMIN";
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold border ${
        isAdmin
          ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
          : "bg-gray-500/10 text-gray-400 border-gray-500/20"
      }`}
    >
      {role}
    </span>
  );
}
