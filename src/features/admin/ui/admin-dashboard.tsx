"use client";
import React, { useEffect, useState, useRef } from "react";
import { Title, Description } from "@/shared/ui";
import {
  ShieldAlert,
  Activity,
  Users,
  Package,
  Save,
  ExternalLink,
  ChevronDown,
  CalendarIcon,
  Download,
  X,
} from "lucide-react";
import { api } from "@/shared/config/axios-config";
import { toast } from "react-hot-toast";
import { Calendar } from "@/shared/ui/calendar";
import type { AdminOrder, AdminUser } from "../model/types";

type Tab = "orders" | "users";

const STATUSES = ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;

function escapeCsv(val: string): string {
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

function formatDate(date: string | null): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function exportToCsv(orders: AdminOrder[], users: AdminUser[]) {
  const orderHeaders = [
    "Order ID",
    "Service",
    "Status",
    "Customer Name",
    "Customer Email",
    "Current Value",
    "Desired Value",
    "Total (EUR)",
    "Ordered",
    "Started",
    "Completed",
  ];

  const orderRows = orders.map((o) =>
    [
      o.id,
      o.service,
      o.status,
      o.user?.name || "",
      o.user?.email || "",
      String(o.currentValue),
      String(o.desiredValue),
      Number(o.total).toFixed(2),
      formatDate(o.createdAt),
      formatDate(o.startedAt),
      formatDate(o.completedAt),
    ].map(escapeCsv).join(","),
  );

  const userHeaders = [
    "User ID",
    "Name",
    "Email",
    "Role",
    "Steam Link",
    "Orders Count",
    "Registered",
  ];

  const userRows = users.map((u) =>
    [
      u.id,
      u.name,
      u.email,
      u.role,
      u.steamLink || "",
      String(u._count.orders),
      formatDate(u.createdAt),
    ].map(escapeCsv).join(","),
  );

  const csv = [
    "ORDERS",
    orderHeaders.join(","),
    ...orderRows,
    "",
    "USERS",
    userHeaders.join(","),
    ...userRows,
  ].join("\n");

  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `admin-export-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

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

  const updateOrder = (updated: AdminOrder) => {
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
  };

  const updateUser = (updated: AdminUser) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

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
        <Title
          title="Admin Dashboard"
          styles="text-3xl font-bold tracking-tight text-purple-400"
        />
        <Description description="Manage all system orders and activity." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<Package size={18} />}
          label="Total Orders"
          value={loading ? "..." : String(orders.length)}
        />
        <StatCard
          icon={<Activity size={18} />}
          label="Total Revenue"
          value={loading ? "..." : `€${totalRevenue.toFixed(2)}`}
          valueColor="text-green-400"
        />
        <StatCard
          icon={<Users size={18} />}
          label="Total Users"
          value={loading ? "..." : String(users.length)}
          valueColor="text-blue-400"
        />
      </div>

      <div className="flex items-center gap-2">
        <TabButton
          active={tab === "orders"}
          onClick={() => setTab("orders")}
          label="Orders"
        />
        <TabButton
          active={tab === "users"}
          onClick={() => setTab("users")}
          label="Users"
        />
        <button
          onClick={() => exportToCsv(orders, users)}
          disabled={loading}
          className="ml-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 hover:bg-emerald-500 transition-all cursor-pointer disabled:opacity-50"
        >
          <Download size={14} />
          Export Info
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : tab === "orders" ? (
        <OrdersTable orders={orders} onUpdate={updateOrder} />
      ) : (
        <UsersTable users={users} onUpdate={updateUser} />
      )}
    </div>
  );
};

function StatCard({
  icon,
  label,
  value,
  valueColor = "text-white",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="bg-[#161b28] p-6 rounded-2xl border border-[#2d3446]">
      <div className="flex items-center gap-3 text-gray-400 mb-2">
        {icon}
        <span className="font-bold uppercase tracking-wider text-xs">
          {label}
        </span>
      </div>
      <p className={`text-3xl font-black ${valueColor}`}>{value}</p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
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

function StatusDropdown({
  orderId,
  currentStatus,
  onUpdate,
}: {
  orderId: string;
  currentStatus: string;
  onUpdate: (order: AdminOrder) => void;
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = async (status: string) => {
    if (status === currentStatus) {
      setOpen(false);
      return;
    }
    setSaving(true);
    try {
      const payload: Record<string, unknown> = { status };
      if (status === "IN_PROGRESS" && currentStatus === "PENDING") {
        payload.startedAt = new Date().toISOString();
      }
      if (status === "COMPLETED") {
        payload.completedAt = new Date().toISOString();
      }
      const { data } = await api.patch<AdminOrder>(`admin/orders/${orderId}`, payload);
      onUpdate(data);
      toast.success(`Status changed to ${status.replace("_", " ")}`);
    } catch {
      toast.error("Failed to update status");
    } finally {
      setSaving(false);
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={saving}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border cursor-pointer transition-all ${statusStyles[currentStatus] || statusStyles.PENDING} ${saving ? "opacity-50" : "hover:brightness-125"}`}
      >
        {saving ? "..." : currentStatus.replace("_", " ")}
        <ChevronDown size={10} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 bg-[#1c2234] border border-[#2d3446] rounded-xl overflow-hidden shadow-2xl shadow-black/50 z-50 min-w-[140px]">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => handleSelect(s)}
              className={`w-full text-left px-4 py-2 text-[11px] font-bold transition-colors cursor-pointer ${
                s === currentStatus
                  ? "bg-white/5 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DatePicker({
  label,
  value,
  orderId,
  field,
  currentStatus,
  onUpdate,
  color = "blue",
}: {
  label: string;
  value: string | null;
  orderId: string;
  field: "startedAt" | "completedAt";
  currentStatus: string;
  onUpdate: (order: AdminOrder) => void;
  color?: string;
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = async (date: Date | undefined) => {
    if (!date) return;
    setSaving(true);
    try {
      const payload: Record<string, unknown> = { [field]: date.toISOString() };
      if (field === "startedAt" && currentStatus !== "IN_PROGRESS") {
        payload.status = "IN_PROGRESS";
      }
      if (field === "completedAt" && currentStatus !== "COMPLETED") {
        payload.status = "COMPLETED";
      }
      const { data } = await api.patch<AdminOrder>(`admin/orders/${orderId}`, payload);
      onUpdate(data);
      const statusChanged = payload.status ? ` → ${(payload.status as string).replace("_", " ")}` : "";
      toast.success(`${label} updated${statusChanged}`);
    } catch {
      toast.error(`Failed to update ${label.toLowerCase()}`);
    } finally {
      setSaving(false);
      setOpen(false);
    }
  };

  const handleClear = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaving(true);
    try {
      const { data } = await api.patch<AdminOrder>(`admin/orders/${orderId}`, {
        [field]: null,
      });
      onUpdate(data);
    } catch {
      toast.error("Failed to clear date");
    } finally {
      setSaving(false);
    }
  };

  const colorClasses = color === "green"
    ? "text-green-400 border-green-500/20 bg-green-500/5 hover:bg-green-500/10"
    : "text-blue-400 border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10";

  return (
    <div ref={ref} className="relative">
      <div className="flex flex-col gap-0.5">
        <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">
          {label}
        </span>
        <button
          onClick={() => setOpen(!open)}
          disabled={saving}
          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-medium border cursor-pointer transition-all ${colorClasses}`}
        >
          <CalendarIcon size={10} />
          {value
            ? new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Not set"}
          {value && (
            <span
              onClick={handleClear}
              className="ml-1 hover:text-white transition-colors"
            >
              <X size={10} />
            </span>
          )}
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-[#161b28] border border-[#2d3446] rounded-xl shadow-2xl shadow-black/50 p-1">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={handleSelect}
            className="bg-[#161b28] text-white [--cell-size:--spacing(8)]"
          />
        </div>
      )}
    </div>
  );
}

