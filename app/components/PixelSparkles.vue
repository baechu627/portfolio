<script setup lang="ts">
interface Sparkle {
  x: string
  y: string
  kind: 'rays' | 'ring' | 'diamond'
  desktopOnly?: boolean
}

const companionPatterns = [
  [{ x: '-16px', y: '-12px', kind: 'diamond' }, { x: '20px', y: '12px', kind: 'rays' }],
  [{ x: '4px', y: '-20px', kind: 'ring' }, { x: '-12px', y: '16px', kind: 'diamond' }],
  [{ x: '-20px', y: '4px', kind: 'rays' }, { x: '16px', y: '-8px', kind: 'ring' }],
  [{ x: '20px', y: '4px', kind: 'diamond' }, { x: '4px', y: '20px', kind: 'ring' }],
  [{ x: '-12px', y: '-20px', kind: 'ring' }, { x: '-20px', y: '12px', kind: 'rays' }],
]

const sparkles: Sparkle[] = [
  // Each timing group spans both sides and the upper, middle, and lower areas.
  { x: '18%', y: '18%', kind: 'rays' },
  { x: '32%', y: '14%', kind: 'ring' },
  { x: '8%', y: '26%', kind: 'diamond' },
  { x: '82%', y: '18%', kind: 'ring' },
  { x: '68%', y: '14%', kind: 'diamond' },
  { x: '92%', y: '26%', kind: 'rays' },
  { x: '10%', y: '48%', kind: 'diamond' },
  { x: '16%', y: '60%', kind: 'rays' },
  { x: '22%', y: '38%', kind: 'ring' },
  { x: '90%', y: '48%', kind: 'rays' },
  { x: '84%', y: '60%', kind: 'ring' },
  { x: '78%', y: '38%', kind: 'diamond' },
  { x: '24%', y: '82%', kind: 'ring' },
  { x: '10%', y: '76%', kind: 'diamond' },
  { x: '36%', y: '88%', kind: 'rays' },
  { x: '76%', y: '82%', kind: 'diamond' },
  { x: '90%', y: '76%', kind: 'rays' },
  { x: '64%', y: '88%', kind: 'ring' },
  { x: '36%', y: '8%', kind: 'diamond', desktopOnly: true },
  { x: '5%', y: '34%', kind: 'rays', desktopOnly: true },
  { x: '5%', y: '88%', kind: 'ring', desktopOnly: true },
  { x: '64%', y: '8%', kind: 'diamond', desktopOnly: true },
  { x: '95%', y: '34%', kind: 'rays', desktopOnly: true },
  { x: '95%', y: '88%', kind: 'ring', desktopOnly: true },
]

const smallSparkles: Sparkle[] = [
  { x: '12%', y: '12%', kind: 'diamond' },
  { x: '43%', y: '18%', kind: 'rays' },
  { x: '74%', y: '10%', kind: 'ring' },
  { x: '88%', y: '34%', kind: 'diamond' },
  { x: '6%', y: '40%', kind: 'ring' },
  { x: '26%', y: '28%', kind: 'rays' },
  { x: '94%', y: '58%', kind: 'rays' },
  { x: '7%', y: '68%', kind: 'diamond' },
  { x: '20%', y: '90%', kind: 'ring' },
  { x: '48%', y: '84%', kind: 'diamond' },
  { x: '82%', y: '92%', kind: 'rays' },
  { x: '72%', y: '72%', kind: 'ring' },
  { x: '30%', y: '64%', kind: 'ring', desktopOnly: true },
  { x: '70%', y: '64%', kind: 'diamond', desktopOnly: true },
  { x: '38%', y: '76%', kind: 'rays', desktopOnly: true },
  { x: '62%', y: '76%', kind: 'ring', desktopOnly: true },
  { x: '4%', y: '20%', kind: 'diamond', desktopOnly: true },
  { x: '96%', y: '20%', kind: 'rays', desktopOnly: true },
]
</script>

<template>
  <div class="landing-sparkles" aria-hidden="true">
    <span
      v-for="(sparkle, index) in sparkles"
      :key="index"
      class="landing-sparkle"
      :class="[`sparkle-${sparkle.kind}`, { 'sparkle-desktop-only': sparkle.desktopOnly }]"
      :style="{ left: sparkle.x, top: sparkle.y, '--delay': `${-(index % 3) * 3}s` }"
    >
      <span
        v-for="(companion, companionIndex) in (sparkle.desktopOnly ? [] : companionPatterns[index % companionPatterns.length])"
        :key="companionIndex"
        class="sparkle-companion"
        :class="`sparkle-${companion.kind}`"
        :style="{ left: companion.x, top: companion.y }"
      />
    </span>
    <span
      v-for="(sparkle, index) in smallSparkles"
      :key="`small-${index}`"
      class="landing-sparkle sparkle-small"
      :class="[`sparkle-${sparkle.kind}`, { 'sparkle-desktop-only': sparkle.desktopOnly }]"
      :style="{ left: sparkle.x, top: sparkle.y, '--delay': `${-(index % 4) * 1.5}s` }"
    />
  </div>
</template>
