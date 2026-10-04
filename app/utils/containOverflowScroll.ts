/** Keep navigation gestures inside a list only when it actually overflows. */
export function containOverflowScroll(event: Event) {
  const element = event.currentTarget
  if (!(element instanceof HTMLElement)) return
  if (event instanceof KeyboardEvent && !['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) return
  const overflowY = window.getComputedStyle(element).overflowY
  if (['auto', 'scroll'].includes(overflowY) && element.scrollHeight > element.clientHeight + 2) {
    event.stopPropagation()
  }
}
