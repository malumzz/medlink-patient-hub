
import React, { useState } from "react";
import { Button } from "../Component/ui/button";
import { Input } from "../Component/ui/input";
import { Card, CardContent } from "../Component/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Component/ui/table";
import { Search, Plus, Filter } from "lucide-react";

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
    <div className="animate-fade-in p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Patients</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add Patient
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          {/* Search and filter bar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
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
                  <TableRow key={patient.id} className="cursor-pointer hover:bg-gray-50">
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.contact}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          patient.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : patient.status === "Inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
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
