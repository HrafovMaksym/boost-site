"use client";
import { useAppSelector } from "@/shared/hooks/redux-hook";
import { Description, Title } from "@/shared/ui";
import { Mail, Calendar, Shield } from "lucide-react";
import React from "react";

const Profile = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <Title
          title="Profile"
          styles="text-3xl font-bold tracking-tight"
        />
        <Description description="Your account information." />
      </div>

      <div className="p-8 bg-bg-secondary/50 border border-border rounded-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-primary to-blue-600 flex items-center justify-center text-white font-black text-3xl uppercase shadow-xl shadow-accent-primary/20">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white">{user?.name || "User"}</h2>
            <p className="text-text-muted text-sm">{user?.email || ""}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <InfoCard
          icon={<Mail size={18} />}
          label="Email Address"
          value={user?.email || "N/A"}
        />
        <InfoCard
          icon={<Calendar size={18} />}
          label="Member Since"
          value={
            user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "N/A"
          }
        />
      </div>
    </div>
  );
};

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-6 bg-bg-secondary/50 border border-border rounded-2xl space-y-3">
      <div className="flex items-center gap-2 text-text-muted">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-white font-bold text-lg">{value}</p>
    </div>
  );
}

export default Profile;
