
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { MedicalRecord } from '@/types/api';
import { useToast } from '@/hooks/use-toast';

export const useMedicalRecords = () => {
  return useQuery({
    queryKey: ['medicalRecords'],
    queryFn: async () => {
      const response = await apiClient.getMedicalRecords();
      return response.data;
    },
  });
};

export const useMedicalRecord = (id: string) => {
  return useQuery({
    queryKey: ['medicalRecords', id],
    queryFn: async () => {
      const response = await apiClient.getMedicalRecord(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateMedicalRecord = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (record: Omit<MedicalRecord, 'id'>) => {
      const response = await apiClient.createMedicalRecord(record);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicalRecords'] });
      toast({
        title: "Success",
        description: "Medical record created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create medical record",
        variant: "destructive",
      });
    },
  });
};
