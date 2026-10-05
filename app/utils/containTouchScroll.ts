/** Allow overflowing content to scroll without dragging the page at its edges. */
export function containTouchScroll(event: TouchEvent, previousY: number) {
  if (event.touches.length !== 1) return
  const touch = event.touches[0]
  if (!touch) return
  const delta = previousY - touch.clientY
  let element = event.target instanceof Element ? event.target : null

  while (element && element !== document.body) {
    if (element instanceof HTMLElement) {
      const overflow = getComputedStyle(element).overflowY
      const canScroll = delta > 0
        ? element.scrollTop + element.clientHeight < element.scrollHeight - 2
        : element.scrollTop > 2
      if (['auto', 'scroll'].includes(overflow)
        && element.scrollHeight > element.clientHeight + 2
        && canScroll) return
    }
    element = element.parentElement
  }

  if (event.cancelable) event.preventDefault()
}
