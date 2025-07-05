import { Toaster } from "@/components/ui/sonner";
import { GradientGallery } from "./interface/GradientGallery";
import { AuthProvider } from "./contexts/AuthContext";

export default function GradientsPage() {
    return (
        <AuthProvider>
            <GradientGallery />
            <Toaster />
        </AuthProvider>
    );
}
