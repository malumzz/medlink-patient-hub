
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { Doctor } from '@/types/api';
import { useToast } from '@/hooks/use-toast';

export const useDoctors = () => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      const response = await apiClient.getDoctors();
      return response.data;
    },
  });
};

export const useDoctor = (id: string) => {
  return useQuery({
    queryKey: ['doctors', id],
    queryFn: async () => {
      const response = await apiClient.getDoctor(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (doctor: Omit<Doctor, 'id'>) => {
      const response = await apiClient.createDoctor(doctor);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
      toast({
        title: "Success",
        description: "Doctor created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create doctor",
        variant: "destructive",
      });
    },
  });
};
