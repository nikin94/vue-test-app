export default {
  mounted(el, binding) {
    const observer = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting && entry.target.offsetTop > 1000) {
          binding.value()
        }
      },
      {
        rootMargin: '8px',
        threshold: 1.0
      }
    )

    observer.observe(el)
  },
  name: 'intersection'
}
