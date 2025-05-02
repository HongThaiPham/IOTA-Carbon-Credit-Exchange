import { updateQuota } from "@/app/(console)/_actions/quota.action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useUpdateDataWeb2 = (id: string) => {
  return useMutation({
    mutationKey: ["update-data-web2", id],
    mutationFn: async (value: number) => {
      return toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            await updateQuota(id, value);
            resolve(true);
          } catch (error) {
            reject(error);
          }
        }),
        {
          pending: "Updating data...",
          success: "Data updated successfully!",
          error: "Failed to update data",
        }
      );
    },
  });
};

export default useUpdateDataWeb2;
