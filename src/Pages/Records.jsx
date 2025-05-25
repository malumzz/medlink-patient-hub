
import React, { useState } from "react";
import { Button } from "../Component/ui/button";
import { Input } from "../Component/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Component/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Component/ui/tabs";
import { FileText, Download, Share2, Search, Filter, Upload } from "lucide-react";

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
    <div className="animate-fade-in p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Medical Records</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" /> Upload Records
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="mr-2 h-4 w-4" /> New Record
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Records</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
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
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search records by patient name, ID, or type..." className="pl-9" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>

          {/* Records list */}
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="rounded-md bg-blue-100 p-2 text-blue-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{record.patientName}</p>
                    <p className="text-sm text-gray-600">
                      {record.recordType} - {record.department}
                    </p>
                    <p className="text-xs text-gray-500">
                      {record.doctor} • {record.date} • {record.fileSize}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      record.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {record.status}
                  </span>
                  
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Records;
