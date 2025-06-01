import React, { useState, useEffect } from "react";
import { FileText, Download, Share2, Search, Filter, Upload, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Button = ({ className = "", variant = "default", size = "default", children, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-[#274D60] text-white hover:bg-[#1A3A4A]",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#274D60] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Card = ({ className = "", children, ...props }) => (
  <div className={`rounded-lg border bg-white text-gray-900 shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className = "", children, ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ className = "", children, ...props }) => (
  <p className={`text-sm text-gray-500 ${className}`} {...props}>
    {children}
  </p>
);

const Tabs = ({ value, onValueChange, children, className = "" }) => (
  <div className={className}>
    {React.Children.map(children, child =>
      React.cloneElement(child, { value, onValueChange })
    )}
  </div>
);

const TabsList = ({ className = "", children, value, onValueChange }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className}`}>
    {React.Children.map(children, child =>
      React.cloneElement(child, {
        activeValue: value,
        onValueChange,
      })
    )}
  </div>
);

const TabsTrigger = ({ value: triggerValue, onValueChange, activeValue, className = "", children }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      activeValue === triggerValue ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
    } ${className}`}
    onClick={() => onValueChange(triggerValue)}
  >
    {children}
  </button>
);

const Records = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [editingRecord, setEditingRecord] = useState(null);
  const [deletingRecord, setDeletingRecord] = useState(null);

  const initialRecords = [
    {
      id: "REC001",
      patientName: "Sipho Dlamini",
      patientId: "P001",
      recordType: "Lab Results",
      department: "Cardiology",
      date: "2023-05-15",
      doctor: "Dr. Thandiwe Nkosi",
      status: "Completed",
    },
    {
      id: "REC002",
      patientName: "Naledi Mokoena",
      patientId: "P002",
      recordType: "MRI Scan",
      department: "Neurology",
      date: "2023-05-10",
      doctor: "Dr. Kagiso Mthembu",
      status: "Pending Review",
    },
    {
      id: "REC003",
      patientName: "Lebo Mashaba",
      patientId: "P003",
      recordType: "Prescription",
      department: "General Medicine",
      date: "2023-05-08",
      doctor: "Dr. Zanele Khumalo",
      status: "Completed",
    },
    {
      id: "REC004",
      patientName: "Ayanda Ndlovu",
      patientId: "P004",
      recordType: "X-Ray",
      department: "Orthopedics",
      date: "2023-05-05",
      doctor: "Dr. Sibusiso Maseko",
      status: "Completed",
    },
  ];

  const [records, setRecords] = useState([]);

  // Load records from localStorage on component mount
  useEffect(() => {
    const savedRecords = localStorage.getItem('records');
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    } else {
      // If no saved records, use initial data and save it
      setRecords(initialRecords);
      localStorage.setItem('records', JSON.stringify(initialRecords));
    }
  }, []);

  const filteredRecords = records.filter(record => {
    if (activeTab === "pending" && !record.status.toLowerCase().startsWith("pending")) return false;
    if (activeTab === "completed" && record.status !== "Completed") return false;

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      return (
        record.patientName.toLowerCase().includes(q) ||
        record.patientId.toLowerCase().includes(q) ||
        record.recordType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleNewRecord = () => {
    navigate('/records/add');
  };

  const handleEditRecord = (record) => {
    setEditingRecord(record);
  };

  const handleUpdateRecord = (updatedRecord) => {
    const updatedRecords = records.map(record => 
      record.id === updatedRecord.id ? updatedRecord : record
    );
    setRecords(updatedRecords);
    localStorage.setItem('records', JSON.stringify(updatedRecords));
    setEditingRecord(null);
    toast({
      title: "Record Updated",
      description: "The record has been successfully updated.",
    });
  };

  const handleDeleteRecord = (record) => {
    setDeletingRecord(record);
  };

  const confirmDeleteRecord = () => {
    const updatedRecords = records.filter(record => record.id !== deletingRecord.id);
    setRecords(updatedRecords);
    localStorage.setItem('records', JSON.stringify(updatedRecords));
    setDeletingRecord(null);
    toast({
      title: "Record Deleted",
      description: "The record has been successfully deleted.",
    });
  };

  return (
    <div className="animate-fade-in">
      <style jsx>{`
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .status-active {
          display: inline-flex;
          align-items: center;
          border-radius: 9999px;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
          background-color: #dcfce7;
          color: #166534;
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
      `}</style>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Medical Records</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" /> Upload Records
          </Button>
          <Button onClick={handleNewRecord}>
            <FileText className="mr-2 h-4 w-4" /> New Record
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList value={activeTab} onValueChange={setActiveTab}>
            <TabsTrigger value="all">All Records</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {editingRecord && (
        <EditRecordModal 
          record={editingRecord} 
          onUpdate={handleUpdateRecord}
          onCancel={() => setEditingRecord(null)}
        />
      )}

      <AlertDialog open={!!deletingRecord} onOpenChange={() => setDeletingRecord(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the {deletingRecord?.recordType} record for {deletingRecord?.patientName}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteRecord} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Patient Records</CardTitle>
          <CardDescription>Browse and manage all patient medical records in your facility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search records by patient name, ID, or type..."
                className="pl-9"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>

          <div className="overflow-auto rounded-md border">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-12 border-b bg-gray-50 px-4 py-3 text-sm font-medium">
                <div className="col-span-3">Patient / Record</div>
                <div className="col-span-2">Department</div>
                <div className="col-span-2">Doctor</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>

              {filteredRecords.map((record) => (
                <div key={record.id} className="grid grid-cols-12 border-b px-4 py-4 hover:bg-gray-50">
                  <div className="col-span-3">
                    <div className="flex items-start">
                      <div className="mr-3 rounded-md bg-[#274D60]/10 p-2 text-[#274D60]">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{record.patientName}</p>
                        <p className="text-xs text-gray-500">{record.recordType}</p>
                        <p className="text-xs text-gray-500">ID: {record.patientId}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">{record.department}</div>
                  <div className="col-span-2 flex items-center">{record.doctor}</div>
                  <div className="col-span-2 flex items-center">{record.date}</div>
                  <div className="col-span-2 flex items-center">
                    <span className={record.status === "Completed" ? "status-active" : "status-pending"}>
                      {record.status}
                    </span>
                  </div>
                  <div className="col-span-1 flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEditRecord(record)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteRecord(record)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
                <div className="py-8 text-center text-gray-500">
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

const EditRecordModal = ({ record, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState(record);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Record</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Patient Name</label>
              <Input
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Patient ID</label>
              <Input
                name="patientId"
                value={formData.patientId}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Record Type</label>
              <select
                name="recordType"
                value={formData.recordType}
                onChange={handleInputChange}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#274D60]"
                required
              >
                <option value="Lab Results">Lab Results</option>
                <option value="X-Ray">X-Ray</option>
                <option value="MRI Scan">MRI Scan</option>
                <option value="Prescription">Prescription</option>
                <option value="Consultation">Consultation</option>
                <option value="Surgery">Surgery</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#274D60]"
                required
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="General Medicine">General Medicine</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Doctor</label>
              <Input
                name="doctor"
                value={formData.doctor}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#274D60]"
              required
            >
              <option value="Completed">Completed</option>
              <option value="Pending Review">Pending Review</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              Update Record
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Records;
