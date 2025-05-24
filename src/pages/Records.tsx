
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Share2, Search, Filter, Upload, Loader2 } from "lucide-react";
import { useMedicalRecords } from "@/hooks/useMedicalRecords";

const Records = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { data: records, isLoading, error } = useMedicalRecords();

  // Filter records based on active tab
  const filteredRecords = records ? 
    activeTab === "all" 
      ? records 
      : records.filter(record => {
          if (activeTab === "pending") return record.status.includes("Pending");
          if (activeTab === "completed") return record.status === "Completed";
          return true;
        })
    : [];

  if (error) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-2">Error loading medical records</p>
            <p className="text-muted-foreground">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

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
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search records by patient name, ID, or type..." className="pl-9" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Loading medical records...</span>
            </div>
          )}

          {/* Records list */}
          {!isLoading && (
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

                {filteredRecords.length === 0 && !isLoading && (
                  <div className="py-8 text-center text-muted-foreground">
                    No records found matching the current filters
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Records;
