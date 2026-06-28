import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

const courseBadgeColors = {
  "Computer Science": "bg-blue-100 text-blue-800",
  "Mathematics": "bg-purple-100 text-purple-800",
  "Physics": "bg-indigo-100 text-indigo-800",
  "Chemistry": "bg-emerald-100 text-emerald-800",
  "Biology": "bg-green-100 text-green-800",
  "Engineering": "bg-orange-100 text-orange-800",
  "Business": "bg-amber-100 text-amber-800",
  "Arts": "bg-pink-100 text-pink-800",
  "Medicine": "bg-red-100 text-red-800",
  "Law": "bg-slate-100 text-slate-800",
};

export default function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
        </div>
        <p className="text-lg font-medium">No students found</p>
        <p className="text-sm mt-1">Add your first student to get started.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Student ID</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold hidden sm:table-cell">Email</TableHead>
            <TableHead className="font-semibold hidden md:table-cell">Course</TableHead>
            <TableHead className="font-semibold hidden lg:table-cell">Age</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((s) => (
            <TableRow key={s.id} className="group">
              <TableCell className="font-mono text-sm font-medium">{s.student_id}</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground sm:hidden">{s.email}</p>
                  <div className="flex items-center gap-2 md:hidden mt-1">
                    <Badge variant="secondary" className={`text-xs ${courseBadgeColors[s.course] || ""}`}>
                      {s.course}
                    </Badge>
                    <span className="text-xs text-muted-foreground lg:hidden">{s.age} yrs</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">{s.email}</TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="secondary" className={`${courseBadgeColors[s.course] || ""}`}>
                  {s.course}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell text-muted-foreground">{s.age}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(s)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => onDelete(s)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
