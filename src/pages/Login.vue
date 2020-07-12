<template>
    <v-container fluid class="lighten-5 bith-bg pa-0" style="height: 100%">
        <v-row class="bith-logo">
            <v-col class="ma-auto"
                   align="center"
                   justify="center"
            >
                <v-img src="../assets/images/BITH.png" width="180"></v-img>
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
                    <v-col class="padding-border" >
                        <v-img src="../assets/images/SignUpWithSocial.png"></v-img>
                    </v-col>
                </v-row>
                <v-row align="center"
                       justify="space-around">
                    <v-col>
                        <v-btn text large class="lineBtn mx-2 my-5">
                        </v-btn>
                        <v-btn text large class="facebookBtn my-5">
                        </v-btn>
                        <v-btn text large class="googleBtn mx-2 my-5">
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row >
                    <v-col align="center"
                           justify="center"
                           class="padding-border"
                    >
                        <v-btn class="block-radius"
                               outlined
                               block
                               x-large
                               color="white"
                               style="font-weight: bolder; font-size: 14px"
                        >
                            register with email
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row >
                    <v-col align="center"
                           justify="center"
                           class="padding-border"
                    >
                        <v-btn class="bith-font block-radius"
                               block
                               color="white"
                               @click="loader = 'loading'"
                               x-large
                               style="font-weight: bolder; font-size: 14px"
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
    .padding-border{
        padding: 0.5rem 3rem;
    }

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
        height: 60%;
    }

    .lineBtn {
        background-image: url('../assets/images/rec_line.png');
        background-size: 100%;
    }
    .facebookBtn {
        background-image: url('../assets/images/rec_fb.png');
        background-size: 100%;
    }
    .googleBtn {
        background-image: url('../assets/images/rec_google.png');
        background-size: 100%;
    }
</style>