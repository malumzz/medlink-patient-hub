
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Loader2 } from "lucide-react";
import { useDoctors } from "@/hooks/useDoctors";

const Doctors = () => {
  const { data: doctors, isLoading, error } = useDoctors();

  if (error) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-2">Error loading doctors</p>
            <p className="text-muted-foreground">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

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

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading doctors...</span>
        </div>
      )}

      {/* Doctors grid */}
      {!isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors?.map((doctor) => (
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
          )) || []}
          
          {doctors?.length === 0 && !isLoading && (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No doctors found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Doctors;
