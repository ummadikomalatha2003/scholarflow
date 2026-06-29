import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Search, GraduationCap, LogOut } from "lucide-react";
import StudentTable from "@/components/students/StudentTable";
import StudentFormDialog from "@/components/students/StudentFormDialog";
import DeleteConfirmDialog from "@/components/students/DeleteConfirmDialog";
import StatsCards from "@/components/students/StatsCards";

const COURSES = [
  "All Courses",
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Engineering",
  "Business",
  "Arts",
  "Medicine",
  "Law",
];

export default function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [formOpen, setFormOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudent, setDeleteStudent] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { toast } = useToast();

  const fetchStudents = async () => {
    try {
      const data = await base44.entities.Student.list("-created_date");
      setStudents(data);
    } catch {
      toast({ title: "Error", description: "Failed to load students.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const unsub = base44.entities.Student.subscribe(() => fetchStudents());
    return unsub;
  }, []);

  const handleSave = async (data) => {
    try {
      if (editStudent) {
        await base44.entities.Student.update(editStudent.id, data);
        toast({ title: "Updated", description: `${data.name} has been updated.` });
      } else {
        await base44.entities.Student.create(data);
        toast({ title: "Added", description: `${data.name} has been added.` });
      }
      setEditStudent(null);
      await fetchStudents();
    } catch {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    try {
      await base44.entities.Student.delete(deleteStudent.id);
      toast({ title: "Deleted", description: `${deleteStudent.name} has been removed.` });
      setDeleteStudent(null);
      await fetchStudents();
    } catch {
      toast({ title: "Error", description: "Failed to delete student.", variant: "destructive" });
    }
  };

  const openEdit = (s) => {
    setEditStudent(s);
    setFormOpen(true);
  };

  const openAdd = () => {
    setEditStudent(null);
    setFormOpen(true);
  };

  const openDelete = (s) => {
    setDeleteStudent(s);
    setDeleteOpen(true);
  };

  const filtered = students.filter((s) => {
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.student_id.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchCourse = courseFilter === "All Courses" || s.course === courseFilter;
    return matchSearch && matchCourse;
  });

  const handleLogout = () => {
    base44.auth.logout("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-heading font-bold tracking-tight">Student Manager</h1>
              <p className="text-xs text-muted-foreground -mt-0.5 hidden sm:block">Manage your student records</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={openAdd} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Student</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats */}
        <StatsCards students={students} />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, ID, or email…"
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COURSES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <StudentTable students={filtered} onEdit={openEdit} onDelete={openDelete} />
        )}

        {/* Showing count */}
        {!loading && students.length > 0 && (
          <p className="text-xs text-muted-foreground text-center">
            Showing {filtered.length} of {students.length} students
          </p>
        )}
      </main>

      {/* Dialogs */}
      <StudentFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        student={editStudent}
        onSave={handleSave}
      />
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        student={deleteStudent}
        onConfirm={handleDelete}
      />
    </div>
  );
}
