import {useToast as _useToast} from "@/components/shadcn-ui/use-toast";

interface toastConf {
  message: string;
  title?: string;
  variant?: "destructive" | "default";
}

export const useToast = () => {
  const {toast} = _useToast();

  return (conf: toastConf) => {
    toast({
      variant: conf.variant || "destructive",
      title: conf.title || "Uh Oh! Something went wrong.",
      description: conf.message,
    });
  };
};
