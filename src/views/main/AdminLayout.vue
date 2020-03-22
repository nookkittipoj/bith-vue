<template>
    <div>
        <v-navigation-drawer app>
            <!-- -->
        </v-navigation-drawer>

        <v-app-bar app>
            <!-- -->
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-content>

            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <v-card
                        class="mx-auto"
                        max-width="400"
                >
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    >
                        <v-card-title>Top 10 Australian beaches</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div>Whitehaven Beach</div>

                        <div>Whitsunday Island, Whitsunday Islands</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                color="orange"
                                text
                        >
                            Share
                        </v-btn>

                        <v-btn
                                color="orange"
                                text
                        >
                            Explore
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <!-- If using vue-router -->
                <router-view></router-view>
            </v-container>
        </v-content>

        <v-footer class="footer" app>
            <!-- -->
            <v-card
                    flat
                    tile
                    class="indigo lighten-1 white--text text-center footer"
            >
                <v-card-text>
                    <v-btn  class="mx-4 white--text"
                            icon
                    >
                        <facebook-icon size="1.5x" class="custom-class"></facebook-icon>
                    </v-btn>
                    <v-btn  class="mx-4 white--text"
                            icon
                    >
                        <twitter-icon size="1.5x" class="custom-class"></twitter-icon>
                    </v-btn>
                    <v-btn  class="mx-4 white--text"
                            icon
                    >
                        <linkedin-icon size="1.5x" class="custom-class"></linkedin-icon>
                    </v-btn>
                    <v-btn  class="mx-4 white--text"
                            icon
                    >
                        <instagram-icon size="1.5x" class="custom-class"></instagram-icon>
                    </v-btn>
                </v-card-text>

                <v-card-text class="white--text pt-0">
                    Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                </v-card-text>

                <v-divider></v-divider>

                <v-card-text class="white--text">
                    {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
                </v-card-text>
            </v-card>
        </v-footer>
    </div>
</template>

<script>
    import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon } from 'vue-feather-icons'

    export default {
        name: "Nook",
        components: {
            FacebookIcon,
            TwitterIcon,
            LinkedinIcon,
            InstagramIcon
        },
        data: () => ({
            icons: [
                'fab fa-facebook',
                'fab fa-twitter',
                'fab fa-google-plus',
                'fab fa-linkedin',
                'fab fa-instagram',
            ],
        })
    }
</script>

<style scoped>

</style>