import React from "react";
import { Users, BookOpen, GraduationCap, TrendingUp } from "lucide-react";

export default function StatsCards({ students }) {
  const totalStudents = students.length;
  const uniqueCourses = new Set(students.map((s) => s.course)).size;
  const avgAge = totalStudents > 0 ? Math.round(students.reduce((a, s) => a + s.age, 0) / totalStudents) : 0;

  const stats = [
    { label: "Total Students", value: totalStudents, icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Courses", value: uniqueCourses, icon: BookOpen, color: "bg-purple-50 text-purple-600" },
    { label: "Avg. Age", value: avgAge || "—", icon: GraduationCap, color: "bg-emerald-50 text-emerald-600" },
    { label: "Active", value: totalStudents, icon: TrendingUp, color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-card border rounded-xl p-5 flex items-start gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
            <s.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-2xl font-heading font-bold tracking-tight">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
