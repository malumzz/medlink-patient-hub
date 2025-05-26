
import React, { useState } from "react";
import { Search, Plus, Download, Filter, FileText, Calendar, User } from "lucide-react";

// Inline utility function
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

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

const Records = () => {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock medical records data
  const records = [
    {
      id: "MR001",
      patientName: "Emma Wilson",
      patientId: "P001",
      type: "Lab Report",
      date: "2024-01-15",
      doctor: "Dr. Sarah Johnson",
      status: "Completed",
      description: "Blood work analysis - Complete blood count",
    },
    {
      id: "MR002",
      patientName: "John Miller",
      patientId: "P002",
      type: "X-Ray",
      date: "2024-01-14",
      doctor: "Dr. Michael Brown",
      status: "Completed",
      description: "Chest X-ray examination",
    },
    {
      id: "MR003",
      patientName: "Sophia Garcia",
      patientId: "P003",
      type: "Prescription",
      date: "2024-01-13",
      doctor: "Dr. Emily Davis",
      status: "Active",
      description: "Antibiotic prescription for respiratory infection",
    },
    {
      id: "MR004",
      patientName: "Michael Chen",
      patientId: "P004",
      type: "Consultation",
      date: "2024-01-12",
      doctor: "Dr. David Wilson",
      status: "Completed",
      description: "Cardiology consultation and ECG",
    },
    {
      id: "MR005",
      patientName: "Olivia Brown",
      patientId: "P005",
      type: "MRI Scan",
      date: "2024-01-11",
      doctor: "Dr. Jessica Martinez",
      status: "Pending",
      description: "Brain MRI scan for headache evaluation",
    },
    {
      id: "MR006",
      patientName: "James Johnson",
      patientId: "P006",
      type: "Lab Report",
      date: "2024-01-10",
      doctor: "Dr. Robert Lee",
      status: "Completed",
      description: "Diabetes monitoring - HbA1c test",
    },
  ];

  // Filter records based on search and selected filter
  const filteredRecords = records.filter((record) => {
    const matchesSearch = search === "" || 
      record.patientName.toLowerCase().includes(search.toLowerCase()) ||
      record.id.toLowerCase().includes(search.toLowerCase()) ||
      record.type.toLowerCase().includes(search.toLowerCase()) ||
      record.doctor.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || 
      record.status.toLowerCase() === selectedFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "status-completed";
      case "active":
        return "status-active";
      case "pending":
        return "status-pending";
      default:
        return "status-completed";
    }
  };

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "lab report":
        return <FileText className="h-4 w-4" />;
      case "x-ray":
      case "mri scan":
        return <FileText className="h-4 w-4" />;
      case "prescription":
        return <FileText className="h-4 w-4" />;
      case "consultation":
        return <User className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Inline styles */}
      <style jsx>{`
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .status-completed {
          display: inline-flex;
          align-items: center;
          border-radius: 9999px;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
          background-color: #dcfce7;
          color: #166534;
        }
        
        .status-active {
          display: inline-flex;
          align-items: center;
          border-radius: 9999px;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
          background-color: #dbeafe;
          color: #1e40af;
        }
        
        .status-pending {
          display: inline-flex;
          align-items: center;
          border-radius: 9999px;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
          background-color: #fef3c7;
          color: #92400e;
        }
        
        .record-card {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        
        .record-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .filter-button {
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          border: 1px solid #d1d5db;
          background-color: white;
          color: #374151;
          font-size: 0.875rem;
          transition: all 0.2s;
          cursor: pointer;
        }
        
        .filter-button:hover {
          background-color: #f3f4f6;
        }
        
        .filter-button.active {
          background-color: #274D60;
          color: white;
          border-color: #274D60;
        }
      `}</style>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Medical Records</h1>
        <Button className="bg-[#274D60] hover:bg-[#1A3A4A] text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Record
        </Button>
      </div>

      {/* Search and filter bar */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search records by patient, type, or doctor..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {["all", "completed", "active", "pending"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`filter-button ${selectedFilter === filter ? "active" : ""}`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Records grid */}
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {filteredRecords.map((record) => (
          <Card key={record.id} className="record-card cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#274D60] text-white">
                    {getTypeIcon(record.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{record.type}</h3>
                    <p className="text-sm text-muted-foreground">{record.id}</p>
                  </div>
                </div>
                <span className={getStatusColor(record.status)}>
                  {record.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{record.patientName} ({record.patientId})</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(record.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{record.doctor}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {record.description}
              </p>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View
                </Button>
                <Button size="sm" className="flex-1 bg-[#274D60] hover:bg-[#1A3A4A] text-white">
                  <Download className="mr-1 h-3 w-3" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No records found</h3>
            <p className="text-muted-foreground">
              No medical records match your current search criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Records;
