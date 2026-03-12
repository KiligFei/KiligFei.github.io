<template>
  <div class="plum-root" aria-hidden="true">
    <span class="plum-orb plum-orb-a" />
    <span class="plum-orb plum-orb-b" />
  </div>
</template>

<style scoped>
.plum-root {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.plum-orb {
  position: absolute;
  display: block;
  border-radius: 999px;
  filter: blur(80px);
  transform-origin: center;
  will-change: transform, opacity;
}

.plum-orb-a {
  left: -12%;
  top: -8%;
  width: 32rem;
  height: 32rem;
  opacity: 0.8;
  background: radial-gradient(circle, var(--plum-orb-a), transparent 72%);
  animation: drift-a 18s ease-in-out infinite alternate;
}

.plum-orb-b {
  right: -8%;
  top: 14%;
  width: 26rem;
  height: 26rem;
  opacity: 0.7;
  background: radial-gradient(circle, var(--plum-orb-b), transparent 70%);
  animation: drift-b 20s ease-in-out infinite alternate;
}

@keyframes drift-a {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  100% {
    transform: translate3d(10%, 8%, 0) scale(1.1);
  }
}

@keyframes drift-b {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  100% {
    transform: translate3d(-8%, 10%, 0) scale(1.08);
  }
}

@media (prefers-reduced-motion: reduce) {
  .plum-orb-a,
  .plum-orb-b {
    animation: none;
  }
}

@media (max-width: 767px) {
  .plum-orb-a {
    width: 22rem;
    height: 22rem;
  }

  .plum-orb-b {
    width: 18rem;
    height: 18rem;
  }
}
</style>
