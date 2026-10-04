<script setup lang="ts">
import { portfolioUi } from '~/data/portfolio'

const props = defineProps<{ open: boolean; title: string }>()
const emit = defineEmits<{ close: [] }>()
const dialog = ref<HTMLDialogElement | null>(null)
const titleId = `detail-${useId()}`
const { language } = usePortfolioLanguage()
const ui = computed(() => portfolioUi[language.value])

function syncDialog() {
  if (props.open && !dialog.value?.open) dialog.value?.showModal()
  else if (!props.open && dialog.value?.open) dialog.value.close()
}
watch(() => props.open, syncDialog, { flush: 'post' })
onMounted(syncDialog)
</script>

<template>
  <Teleport to="body">
    <dialog ref="dialog" class="portfolio-theme project-dialog detail-dialog" :hidden="!open" :aria-labelledby="titleId" @close="emit('close')">
      <template v-if="open">
        <button type="button" class="modal-close" :aria-label="ui.closeModal" autofocus @click="dialog?.close()">×</button>
        <h3 :id="titleId">{{ title }}</h3>
        <div class="detail-dialog-content"><slot /></div>
      </template>
    </dialog>
  </Teleport>
</template>
