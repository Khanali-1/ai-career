import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  Map,
  MessageSquare,
  UserRound,
  ClipboardList,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Find Jobs", path: "/jobs", icon: BriefcaseBusiness },
  { label: "Resume Analyzer", path: "/resume", icon: FileText },
  { label: "Career Roadmap", path: "/roadmap", icon: Map },
  { label: "Interview Coach", path: "/interview", icon: MessageSquare },
  { label: "Applications", path: "/applications", icon: ClipboardList },
  { label: "My Profile", path: "/profile", icon: UserRound },
];

export default function Sidebar() {
  return (
    <aside className="w-full rounded-2xl border border-gray-100 bg-white p-4 md:min-h-[calc(100vh-120px)] md:w-64">
      <p className="mb-4 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
        Workspace
      </p>

      <nav className="space-y-1">
        {menuItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-violet-50 text-violet-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}