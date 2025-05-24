
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  email: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  contact: string;
  email: string;
  avatar: string;
}

export interface MedicalRecord {
  id: string;
  patientName: string;
  patientId: string;
  recordType: string;
  department: string;
  date: string;
  doctor: string;
  status: 'Completed' | 'Pending Review' | 'Pending Results';
  fileSize: string;
}

export interface DashboardStats {
  totalPatients: number;
  appointments: number;
  medicalRecords: number;
  totalStaff: number;
}

export interface ActivityItem {
  patient: string;
  action: string;
  doctor: string;
  time: string;
}

export interface Appointment {
  patient: string;
  time: string;
  type: string;
  doctor: string;
  status: string;
}

export interface DepartmentWorkload {
  department: string;
  patients: number;
  capacity: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
