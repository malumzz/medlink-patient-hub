
import React, { useState } from "react";
import { Search, Plus, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

// Inline UI Components
const Button = ({ className, variant = "default", size = "default", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
};

const Input = ({ className, ...props }) => (
  <input
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);

const Card = ({ className, ...props }) => (
  <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6", className)} {...props} />
);

const Table = ({ className, ...props }) => (
  <div className="relative w-full overflow-auto">
    <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
);

const TableHeader = ({ className, ...props }) => (
  <thead className={cn("[&_tr]:border-b", className)} {...props} />
);

const TableBody = ({ className, ...props }) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);

const TableRow = ({ className, ...props }) => (
  <tr className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)} {...props} />
);

const TableHead = ({ className, ...props }) => (
  <th className={cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className)} {...props} />
);

const TableCell = ({ className, ...props }) => (
  <td className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
);

const Patients = () => {
  const [search, setSearch] = useState("");

  // Mock patient data
  const patients = [
    {
      id: "P001",
      name: "Emma Wilson",
      age: 35,
      gender: "Female",
      contact: "+1 (555) 123-4567",
      email: "emma.w@example.com",
      status: "Active",
    },
    {
      id: "P002",
      name: "John Miller",
      age: 42,
      gender: "Male",
      contact: "+1 (555) 234-5678",
      email: "john.m@example.com",
      status: "Active",
    },
    {
      id: "P003",
      name: "Sophia Garcia",
      age: 28,
      gender: "Female",
      contact: "+1 (555) 345-6789",
      email: "sophia.g@example.com",
      status: "Inactive",
    },
    {
      id: "P004",
      name: "Michael Chen",
      age: 51,
      gender: "Male",
      contact: "+1 (555) 456-7890",
      email: "michael.c@example.com",
      status: "Active",
    },
    {
      id: "P005",
      name: "Olivia Brown",
      age: 22,
      gender: "Female",
      contact: "+1 (555) 567-8901",
      email: "olivia.b@example.com",
      status: "Pending",
    },
    {
      id: "P006",
      name: "James Johnson",
      age: 65,
      gender: "Male",
      contact: "+1 (555) 678-9012",
      email: "james.j@example.com",
      status: "Active",
    },
    {
      id: "P007",
      name: "Ava Martinez",
      age: 31,
      gender: "Female",
      contact: "+1 (555) 789-0123",
      email: "ava.m@example.com",
      status: "Inactive",
    },
    {
      id: "P008",
      name: "William Taylor",
      age: 47,
      gender: "Male",
      contact: "+1 (555) 890-1234",
      email: "william.t@example.com",
      status: "Active",
    },
  ];

  // Filter patients based on search
  const filteredPatients = search
    ? patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(search.toLowerCase()) ||
          patient.id.toLowerCase().includes(search.toLowerCase()) ||
          patient.contact.includes(search) ||
          patient.email.toLowerCase().includes(search.toLowerCase())
      )
    : patients;

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Patients</h1>
        <Button className="bg-medical hover:bg-medical-dark">
          <Plus className="mr-2 h-4 w-4" /> Add Patient
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          {/* Search and filter bar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>

          {/* Patients table */}
          <div className="table-container overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.contact}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>
                      <span
                        className={
                          patient.status === "Active"
                            ? "status-active"
                            : patient.status === "Inactive"
                            ? "status-inactive"
                            : "status-pending"
                        }
                      >
                        {patient.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Patients;