function OrdersTable({
  orders,
  onUpdate,
}: {
  orders: AdminOrder[];
  onUpdate: (order: AdminOrder) => void;
}) {
  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-[#0b0e16] border border-[#1f2330] rounded-2xl p-5 space-y-4 hover:border-[#2d3446] transition-colors"
        >
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-mono text-xs font-bold text-gray-500">
              #{order.id.split("-")[0]}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">
                {order.service}
              </p>
              <p className="text-[10px] text-gray-500">
                {order.user?.name || "Unknown"} &middot; {order.user?.email || ""}
              </p>
            </div>
            <StatusDropdown
              orderId={order.id}
              currentStatus={order.status}
              onUpdate={onUpdate}
            />
            <span className="text-lg font-black text-white">
              &euro;{Number(order.total).toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-gray-500">
              {order.currentValue.toLocaleString()}
            </span>
            <div className="w-12 h-0.5 bg-[#2d3446] rounded-full" />
            <span className="text-white font-bold">
              {order.desiredValue.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">
                Ordered
              </span>
              <span className="text-[11px] text-gray-300 font-medium">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <DatePicker
              label="Started"
              value={order.startedAt}
              orderId={order.id}
              field="startedAt"
              currentStatus={order.status}
              onUpdate={onUpdate}
              color="blue"
            />
            <DatePicker
              label="Completed"
              value={order.completedAt}
              orderId={order.id}
              field="completedAt"
              currentStatus={order.status}
              onUpdate={onUpdate}
              color="green"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function SteamLinkCell({
  user,
  onUpdate,
}: {
  user: AdminUser;
  onUpdate: (u: AdminUser) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(user.steamLink || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await api.patch<AdminUser>(`admin/users/${user.id}`, {
        steamLink: value.trim(),
      });
      onUpdate(data);
      toast.success("Steam link saved");
      setEditing(false);
    } catch {
      toast.error("Failed to save steam link");
    } finally {
      setSaving(false);
    }
  };

  if (!editing) {
    return (
      <button
        onClick={() => {
          setValue(user.steamLink || "");
          setEditing(true);
        }}
        className="text-left cursor-pointer group"
      >
        {user.steamLink ? (
          <span className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
            <ExternalLink size={10} />
            <span className="truncate max-w-[140px]">{user.steamLink}</span>
          </span>
        ) : (
          <span className="text-[10px] text-gray-600 group-hover:text-gray-400 transition-colors">
            + Add Steam
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSave();
          if (e.key === "Escape") setEditing(false);
        }}
        placeholder="Steam profile URL"
        className="w-[160px] px-2 py-1 bg-[#0b0e16] border border-[#2d3446] rounded-lg text-xs text-white outline-none focus:border-blue-500/50"
      />
      <button
        onClick={handleSave}
        disabled={saving}
        className="p-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white transition-all cursor-pointer disabled:opacity-50"
      >
        <Save size={12} />
      </button>
      <button
        onClick={() => setEditing(false)}
        className="p-1 rounded-md bg-[#1f2330] hover:bg-[#2d3446] text-gray-400 transition-all cursor-pointer"
      >
        <X size={12} />
      </button>
    </div>
  );
}

function UsersTable({
  users,
  onUpdate,
}: {
  users: AdminUser[];
  onUpdate: (u: AdminUser) => void;
}) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-bg-primary shadow-xl">
      <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full">
        <table className="w-full min-w-[800px] text-left text-sm text-text-primary">
          <thead className="bg-[#161b28]/50 border-b border-border/50 text-text-secondary uppercase text-[10px] tracking-widest font-black">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Steam</th>
              <th className="px-6 py-4">Orders</th>
              <th className="px-6 py-4 text-right">Registered</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30 bg-[#0b0e16]/30">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-white/[0.02] transition-colors duration-200"
              >
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
                <td className="px-6 py-4">
                  <SteamLinkCell user={user} onUpdate={onUpdate} />
                </td>
                <td className="px-6 py-4 font-black text-white">
                  {user._count.orders}
                </td>
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
