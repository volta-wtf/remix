import { Gradient } from "../types/gradient";

export interface ExportOptions {
    width?: number;
    height?: number;
    format: 'svg' | 'png' | 'jpg' | 'css';
    quality?: number; // For JPG format
}

export class GradientExporter {
    static async exportGradient(gradient: Gradient, options: ExportOptions): Promise<void> {
        const { width = 800, height = 600, format, quality = 0.9 } = options;

        switch (format) {
            case 'svg':
                return this.exportAsSVG(gradient, width, height);
            case 'png':
                return this.exportAsPNG(gradient, width, height);
            case 'jpg':
                return this.exportAsJPG(gradient, width, height, quality);
            case 'css':
                return this.exportAsCSS(gradient);
            default:
                throw new Error(`Unsupported format: ${format}`);
        }
    }

    private static exportAsSVG(gradient: Gradient, width: number, height: number): void {
        const gradientId = `gradient-${Date.now()}`;
        const stops = gradient.colors.map((color, index) => {
            const offset = (index / (gradient.colors.length - 1)) * 100;
            return `<stop offset="${offset}%" style="stop-color:${color};stop-opacity:1" />`;
        }).join('\n      ');

        const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      ${stops}
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#${gradientId})" />
  <text x="20" y="${height - 20}" font-family="Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.8)">
    ${gradient.name}
  </text>
</svg>`;

        this.downloadFile(svg, `${this.sanitizeFilename(gradient.name)}.svg`, 'image/svg+xml');
    }

    private static async exportAsPNG(gradient: Gradient, width: number, height: number): Promise<void> {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;

        // Create gradient
        const grad = ctx.createLinearGradient(0, 0, width, height);
        gradient.colors.forEach((color, index) => {
            const offset = index / (gradient.colors.length - 1);
            grad.addColorStop(offset, color);
        });

        // Fill canvas
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Add gradient name
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = '16px Arial, sans-serif';
        ctx.fillText(gradient.name, 20, height - 20);

        // Convert to blob and download
        canvas.toBlob((blob) => {
            if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${this.sanitizeFilename(gradient.name)}.png`;
                a.click();
                URL.revokeObjectURL(url);
            }
        }, 'image/png');
    }

    private static async exportAsJPG(gradient: Gradient, width: number, height: number, quality: number): Promise<void> {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;

        // Fill with white background (JPG doesn't support transparency)
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);

        // Create gradient
        const grad = ctx.createLinearGradient(0, 0, width, height);
        gradient.colors.forEach((color, index) => {
            const offset = index / (gradient.colors.length - 1);
            grad.addColorStop(offset, color);
        });

        // Fill canvas
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Add gradient name
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '16px Arial, sans-serif';
        ctx.fillText(gradient.name, 20, height - 20);

        // Convert to blob and download
        canvas.toBlob((blob) => {
            if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${this.sanitizeFilename(gradient.name)}.jpg`;
                a.click();
                URL.revokeObjectURL(url);
            }
        }, 'image/jpeg', quality);
    }

    private static exportAsCSS(gradient: Gradient): void {
        const cssContent = `/* ${gradient.name} */
/* ${gradient.description} */

.${this.sanitizeFilename(gradient.name).toLowerCase().replace(/[^a-z0-9]/g, '-')} {
  background: ${gradient.cssValue};
}

/* Individual properties */
/*
Name: ${gradient.name}
Description: ${gradient.description}
Category: ${gradient.category}
Colors: ${gradient.colors.join(', ')}
Direction: ${gradient.direction}
Author: ${gradient.author}
*/`;

        this.downloadFile(cssContent, `${this.sanitizeFilename(gradient.name)}.css`, 'text/css');
    }

    private static downloadFile(content: string, filename: string, mimeType: string): void {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    private static sanitizeFilename(filename: string): string {
        return filename.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    }

    static getExportPresets() {
        return {
            'Mobile Wallpaper': { width: 1080, height: 1920 },
            'Desktop Wallpaper': { width: 1920, height: 1080 },
            'Social Media Square': { width: 1080, height: 1080 },
            'Social Media Story': { width: 1080, height: 1920 },
            'Web Banner': { width: 1200, height: 400 },
            'Custom': { width: 800, height: 600 }
        };
    }
}
