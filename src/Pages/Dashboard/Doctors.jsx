
import React from "react";
import { Search, Plus } from "lucide-react";
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
    {
      id: "DR005",
      name: "Dr. Jessica Martinez",
      specialty: "Dermatology",
      experience: "10 years",
      contact: "+1 (555) 567-8901",
      email: "jessica.martinez@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    },
    {
      id: "DR006",
      name: "Dr. Robert Lee",
      specialty: "Ophthalmology",
      experience: "14 years",
      contact: "+1 (555) 678-9012",
      email: "robert.lee@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Doctors</h1>
        <Button className="bg-medical hover:bg-medical-dark">
          <Plus className="mr-2 h-4 w-4" /> Add Doctor
        </Button>
      </div>

      {/* Search bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search doctors by name, specialty..." className="pl-9" />
      </div>

      {/* Doctors grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="card-hover overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-medical p-4 text-white">
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
                      <span className="text-muted-foreground">Experience:</span> {doctor.experience}
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Contact:</span> {doctor.contact}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm">
                  <span className="text-muted-foreground">Email:</span> {doctor.email}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Profile
                  </Button>
                  <Button size="sm" className="flex-1 bg-medical hover:bg-medical-dark">
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
