const store = createPinia()

export const setupStore = app => {
  app.use(store)
}

export { store }