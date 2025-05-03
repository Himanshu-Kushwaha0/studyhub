import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, KeyRound, Check } from "lucide-react";

export type ApiServiceType = "together" | "predis" | "openai";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultService?: ApiServiceType;
  error?: string;
}

export function ApiKeyModal({
  isOpen,
  onClose,
  onSuccess,
  defaultService = "together",
  error,
}: ApiKeyModalProps) {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [service, setService] = useState<ApiServiceType>(defaultService);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message: string;
  } | null>(null);

  const serviceOptions = [
    { value: "together", label: "Together AI (Image Generation)" },
    { value: "predis", label: "Predis AI (Video Generation)" },
    { value: "openai", label: "OpenAI (Text Generation)" },
  ];

  const serviceInfo = {
    together: {
      name: "Together AI",
      url: "https://together.ai/documentation",
      description: "Used for image generation with the FluxGenerator model.",
    },
    predis: {
      name: "Predis AI",
      url: "https://predis.ai/docs",
      description: "Used for video generation and editing capabilities.",
    },
    openai: {
      name: "OpenAI",
      url: "https://platform.openai.com/api-keys",
      description: "Used for text generation, code analysis and completion.",
    },
  };

  const selectedService = serviceInfo[service];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setValidationResult({
        valid: false,
        message: "Please enter an API key",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setValidationResult(null);

      // Call the API to update the API key
      const response = await apiRequest(
        "POST",
        "/api/settings/api-key",
        {
          service,
          apiKey,
        }
      );

      if (response.ok) {
        const result = await response.json();
        
        setValidationResult({
          valid: true,
          message: `${selectedService.name} API key validated and saved successfully!`,
        });

        toast({
          title: "API Key Updated",
          description: `Your ${selectedService.name} API key has been successfully saved.`,
        });

        // Clear form state after 1.5 seconds and close the modal
        setTimeout(() => {
          setApiKey("");
          setValidationResult(null);
          onSuccess();
        }, 1500);
      } else {
        const error = await response.json();
        setValidationResult({
          valid: false,
          message: error.message || `Failed to validate ${selectedService.name} API key.`,
        });
      }
    } catch (error) {
      console.error("Error updating API key:", error);
      setValidationResult({
        valid: false,
        message: `An error occurred while trying to update the ${selectedService.name} API key.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <KeyRound className="h-5 w-5" />
            Update API Key
          </DialogTitle>
          <DialogDescription>
            {error ? (
              <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 font-medium">API Error Detected</p>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            ) : (
              <p>Update your API key for the selected service.</p>
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="service">Service</Label>
              <Select
                value={service}
                onValueChange={(value) => setService(value as ApiServiceType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                {selectedService.description}{" "}
                <a
                  href={selectedService.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Get API Key
                </a>
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={`Enter your ${selectedService.name} API key`}
                className="w-full"
              />
            </div>

            {validationResult && (
              <div
                className={`p-3 rounded-md flex items-center ${
                  validationResult.valid
                    ? "bg-green-50 border border-green-100"
                    : "bg-red-50 border border-red-100"
                }`}
              >
                {validationResult.valid ? (
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                )}
                <p
                  className={
                    validationResult.valid ? "text-green-800" : "text-red-800"
                  }
                >
                  {validationResult.message}
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update API Key"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}