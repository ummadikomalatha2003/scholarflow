import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COURSES = [
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

const emptyForm = { student_id: "", name: "", email: "", course: "", age: "" };

export default function StudentFormDialog({ open, onOpenChange, student, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const isEdit = !!student;

  useEffect(() => {
    if (student) {
      setForm({
        student_id: student.student_id || "",
        name: student.name || "",
        email: student.email || "",
        course: student.course || "",
        age: student.age ?? "",
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [student, open]);

  const validate = () => {
    const e = {};
    if (!form.student_id.trim()) e.student_id = "Required";
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.course) e.course = "Required";
    if (!form.age && form.age !== 0) e.age = "Required";
    else if (isNaN(form.age) || Number(form.age) < 1 || Number(form.age) > 120) e.age = "Enter a valid age";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    await onSave({ ...form, age: Number(form.age) });
    setSaving(false);
    onOpenChange(false);
  };

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading">
            {isEdit ? "Edit Student" : "Add New Student"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="student_id">Student ID</Label>
              <Input
                id="student_id"
                placeholder="e.g. STU-001"
                value={form.student_id}
                onChange={(e) => set("student_id", e.target.value)}
                disabled={isEdit}
                className={errors.student_id ? "border-destructive" : ""}
              />
              {errors.student_id && <p className="text-xs text-destructive">{errors.student_id}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g. 21"
                value={form.age}
                onChange={(e) => set("age", e.target.value)}
                className={errors.age ? "border-destructive" : ""}
              />
              {errors.age && <p className="text-xs text-destructive">{errors.age}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@university.edu"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Course</Label>
            <Select value={form.course} onValueChange={(v) => set("course", v)}>
              <SelectTrigger className={errors.course ? "border-destructive" : ""}>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {COURSES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.course && <p className="text-xs text-destructive">{errors.course}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : isEdit ? "Update Student" : "Add Student"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
