import { Clock3, CheckCircle2, FileText, BriefcaseBusiness } from "lucide-react";

const defaultActivities = [
  {
    title: "Resume profile reviewed",
    detail: "Your resume analysis is ready.",
    time: "Today",
    icon: FileText,
  },
  {
    title: "New job matches found",
    detail: "3 roles match your selected skills.",
    time: "Yesterday",
    icon: BriefcaseBusiness,
  },
  {
    title: "Career goal updated",
    detail: "Your roadmap progress was updated.",
    time: "2 days ago",
    icon: CheckCircle2,
  },
];

export default function ActivityFeed({ activities = defaultActivities }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-bold text-gray-900">Recent activity</h2>
        <Clock3 size={18} className="text-gray-400" />
      </div>

      <div className="space-y-5">
        {activities.map((activity, index) => {
          const Icon = activity.icon || CheckCircle2;

          return (
            <div key={`${activity.title}-${index}`} className="flex gap-3">
              <span className="h-fit rounded-xl bg-violet-50 p-3 text-violet-600">
                <Icon size={18} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {activity.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">{activity.detail}</p>
                <p className="mt-2 text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}