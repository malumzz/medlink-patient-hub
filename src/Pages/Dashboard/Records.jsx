
import React, { useState } from "react";
import { FileText, Download, Share2, Search, Filter, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

// Inline UI Components
const Button = ({ className, variant = "default", size = "default", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
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

const CardHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

const CardTitle = ({ className, ...props }) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
);

const CardDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);

const Tabs = ({ children, value, onValueChange }) => (
  <div data-value={value} data-onvaluechange={onValueChange}>
    {children}
  </div>
);

const TabsList = ({ className, children, ...props }) => (
  <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)} {...props}>
    {children}
  </div>
);

const TabsTrigger = ({ className, value, children, onClick, isActive, ...props }) => (
  <button
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      isActive ? "bg-background text-foreground shadow-sm" : "",
      className
    )}
    onClick={() => onClick(value)}
    {...props}
  >
    {children}
  </button>
);

const Records = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Mock records data
  const records = [
    {
      id: "REC001",
      patientName: "Emma Wilson",
      patientId: "P001",
      recordType: "Lab Results",
      department: "Cardiology",
      date: "2023-05-15",
      doctor: "Dr. Sarah Johnson",
      status: "Completed",
      fileSize: "2.4 MB",
    },
    {
      id: "REC002",
      patientName: "John Miller",
      patientId: "P002",
      recordType: "MRI Scan",
      department: "Neurology",
      date: "2023-05-10",
      doctor: "Dr. David Wilson",
      status: "Pending Review",
      fileSize: "15.7 MB",
    },
    {
      id: "REC003",
      patientName: "Sophia Garcia",
      patientId: "P003",
      recordType: "Prescription",
      department: "General Medicine",
      date: "2023-05-08",
      doctor: "Dr. Michael Brown",
      status: "Completed",
      fileSize: "0.5 MB",
    },
    {
      id: "REC004",
      patientName: "Michael Chen",
      patientId: "P004",
      recordType: "X-Ray",
      department: "Orthopedics",
      date: "2023-05-05",
      doctor: "Dr. Jessica Martinez",
      status: "Completed",
      fileSize: "3.2 MB",
    },
    {
      id: "REC005",
      patientName: "Olivia Brown",
      patientId: "P005",
      recordType: "Blood Test",
      department: "Hematology",
      date: "2023-05-03",
      doctor: "Dr. Emily Davis",
      status: "Pending Results",
      fileSize: "1.1 MB",
    },
    {
      id: "REC006",
      patientName: "James Johnson",
      patientId: "P006",
      recordType: "ECG",
      department: "Cardiology",
      date: "2023-05-01",
      doctor: "Dr. Sarah Johnson",
      status: "Completed",
      fileSize: "1.8 MB",
    },
  ];

  // Filter records based on active tab
  const filteredRecords = 
    activeTab === "all" 
      ? records 
      : records.filter(record => {
          if (activeTab === "pending") return record.status.includes("Pending");
          if (activeTab === "completed") return record.status === "Completed";
          return true;
        });

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Medical Records</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" /> Upload Records
          </Button>
          <Button className="bg-medical hover:bg-medical-dark">
            <FileText className="mr-2 h-4 w-4" /> New Record
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger 
              value="all" 
              onClick={setActiveTab} 
              isActive={activeTab === "all"}
            >
              All Records
            </TabsTrigger>
            <TabsTrigger 
              value="pending" 
              onClick={setActiveTab} 
              isActive={activeTab === "pending"}
            >
              Pending
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              onClick={setActiveTab} 
              isActive={activeTab === "completed"}
            >
              Completed
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Patient Records</CardTitle>
          <CardDescription>
            Browse and manage all patient medical records in your facility
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and filter bar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search records by patient name, ID, or type..." className="pl-9" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>

          {/* Records list */}
          <div className="overflow-auto rounded-md border">
            <div className="min-w-[800px]">
              {/* Table header */}
              <div className="grid grid-cols-12 border-b bg-muted/50 px-4 py-3 text-sm font-medium">
                <div className="col-span-3">Patient / Record</div>
                <div className="col-span-2">Department</div>
                <div className="col-span-2">Doctor</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>

              {/* Records */}
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="grid grid-cols-12 border-b px-4 py-4 hover:bg-muted/30"
                >
                  <div className="col-span-3">
                    <div className="flex items-start">
                      <div className="mr-3 rounded-md bg-medical/10 p-2 text-medical">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{record.patientName}</p>
                        <p className="text-xs text-muted-foreground">
                          {record.recordType} ({record.fileSize})
                        </p>
                        <p className="text-xs text-muted-foreground">ID: {record.patientId}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center">{record.department}</div>
                  <div className="col-span-2 flex items-center">{record.doctor}</div>
                  <div className="col-span-2 flex items-center">{record.date}</div>

                  <div className="col-span-2 flex items-center">
                    <span
                      className={
                        record.status === "Completed"
                          ? "status-active"
                          : "status-pending"
                      }
                    >
                      {record.status}
                    </span>
                  </div>

                  <div className="col-span-1 flex items-center justify-end">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {filteredRecords.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  No records found matching the current filters
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Records;
