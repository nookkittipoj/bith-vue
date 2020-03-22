<template>
    <v-container fluid class="lighten-5 bith-bg" style="height: 100%">
        <v-col>

        </v-col>
        <v-row class="bith-logo">
            <v-col align="center"
                   justify="center"
                   md="6"
                   offset-md="3"
            >
                <v-img src="../assets/images/BITH.png" width="300"></v-img>
            </v-col>
        </v-row>
        <v-footer class="pb-5 offset-md-3 col-md-6"
                  style="background-color: unset"
                  padless
                  absolute
        >
            <v-col>
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

    .login-area {
        bottom: 45%;
    }

    .bith-logo {
        margin-top: 0%;
    }

    @media (max-width: 600px)
     .bith-logo {
         margin-top: 45%;
     }
</style>