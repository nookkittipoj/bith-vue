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
