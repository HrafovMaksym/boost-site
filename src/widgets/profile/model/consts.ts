import { User, Settings, ShoppingBag } from "lucide-react";

export const menuItems = [
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Orders",
    href: "/profile/orders",
    icon: ShoppingBag,
  },
  {
    name: "Settings",
    href: "/profile/settings",
    icon: Settings,
  },
];
