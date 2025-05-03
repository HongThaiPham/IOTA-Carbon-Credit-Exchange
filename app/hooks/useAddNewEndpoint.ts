import { addNewEndpoint } from "@/app/(console)/_actions/endpoint.action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useAddNewEndpoint = () => {
  return useMutation({
    mutationKey: ["addNewEndpoint"],
    mutationFn: async (payload: {
      url: string;
      apiKey: string;
      accountId: string;
    }) => {
      return toast.promise(
        new Promise(async (resolve, reject) => {
          const { error, data } = await addNewEndpoint(
            payload.url,
            payload.apiKey,
            payload.accountId
          );

          if (error) {
            reject(error.message);
          }
          resolve(data);
        }),
        {
          pending: "Adding new endpoint...",
          success: "New endpoint added successfully",
          error: "Error adding new endpoint",
        }
      );
    },
  });
};

export default useAddNewEndpoint;
