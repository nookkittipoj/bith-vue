<template>
    <div class="text-center dialog">
        <v-dialog
                v-model="active"
                width="305"
                :persistent="persistent"
                v-on:click:outside="updateValue(active)"
                v-on:input="updateValue(active)"
                style="box-shadow: none!important;"
        >
            <v-img
                    aspect-ratio="4:3"
                    class="white--text align-center dialog-icon"
                    width="65"
                    height="65"
                    max-width="65"
                    max-height="65"
                    :src="icon[type]"
            >
            </v-img>
            <v-card style="min-height: 220px">
                <v-card-title
                        class="dialog-status"
                        :class="{ 'warn' : type === 'warn', 'done' : type === 'success', 'oops' : type === 'danger'}"
                >
                    {{ typeTest[type] }}
                </v-card-title>

                <v-card-text v-html="content">

                </v-card-text>

                <v-card-actions class="dialog-actions">
                    <v-btn
                            class="diss-miss"
                            @click="onClose"
                    >
                        DISSMISS
                    </v-btn>
                    <v-btn
                            class="accept"
                            @click="onAccept"
                    >
                        ACCEPT
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    export default {
        name: "BithConfirmDialog",
        props: {
            active: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                required: true
            },
            content: {
                type: String,
                default: ''
            },
            onConfirm: Function,
            persistent: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                dialog: false,
                typeTest: {
                    'warn': 'Warning!',
                    'success': 'Done!',
                    'danger': 'Oops!',
                },
                icon: {
                    'warn': require('../../src/assets/images/dialog/warn.png'),
                    'success': require('../../src/assets/images/dialog/success.png'),
                    'danger': require('../../src/assets/images/dialog/oops.png'),
                }
            }
        },
        methods: {
            updateValue: function (value) {
                if (this.persistent === false && value) {
                    value = false
                }
                this.$emit('close', value)
            },
            onClose() {
                this.$emit('close', false);
            },
            onAccept() {
                this.$emit('accept', false);
            }
        }
    }
</script>

<style lang="scss">
    .v-dialog {
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
    }

    .dialog-icon {
        position: relative;
        left: calc(50% - 30px);
        top: 30px;
        z-index: 1;
    }

    .dialog-actions {
        justify-content: space-evenly;
        bottom: 0;
        position: absolute;
        width: 100%;
        padding: 16px 20px !important;

        .diss-miss {
            width: 120px;
            color: #40C4B0;
            font-weight: 900;
            font-size: 13px;
            line-height: 15px;
            background: #FFFFFF !important;
            border: 2px solid #40C4B0;
            border-radius: 6px;
        }

        .accept {
            width: 120px;
            color: #FFFFFF;
            font-weight: 900;
            font-size: 13px;
            line-height: 15px;
            background: #40C4B0 !important;
            border-radius: 6px;
        }
    }

    .dialog-status {
        font-size: 18px !important;
        font-weight: bold !important;
        font-style: normal !important;
        justify-content: center !important;
        padding-top: 45px !important;

        &.done {
            color: #137948;
        }

        &.oops {
            color: #BC2A2A;
        }

        &.warn {
            color: #f8c307;
        }
    }
</style>