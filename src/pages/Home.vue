<template>
    <v-container class="pa-0">
        <v-layout class="category-layout">
            <v-container class="text-left py-0">
            <span>
                Category
            </span>
            </v-container>
        </v-layout>
        <v-layout class="category-slide"
                  align-center
        >
            <v-card v-for="i in 10"
                    :key="i"
                    class="bith-card"
                    max-width="400"
            >
                <v-img
                        class="white--text align-end"
                        height="200px"
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                >
                </v-img>

                <v-card-text class="text--primary">
                    <v-layout justify-space-between>
                        <span>
                            23:00:01
                        </span>
                        <span>
                            <b>500</b>THB
                        </span>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-layout>

        <v-layout class="category-slide pt-2">
            <div class="category-menu"
                 v-for="i in 15"
                 :key="i"
                 :class="{ 'active' : i === 1 }"
            >
                Category {{ i }}
            </div>
        </v-layout>
        <v-layout wrap>
            <v-flex v-for="i in 10"
                    :key="i"
                    class="pa-1 xs6 md4 lg3">
                <v-card class="bith-card"
                >
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    >
                    </v-img>

                    <v-card-text class="text--primary">
                        <p class="text-left">Sed ut perspiciatis unde omnis</p>
                        <v-layout justify-space-between>
                        <span>
                            23:00:01
                        </span>
                            <span>
                            <b>500</b>THB
                        </span>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {}
        },
    }
</script>

<style lang="scss" scoped>
    .bith-card {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
        border-radius: 6px;
    }

    .category-layout {
        position: absolute;
        left: 0;
        width: 100%;
        background: #40C4B0 64.04%;
        padding-top: 1rem;
        padding-bottom: 4rem;

        span {
            color: #FFFFFF;
            font-size: 20px;
        }
    }
</style>