<template>
  <v-container>
    <v-layout justify-space-around align-center>
      <v-img class="h-logo" src="../assets/images/BITH.png" max-width="100"></v-img>
      <v-flex>
        <v-text-field
            class="bith-search"
            dense
            solo
            single-line
            clearable
            color="#ffffff"
            append-icon="mdi-magnify"
            background-color="transparent"
            hide-details
            @click:append="alert = !alert"
        ></v-text-field>
      </v-flex>
      <v-btn class="white--text"
             icon
      >
        <message-circle-icon size="1.5x"></message-circle-icon>
      </v-btn>
      <v-btn class="white--text"
             icon
      >
        <bell-icon size="1.5x"></bell-icon>
      </v-btn>
    </v-layout>

    <v-alert
        v-model="alert"
        dismissible
        close-icon="mdi-delete"
        color="cyan"
        border="left"
        elevation="2"
        colored-border
        icon="mdi-twitter"
        style="position: fixed; top: 85px; right: 20px"
    >
      You've got <strong>5</strong> new updates on your timeline!.
    </v-alert>
  </v-container>
</template>

<script>
import {MessageCircleIcon, BellIcon} from 'vue-feather-icons'

export default {
  name: "BithHeader",
  components: {
    MessageCircleIcon,
    BellIcon
  },
  data() {
    return {
      alert: false
    }
  }
}
</script>

<style lang="scss" scoped>
.v-input.bith-search {
  border: 1px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 30px;
  background-color: transparent;
}
</style>

<style lang="scss">
.h-logo {
  width: 15%;
  margin-right: 1rem;
}

.bith-search .v-input__slot {
  box-shadow: none !important;
}

.v-input input {
  color: #FFFFFF !important;
}

.v-input .v-input__icon .v-icon {
  color: #FFFFFF !important;
}
</style>