import { motion } from "framer-motion";
import { Gradient } from "../types/gradient";

interface GradientCardProps {
    gradient: Gradient;
    onClick: () => void;
    index: number;
}

export function GradientCard({ gradient, onClick, index }: GradientCardProps) {
    // Debug log to check if gradient data is correct
    console.log('Gradient CSS Value:', gradient.cssValue);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="group cursor-pointer"
            onClick={onClick}
        >
            <div className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Gradient Preview */}
                <div
                    className="h-32 w-full border-2 border-gray-200"
                    style={{
                        background: gradient.cssValue,
                        minHeight: '128px',
                        // Fallback background for debugging
                        backgroundColor: gradient.colors[0] || '#000000'
                    }}
                >
                    {/* Debug text to show what gradient should be applied */}
                    <div className="p-2 text-xs text-white bg-black bg-opacity-50 rounded">
                        {gradient.cssValue}
                    </div>
                </div>

                {/* Gradient Info */}
                <div className="p-4 bg-white">
                    <h3 className="mb-2 truncate font-medium text-gray-900">{gradient.name}</h3>
                    <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-2">
                        {gradient.description}
                    </p>

                    {/* Color Dots */}
                    <div className="flex items-center gap-2 mb-3">
                        {gradient.colors.map((color, idx) => (
                            <div
                                key={idx}
                                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>

                    {/* Category Badge */}
                    <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            {gradient.category}
                        </span>
                        <span className="text-gray-500 text-xs">
                            by {gradient.author}
                        </span>
                    </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-xl pointer-events-none" />
            </div>
        </motion.div>
    );
}