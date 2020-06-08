import Keycloak from 'keycloak-js'

const keycloak = Keycloak({
  url: process.env.VUE_APP_KEYCLOAK_URL,
  realm: process.env.VUE_APP_KEYCLOAK_REALM,
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENTID
})

// This is your plugin object. It can be exported to be used anywhere.
const keycloakPlugin = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install(Vue, options) {
    Vue.prototype.$keycloakPlugin = keycloak
  }
}

export default keycloakPlugin
