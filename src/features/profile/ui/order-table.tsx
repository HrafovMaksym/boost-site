"use client";
import React, { useEffect, useState } from "react";
import { Title, Description } from "@/shared/ui";
import { Order } from "@/shared/lib/generated/prisma/client";
import {
  AlertCircle,
  RefreshCw,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  ChevronDown,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import EloBar from "@/features/order-form/ui/elo-bar";
import ScoreBadge from "@/features/order-form/ui/premier-bar";
import { orderApi } from "../model/order-api";
import { toast } from "react-hot-toast";

const OPTION_LABELS: Record<string, string> = {
  selfplay: "Self Play",
  priority: "Priority",
  highRating: "High Rating",
  moreBoosters: "Add Boosters",
  superExpress: "Super Express",
  premiumCoaching: "Coaching",
  soloOnly: "Solo Only",
  offlineMode: "Offline Mode",
  bringFriend: "Bring Friend",
  premiumQue: "Premium Queue",
  starBooster: "Star Booster",
  boostersAmount: "Add Boosters",
  express: "Express",
  coaching: "Coaching",
  solo: "Solo Only",
  rankedBooster: "Ranked Booster",
  liveSession: "Live Session",
  demoReview: "Demo Review",
  voiceComms: "Voice Comms",
  screenShare: "Screen Share",
  proCoach: "Pro Coach",
};

type ServiceType =
  | "Faceit ELO Boost"
  | "CS2 Premiere Boost"
  | "CS2 Pro Coaching";

function getServiceTheme(service: string) {
  if (service.includes("Faceit"))
    return {
      color: "blue",
      gradient: "from-blue-600/20 to-cyan-600/10",
      border: "border-blue-500/30",
      text: "text-blue-400",
      bg: "bg-blue-500",
      bgLight: "bg-blue-500/10",
    };
  if (service.includes("Premiere"))
    return {
      color: "purple",
      gradient: "from-purple-600/20 to-pink-600/10",
      border: "border-purple-500/30",
      text: "text-purple-400",
      bg: "bg-purple-500",
      bgLight: "bg-purple-500/10",
    };
  return {
    color: "emerald",
    gradient: "from-emerald-600/20 to-teal-600/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    bg: "bg-emerald-500",
    bgLight: "bg-emerald-500/10",
  };
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    PENDING: {
      label: "Pending",
      icon: Clock,
      classes: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    },
    IN_PROGRESS: {
      label: "In Progress",
      icon: Loader2,
      classes: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    COMPLETED: {
      label: "Completed",
      icon: CheckCircle2,
      classes: "bg-green-500/10 text-green-400 border-green-500/20",
    },
    CANCELLED: {
      label: "Cancelled",
      icon: XCircle,
      classes: "bg-red-500/10 text-red-400 border-red-500/20",
    },
  }[status] || {
    label: status,
    icon: Clock,
    classes: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold border ${config.classes}`}
    >
      <Icon size={12} className={status === "IN_PROGRESS" ? "hidden" : ""} />
      {config.label}
    </span>
  );
}

function ProgressDisplay({ order }: { order: Order }) {
  const service = order.service as ServiceType;

  if (service === "CS2 Pro Coaching") {
    return (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <GraduationCap size={16} className="text-emerald-400" />
        </div>
        <div>
          <p className="text-white font-bold text-sm">
            {order.currentValue}{" "}
            {order.currentValue === 1 ? "Session" : "Sessions"}
          </p>
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
            Pro Coaching
          </p>
        </div>
      </div>
    );
  }

  if (service === "CS2 Premiere Boost") {
    return (
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <ScoreBadge value={order.currentValue} />
          <span className="text-xs font-bold text-gray-500">
            {order.currentValue.toLocaleString()}
          </span>
        </div>
        <ArrowRight size={14} className="text-gray-600" />
        <div className="flex items-center gap-2">
          <ScoreBadge value={order.desiredValue} />
          <span className="text-xs font-bold text-white">
            {order.desiredValue.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-2">
        <EloBar elo={order.currentValue} size={28} />
        <span className="text-xs font-bold text-gray-500">
          {order.currentValue} ELO
        </span>
      </div>
      <ArrowRight size={14} className="text-gray-600" />
      <div className="flex items-center gap-2">
        <EloBar elo={order.desiredValue} size={28} />
        <span className="text-xs font-bold text-white">
          {order.desiredValue} ELO
        </span>
      </div>
    </div>
  );
}

function OptionsDisplay({
  options,
  service,
}: {
  options: unknown;
  service: string;
}) {
  if (!options || typeof options !== "object") return null;

  const opts = options as Record<string, boolean | number>;
  const activeOptions = Object.entries(opts).filter(
    ([, val]) => val === true || (typeof val === "number" && val > 0),
  );

  if (activeOptions.length === 0) return null;

  const theme = getServiceTheme(service);

  return (
    <div className="flex flex-wrap gap-1.5">
      {activeOptions.map(([key, val]) => {
        const label = OPTION_LABELS[key] || key;
        const suffix =
          typeof val === "number" && val > 1
            ? ` x${val}`
            : typeof val === "number"
              ? ` x${val}`
              : "";
        return (
          <span
            key={key}
            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${theme.bgLight} ${theme.text} border ${theme.border}`}
          >
            {label}
            {suffix}
          </span>
        );
      })}
    </div>
  );
}

