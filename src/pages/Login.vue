<template>
    <v-container fluid class="lighten-5 bith-bg pa-0" style="height: 100%">
        <v-row class="bith-logo">
            <v-col class="ma-auto"
                   align="center"
                   justify="center"
            >
                <v-img src="../assets/images/BITH.png" width="300"></v-img>
            </v-col>
        </v-row>
        <v-footer class="bith-footer"
                  padless
                  absolute
        >
            <v-col sm="8"
                   md="6"
                   lg="4"
            >
                <v-row>
                    <v-col>
                        <v-img src="../assets/images/SignUpWithSocial.png"></v-img>
                    </v-col>
                </v-row>
                <v-row align="center"
                       justify="space-around">
                    <v-col>
                        <v-btn fab class="mx-3 my-5">
                            <v-img src="../assets/images/line.png" width="56" height="56"></v-img>
                        </v-btn>
                        <v-btn fab class="mx-3 my-5">
                            <v-img src="../assets/images/facebook.png" width="56" height="56"></v-img>
                        </v-btn>
                        <v-btn fab class="mx-3 my-5">
                            <v-img src="../assets/images/google.png" width="56" height="56"></v-img>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col align="center"
                           justify="center"
                    >
                        <v-btn class="block-radius"
                               outlined
                               block
                               color="white"
                        >
                            register with email
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col align="center"
                           justify="center"
                    >
                        <v-btn class="bith-font block-radius"
                               block
                               color="white"
                               @click="loader = 'loading'"
                        >
                            log in
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col align="center"
                           justify="center"
                    >
                        <a class="forget-password"
                           href="#">
                            Forget you password ?
                        </a>
                    </v-col>
                </v-row>
            </v-col>
        </v-footer>
    </v-container>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>
    .block-radius {
        border-radius: 6px;
    }

    .forget-password {
        color: #FFFFFF;
        text-decoration: none;
    }

    .bith-logo {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        width: 100%;
        height: 50%;
    }

    .bith-footer {
        background: unset;
        justify-content: center;
    }
</style>