<template>
    <v-container class="pa-0">
        <v-layout class="category-layout">
            <v-container class="text-left py-0">
            <span>
                Category
            </span>
                <v-btn @click="done()">success</v-btn>
                <v-btn @click="warn()">warn</v-btn>
                <v-btn @click="oops()">fail</v-btn>
                <v-btn @click="loadItem()">load</v-btn>
                <v-btn @click="removeItem()">remove</v-btn>
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
            <v-flex v-for="(card, index) in cards"
                    :key="index"
                    class="pa-1 xs6 md4 lg3">
                <v-card class="bith-card"
                >
                    <v-img
                            class="white--text align-end"
                            width="300px"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    >
                    </v-img>

                    <v-card-text class="text--primary">
                        <p class="text-left">{{ card.name }}</p>
                        <v-layout justify-space-between>
                            <span>{{ card.time }}</span>
                            <span><b>{{ card.price }}</b>THB</span>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout wrap v-if="loadingGrid">
            <v-flex v-for="i in 4"
                    :key="i"
                    class="pa-1 xs6 md4 lg3">
                <v-card class="bith-card animated-background"
                >
                </v-card>
            </v-flex>
        </v-layout>

        <bith-confirm-dialog :type="type"
                             :active="dialog"
                             :content="content"
                             @close="onClose"
                             @accept="onConfirm"
                             persistent
        >
        </bith-confirm-dialog>

    </v-container>
</template>

<script>
    import BithConfirmDialog from "../components/BithConfirmDialog";

    export default {
        name: "Home",
        components: {BithConfirmDialog},
        data() {
            return {
                type: 'success',
                dialog: false,
                content: 'Your current bid is 560.',
                cards: [],
                loadingGrid: false,
            }
        },
        created() {
        },
        methods: {
            loadItem() {
                this.loadingGrid = true;
                setTimeout(() => {
                    for (let i = 1; i <= 4; i++) {
                        this.cards.push({
                            imgSrc: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
                            name: 'Sed ut perspiciatis unde omnis',
                            time: '23:00:' + (this.cards.length + 1),
                            price: '500'
                        })
                    }
                    this.loadingGrid = false;
                }, 3000)
            },
            removeItem() {
                for (let i = 1; i <= 4; i++) {
                    this.cards.splice(0,1)
                }
            },
            onClose(val) {
                this.dialog = val
            },
            onConfirm() {
                this.dialog = false
            },
            done() {
                this.type = 'success'
                this.dialog = true;
                this.content = `Your current bid is 560.`;
            },
            oops() {
                this.type = 'danger'
                this.dialog = true;
                this.content = `560 were outbid by another user.`;
            },
            warn() {
                this.type = 'warn'
                this.dialog = true;
                this.content = `You will <b>CANNOT</b> cancel your bid, must contact vendor directly.`;
            }
        }
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