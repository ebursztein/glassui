<!--
  Themed diffusion backdrop for glass components.

  Uses multiple radial-gradient layers on a single div for smooth color diffusion.
  No blur filter needed -- radial gradients are mathematically smooth (no banding).

  Colors derive from --comp-bg (set by glass parent) with oklch hue shifts.
  Falls back to theme accent colors when outside a glass context.

  Orb positions shift with --glass-density so nested glass layers
  produce unique patterns instead of overlapping identically.
-->
<div
  class="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none"
  style="
    mix-blend-mode: soft-light;
    background:
      radial-gradient(
        ellipse at calc(25% + var(--glass-density, 0) * 40%) calc(25% + var(--glass-density, 0) * 30%),
        oklch(from var(--comp-bg, var(--glass-accent-1)) l c h / 0.5) 0%,
        transparent 70%
      ),
      radial-gradient(
        ellipse at calc(70% - var(--glass-density, 0) * 35%) calc(20% + var(--glass-density, 0) * 45%),
        oklch(from var(--comp-bg, var(--glass-accent-3)) l c calc(h + 30) / 0.35) 0%,
        transparent 60%
      ),
      radial-gradient(
        ellipse at calc(45% + var(--glass-density, 0) * 20%) calc(70% - var(--glass-density, 0) * 40%),
        oklch(from var(--comp-bg, var(--glass-accent-2)) l c calc(h - 30) / 0.4) 0%,
        transparent 65%
      );
  "
></div>
