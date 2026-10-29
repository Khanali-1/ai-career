import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

export default function StatCard({
  title,
  value,
  description,
  icon: Icon = TrendingUp,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <span className="rounded-xl bg-violet-50 p-3 text-violet-600">
          <Icon size={20} />
        </span>
      </div>

      <h3 className="mt-4 text-3xl font-bold text-gray-900">{value}</h3>
      {description && (
        <p className="mt-2 text-xs text-gray-500">{description}</p>
      )}
    </motion.div>
  );
}