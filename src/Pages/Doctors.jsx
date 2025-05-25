
import React from "react";
import { Button } from "../Component/ui/button";
import { Input } from "../Component/ui/input";
import { Card, CardContent } from "../Component/ui/card";
import { Search, Plus } from "lucide-react";

const Doctors = () => {
  // Mock doctors data
  const doctors = [
    {
      id: "DR001",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      experience: "15 years",
      contact: "+1 (555) 123-4567",
      email: "sarah.johnson@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: "DR002",
      name: "Dr. David Wilson",
      specialty: "Neurology",
      experience: "12 years",
      contact: "+1 (555) 234-5678",
      email: "david.wilson@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    {
      id: "DR003",
      name: "Dr. Emily Davis",
      specialty: "Pediatrics",
      experience: "8 years",
      contact: "+1 (555) 345-6789",
      email: "emily.davis@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    {
      id: "DR004",
      name: "Dr. Michael Brown",
      specialty: "Orthopedics",
      experience: "20 years",
      contact: "+1 (555) 456-7890",
      email: "michael.brown@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
  ];

  return (
    <div className="animate-fade-in p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Doctors</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add Doctor
        </Button>
      </div>

      {/* Search bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input placeholder="Search doctors by name, specialty..." className="pl-9" />
      </div>

      {/* Doctors grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="card-hover overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-blue-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">{doctor.name}</h3>
                  <span className="rounded-full bg-white/20 px-2 py-1 text-xs">{doctor.id}</span>
                </div>
                <p className="text-sm text-white/80">{doctor.specialty}</p>
              </div>
              <div className="p-4">
                <div className="flex items-center">
                  <div className="mr-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                    <img src={doctor.avatar} alt={doctor.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="text-gray-600">Experience:</span> {doctor.experience}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-600">Contact:</span> {doctor.contact}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm">
                  <span className="text-gray-600">Email:</span> {doctor.email}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Profile
                  </Button>
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
