import { Title, Description } from "@/shared/ui";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <Title title="Account Settings" styles="text-3xl font-bold tracking-tight" />
        <Description description="Update your password and security preferences." />
      </div>

      <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
        <p className="text-zinc-400">Settings functionality coming soon.</p>
      </div>
    </div>
  );
}
