export const adminSignatureConfig = {
  rotationSpeed: {
    min: 2000,
    max: 12000,
    step: 500,
  },
  circleScale: {
    min: 1,
    max: 2.5,
    step: 0.05,
  },
  glowIntensity: {
    min: 0,
    max: 100,
    step: 5,
  },
  animationSpeed: {
    min: 0.5,
    max: 2,
    step: 0.1,
  },
  scrollSensitivity: {
    min: 0.5,
    max: 2,
    step: 0.1,
  },
} as const;

export const mobileBehaviorOptions = [
  { value: "stack", label: "Stacked layout" },
  { value: "compact", label: "Compact carousel" },
] as const;
