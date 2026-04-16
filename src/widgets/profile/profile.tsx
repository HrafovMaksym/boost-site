"use client";
import { Title } from "@/shared/ui";
import React from "react";

const Profile = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <Title
          title="Profile Settings"
          styles="text-3xl font-bold tracking-tight"
        />
        <Description description="Manage your account settings and preferences." />
      </div>

      <div className="grid gap-6">
        <div className="p-8 bg-bg-secondary/50 border border-border rounded-[var(--radius-lg)] space-y-6">
          <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
            Basic Information
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-text-muted uppercase tracking-widest">
                Full Name
              </span>
              <p className="text-text-primary font-semibold text-lg">
                {user.name}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-text-muted uppercase tracking-widest">
                Email Address
              </span>
              <p className="text-text-primary font-semibold text-lg">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-bg-secondary/50 border border-border rounded-[var(--radius-lg)] space-y-6">
          <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
            Account Details
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <span className="text-xs font-bold text-text-muted uppercase tracking-widest">
                Role
              </span>
              <div className="inline-flex px-2.5 py-0.5 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-bold uppercase">
                {user.role}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-text-muted uppercase tracking-widest">
                Joined
              </span>
              <p className="text-text-primary font-semibold text-lg">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
