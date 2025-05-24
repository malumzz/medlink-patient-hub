
import { 
  Patient, 
  Doctor, 
  MedicalRecord, 
  DashboardStats, 
  ActivityItem, 
  Appointment, 
  DepartmentWorkload,
  ApiResponse 
} from '@/types/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers here if needed
        // 'Authorization': `Bearer ${token}`,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Patient endpoints
  async getPatients(): Promise<ApiResponse<Patient[]>> {
    return this.request<ApiResponse<Patient[]>>('/patients');
  }

  async getPatient(id: string): Promise<ApiResponse<Patient>> {
    return this.request<ApiResponse<Patient>>(`/patients/${id}`);
  }

  async createPatient(patient: Omit<Patient, 'id'>): Promise<ApiResponse<Patient>> {
    return this.request<ApiResponse<Patient>>('/patients', {
      method: 'POST',
      body: JSON.stringify(patient),
    });
  }

  async updatePatient(id: string, patient: Partial<Patient>): Promise<ApiResponse<Patient>> {
    return this.request<ApiResponse<Patient>>(`/patients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patient),
    });
  }

  async deletePatient(id: string): Promise<ApiResponse<void>> {
    return this.request<ApiResponse<void>>(`/patients/${id}`, {
      method: 'DELETE',
    });
  }

  // Doctor endpoints
  async getDoctors(): Promise<ApiResponse<Doctor[]>> {
    return this.request<ApiResponse<Doctor[]>>('/doctors');
  }

  async getDoctor(id: string): Promise<ApiResponse<Doctor>> {
    return this.request<ApiResponse<Doctor>>(`/doctors/${id}`);
  }

  async createDoctor(doctor: Omit<Doctor, 'id'>): Promise<ApiResponse<Doctor>> {
    return this.request<ApiResponse<Doctor>>('/doctors', {
      method: 'POST',
      body: JSON.stringify(doctor),
    });
  }

  // Medical Records endpoints
  async getMedicalRecords(): Promise<ApiResponse<MedicalRecord[]>> {
    return this.request<ApiResponse<MedicalRecord[]>>('/records');
  }

  async getMedicalRecord(id: string): Promise<ApiResponse<MedicalRecord>> {
    return this.request<ApiResponse<MedicalRecord>>(`/records/${id}`);
  }

  async createMedicalRecord(record: Omit<MedicalRecord, 'id'>): Promise<ApiResponse<MedicalRecord>> {
    return this.request<ApiResponse<MedicalRecord>>('/records', {
      method: 'POST',
      body: JSON.stringify(record),
    });
  }

  // Dashboard endpoints
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return this.request<ApiResponse<DashboardStats>>('/dashboard/stats');
  }

  async getRecentActivity(): Promise<ApiResponse<ActivityItem[]>> {
    return this.request<ApiResponse<ActivityItem[]>>('/dashboard/activity');
  }

  async getUpcomingAppointments(): Promise<ApiResponse<Appointment[]>> {
    return this.request<ApiResponse<Appointment[]>>('/dashboard/appointments');
  }

  async getDepartmentWorkload(): Promise<ApiResponse<DepartmentWorkload[]>> {
    return this.request<ApiResponse<DepartmentWorkload[]>>('/dashboard/workload');
  }
}

export const apiClient = new ApiClient();