function OrderCard({
  order,
  onCancel,
}: {
  order: Order;
  onCancel: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const theme = getServiceTheme(order.service);
  const canCancel =
    order.status === "PENDING" || order.status === "IN_PROGRESS";

  const handleCancel = async () => {
    if (!confirmCancel) {
      setConfirmCancel(true);
      return;
    }
    setCancelling(true);
    try {
      await orderApi.cancelOrder(order.id);
      onCancel(order.id);
      toast.success("Order cancelled successfully");
    } catch {
      toast.error("Failed to cancel order");
    } finally {
      setCancelling(false);
      setConfirmCancel(false);
    }
  };

  return (
    <div
      className={`bg-[#0b0e16] border border-[#1f2330] rounded-2xl overflow-hidden transition-all hover:border-[#2d3446]`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full cursor-pointer p-5 flex items-center gap-4 flex-wrap sm:flex-nowrap text-left"
      >
        <div
          className={`w-10 h-10 rounded-xl ${theme.bgLight} border ${theme.border} flex items-center justify-center ${theme.text} font-bold text-sm shrink-0`}
        >
          {order.service.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-sm font-bold text-white truncate">
              {order.service}
            </p>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-[10px] text-gray-600 font-mono mt-1">
            #{order.id.split("-")[0]}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <span className="text-lg font-black text-white">
            <span className={`text-sm ${theme.text}`}>&euro;</span>
            {order.total.toString()}
          </span>
          <ChevronDown
            size={16}
            className={`text-gray-600 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {expanded && (
        <div className="border-t border-[#1f2330] p-5 space-y-5 bg-[#080a10]">
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-3">
              Progress
            </p>
            <ProgressDisplay order={order} />
          </div>

          <OptionsDisplay options={order.options} service={order.service} />

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">
                Ordered
              </p>
              <p className="text-xs text-gray-300 font-medium">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            {order.status === "COMPLETED" && (
              <div>
                <p className="text-[10px] text-green-500 uppercase font-bold tracking-widest mb-1">
                  Completed
                </p>
                <p className="text-xs text-gray-300 font-medium">
                  {new Date(order.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}
            {order.status === "CANCELLED" && (
              <div>
                <p className="text-[10px] text-red-500 uppercase font-bold tracking-widest mb-1">
                  Cancelled
                </p>
                <p className="text-xs text-gray-300 font-medium">
                  {new Date(order.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}
            {order.status === "IN_PROGRESS" && (
              <div>
                <p className="text-[10px] text-blue-500 uppercase font-bold tracking-widest mb-1">
                  Started
                </p>
                <p className="text-xs text-gray-300 font-medium">
                  {new Date(order.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}
          </div>

          {order.status === "CANCELLED" && (
            <div className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
              <p className="text-xs text-gray-400 flex-1">
                For more details about cancellation, please contact our support
                team.
              </p>
              <a
                href="https://discord.gg/XzMFHxdpJP"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#5865F2] hover:bg-[#4752C4] transition-all"
              >
                Contact Discord
              </a>
            </div>
          )}

          {canCancel && (
            <div className="flex justify-end pt-2 border-t border-[#1f2330]">
              {confirmCancel ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Are you sure?</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmCancel(false);
                    }}
                    className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-gray-400 bg-[#161b28] border border-[#2d3446] hover:bg-[#1c2234] transition-all cursor-pointer"
                  >
                    No, Keep
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancel();
                    }}
                    disabled={cancelling}
                    className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white bg-red-600 hover:bg-red-500 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {cancelling ? "Cancelling..." : "Yes, Cancel"}
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancel();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all cursor-pointer"
                >
                  Cancel Order
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

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

  const handleCancel = (id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status: "CANCELLED" as Order["status"],
              updatedAt: new Date(),
            }
          : o,
      ),
    );
  };

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
          <p className="text-text-primary text-xl font-bold animate-pulse">
            Loading orders...
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 bg-red-500/5 border border-red-500/20 rounded-[var(--radius-xl)] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent pointer-events-none" />
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20 text-red-500">
            <AlertCircle size={32} />
          </div>
          <p className="text-white text-xl font-bold relative z-10">
            Oops, something went wrong
          </p>
          <p className="text-red-400 mt-2 max-w-xs text-sm relative z-10">
            {error}
          </p>
          <button
            onClick={fetchOrders}
            className="mt-6 flex items-center gap-2 px-6 py-3 bg-[#161b28] hover:bg-[#1c2234] border border-[#2d3446] rounded-xl text-xs font-bold text-white transition-all active:scale-95 z-10 group-hover:border-red-500/50 cursor-pointer"
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
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} onCancel={handleCancel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTable;
