import { CSSProperties } from 'react';

export type Section = 'gradients' | 'text-styles' | 'frame-styles';

export interface BaseStyle {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  isCustom?: boolean;
  isModified?: boolean;
}

export interface Gradient extends BaseStyle {
  gradient: string;
  colors: string[];
  inspiration: string;
  usage: string;
}

export interface TextStyle extends BaseStyle {
  previewText: string;
  style: CSSProperties;
  cssClass: string;
}

export interface FrameStyle extends BaseStyle {
  style: CSSProperties;
  cssClass: string;
  material: string;
}
