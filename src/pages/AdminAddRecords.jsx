
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminAddRecords = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    recordType: "",
    department: "",
    doctor: "",
    date: "",
    description: "",
    diagnosis: "",
    treatment: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a new record ID
    const newId = `REC${String(Date.now()).slice(-3).padStart(3, '0')}`;
    
    // Create new record object
    const newRecord = {
      id: newId,
      patientName: formData.patientName,
      patientId: formData.patientId,
      recordType: formData.recordType,
      department: formData.department,
      doctor: formData.doctor,
      date: formData.date,
      description: formData.description,
      diagnosis: formData.diagnosis,
      treatment: formData.treatment,
      status: "Completed"
    };

    // Get existing records from localStorage or use empty array
    const existingRecords = JSON.parse(localStorage.getItem('records') || '[]');
    
    // Add new record
    const updatedRecords = [...existingRecords, newRecord];
    
    // Save to localStorage
    localStorage.setItem('records', JSON.stringify(updatedRecords));
    
    // Navigate back to records page
    navigate('/records');
  };

  const handleCancel = () => {
    navigate('/records');
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
      `}</style>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add New Record</h1>
        <p className="text-gray-600 mt-2">Fill in the details to add a new medical record to the system</p>
      </div>

      <div className="max-w-2xl">
        <div className="rounded-lg border bg-white text-gray-900 shadow-sm">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="patientName">
                    Patient Name *
                  </label>
                  <input
                    id="patientName"
                    name="patientName"
                    type="text"
                    required
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#274D60] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="patientId">
                    Patient ID *
                  </label>
                  <input
                    id="patientId"
                    name="patientId"
                    type="text"
                    required
                    value={formData.patientId}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#274D60] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="ZA001"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="recordType">
                    Record Type *
                  </label>
                  <select
                    id="recordType"
                    name="recordType"
                    required
                    value={formData.recordType}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#274D60] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select Type</option>
                    <option value="Lab Results">Lab Results</option>
                    <option value="X-Ray">X-Ray</option>
                    <option value="MRI Scan">MRI Scan</option>
                    <option value="Prescription">Prescription</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Surgery">Surgery</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="department">
                    Department *
                  </label>
                  <select
                    id="department"
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#274D60] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select Department</option>
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
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="doctor">
                    Doctor *
                  </label>
                  <input
                    id="doctor"
                    name="doctor"
                    type="text"
                    required
                    value={formData.doctor}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#274D60] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Dr. Smith"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="date">
                    Date *
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#274D60] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="description">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#274D60] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Describe the medical record details..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="diagnosis">
                  Diagnosis
                </label>
                <textarea
                  id="diagnosis"
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleInputChange}
                  className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#274D60] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter diagnosis if applicable..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="treatment">
                  Treatment
                </label>
                <textarea
                  id="treatment"
                  name="treatment"
                  value={formData.treatment}
                  onChange={handleInputChange}
                  className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#274D60] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter treatment plan if applicable..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#274D60] text-white hover:bg-[#1A3A4A] h-10 px-4 py-2 flex-1"
                >
                  Add Record
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900 h-10 px-4 py-2 flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddRecords;
