export const APP_COLORS = {
  'main-white': '#f3f7fb',
  'main-green': '#1f5d2f',
  'main-black': '#1b1716',
  'dark-blue': '#38515b',
  'dark-gray': '#25252a',
  'text-muted': '#666666',
  surface: '#f5f5f5',
  'surface-muted': '#f9f9f9',
  'surface-weak': '#fafafa',
  'border-strong': '#333333',
  'border-muted': '#cccccc',
  paper: '#ffffff',
  ink: '#000000',
  'warning-soft': '#ffeeee',
  'note-mint': '#a8e6cf',
  'note-red': '#ffadad',
  'note-peach': '#ffd3b5',
  'note-pink': '#ff677d',
  'note-violet': '#c7a2ff',
  'selected-temp': '#ffdd77',
} as const;

export type AppColorKey = keyof typeof APP_COLORS;

export const NOTE_COLORS: string[] = [
  APP_COLORS['note-mint'],
  APP_COLORS['note-red'],
  APP_COLORS['note-peach'],
  APP_COLORS['note-pink'],
  APP_COLORS['note-violet'],
];

export const SELECTED_TEMP_COLOR: string = APP_COLORS['selected-temp'];
