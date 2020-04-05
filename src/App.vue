<template>
    <v-app id="app">
        <router-view v-if="noTemplate"></router-view>
        <div v-else>
            <v-app-bar app>
                <BithHeader></BithHeader>
            </v-app-bar>

            <!-- Sizes your content based upon application components -->
            <v-content>

                <!-- Provides the application the proper gutter -->
                <v-container fluid class="py-0">
                    <!-- If using vue-router -->
                    <router-view></router-view>
                </v-container>
            </v-content>

            <v-footer app>
                <!-- -->
            </v-footer>
        </div>
    </v-app>
</template>

<script>
    import BithHeader from "./components/BithHeader";

    export default {
        name: "App",
        components: {
            BithHeader
        },
        data() {
            return {
                noTemplate: false
            }
        },
        created() {
            if(this.$route.name === 'Login') {
                this.noTemplate = true
            }
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .v-app-bar {
        background: #40C4B0 64.04% !important;
        box-shadow: none !important;
        .v-toolbar__content {
            padding: 0;
        }
    }
</style>
