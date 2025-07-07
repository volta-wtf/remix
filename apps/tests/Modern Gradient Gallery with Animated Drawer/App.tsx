import { Toaster } from "./components/ui/sonner";
import { GradientGallery } from "./components/GradientGallery";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <GradientGallery />
      <Toaster />
    </AuthProvider>
  );
}