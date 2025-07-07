import { Toaster } from "sonner";
import { GradientGallery } from "./partials/GradientGallery";
import { AuthProvider } from "./contexts/AuthContext";

export default function GradientsPage() {
    return (
        <AuthProvider>
            <GradientGallery />
            <Toaster />
        </AuthProvider>
    );
}
