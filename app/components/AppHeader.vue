<script setup lang="ts">
import { navigation, profile } from '~/data/portfolio'
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <NuxtLink class="site-logo" to="/" :aria-label="`${profile.name} メインビジュアルへ戻る`">
        <span aria-hidden="true">{{ profile.initials }}</span>
      </NuxtLink>
      <nav aria-label="メインナビゲーション">
        <ul class="nav-list">
          <li v-for="item in navigation" :key="item.href">
            <a :href="item.href">{{ item.label }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
