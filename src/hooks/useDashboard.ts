
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const response = await apiClient.getDashboardStats();
      return response.data;
    },
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ['recentActivity'],
    queryFn: async () => {
      const response = await apiClient.getRecentActivity();
      return response.data;
    },
  });
};

export const useUpcomingAppointments = () => {
  return useQuery({
    queryKey: ['upcomingAppointments'],
    queryFn: async () => {
      const response = await apiClient.getUpcomingAppointments();
      return response.data;
    },
  });
};

export const useDepartmentWorkload = () => {
  return useQuery({
    queryKey: ['departmentWorkload'],
    queryFn: async () => {
      const response = await apiClient.getDepartmentWorkload();
      return response.data;
    },
  });
};
