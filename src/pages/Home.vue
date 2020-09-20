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
      <v-card v-for="(category, i) in categories"
              :key="i"
              class="bith-card"
              max-width="400"
      >
        <v-img
            class="white--text align-end"
            height="200px"
            width="400px"
            :src="category.imgSrc"
            aspect-ratio="2"
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
      <v-flex v-for="(product, index) in products"
              :key="index"
              class="pa-1 xs6 md4 lg3">
        <v-hover v-slot:default="{ hover }">
          <v-card class="bith-card"
          >
            <v-img
                class="white--text align-end"
                width="300px"
                height="200px"
                :src="product.image_cover"
                aspect-ratio="2"
                contain
            >
            </v-img>
            <v-expand-transition>
              <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out darken-2 v-card--reveal display-1"
                  style="height: 100%; background-color:#B5F0E8; color: #309C8F;"
                  @click="viewDetail(product)"
              >
                See more
              </div>
            </v-expand-transition>
            <v-card-text class="text--primary">
              <p class="text-left">{{ product.name }}</p>
              <v-layout justify-space-between>
                <span>{{ product.time_end | countdown }}</span>
                <span><b>{{ product.current_bid | rateToString}}</b>THB</span>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-hover>
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
import {countdown, rateToString} from "@/utils/helper";

export default {
  name: "Home",
  components: {BithConfirmDialog},
  data() {
    return {
      type: 'success',
      dialog: false,
      content: 'Your current bid is 560.',
      categories: [
        {
          imgSrc: require('../assets/demo/image 14.png')
        },
        {
          imgSrc: require('../assets/demo/image 21.png')
        },
        {
          imgSrc: require('../assets/demo/camera.png')
        }
      ],
      products: [
        {
          name: `Genesis Studio Pokemon Lugia Diorama GK Resin Statue`,
          description: `Invoice for remaining payment will be sent 2-3 weeks before product is available for shipping.

            Invoice for shipping will follow once item arrives at my shipping warehouse.

            DISCLAIMER: RESINS ARE VERY FRAGILE IN NATURE AND ALTHOUGH ALL PRODUCTS ARE PACKED VERY WELL THERE MIGHT BE TIMES RESINS ARRIVE WITH CLEAN SNAPS OR SCRATCHES ON PAINT. NO COMPENSATION WILL BE GIVEN FOR THESE FAULTS AS THEY CAN BE GLUED AND WE CAN’T GUARANTEE PERFECTION IN EVERY SINGLE PRODUCT. DO NOT BUY IF YOU ARE NOT WILLING TO ACCEPT THIS. REPLACEMENTS WILL ONLY BE GIVEN DEPENDING ON COMPANIES POLICY. SOME COMPANIES DO PROVIDE REPLACEMENT BUT SOME DON’T.

            Product may arrive with minor differences from original prototype`,
          image_cover: require(`../assets/demo/dummy1.jpg`),
          image_thumbnail: [
            require(`../assets/demo/dummy1.jpg`),
            require(`../assets/demo/dummy2.jpg`),
            require(`../assets/demo/dummy3.jpg`),
            require(`../assets/demo/dummy4.jpg`),
            require(`../assets/demo/dummy5.jpg`),
            require(`../assets/demo/dummy6.jpg`),
            require(`../assets/demo/dummy7.jpg`)
          ],
          time_end: this.$moment('2020-12-31 23:59:59'),
          current_bid: 12500,
          buyout_price: 20830,
          bid_minimum: 500,
          seller: {
            avatar: `data:image/png;base64,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`,
            name: `Genesis Studio`,
            rating: 4.5,
          },
          bidding_histories:[
            {
              avatar: require('../assets/demo/Ellipse.png'),
              name: 'Clem Onojeghuo',
              amount: '550',
              time: '22:40:00'
            },
            {
              avatar: require('../assets/demo/Ellipse (1).png'),
              name: 'Jon Tyson',
              amount: '520',
              time: '22:07:01'
            },
            {
              avatar: require('../assets/demo/Ellipse (2).png'),
              name: 'Simon Zhu',
              amount: '500',
              time: '21:55:56'
            }
          ]
        },
        {
          name: `Sed ut perspiciatis`,
          description: `Invoice for remaining payment will be sent 2-3 weeks before product is available for shipping.

            Invoice for shipping will follow once item arrives at my shipping warehouse.

            DISCLAIMER: RESINS ARE VERY FRAGILE IN NATURE AND ALTHOUGH ALL PRODUCTS ARE PACKED VERY WELL THERE MIGHT BE TIMES RESINS ARRIVE WITH CLEAN SNAPS OR SCRATCHES ON PAINT. NO COMPENSATION WILL BE GIVEN FOR THESE FAULTS AS THEY CAN BE GLUED AND WE CAN’T GUARANTEE PERFECTION IN EVERY SINGLE PRODUCT. DO NOT BUY IF YOU ARE NOT WILLING TO ACCEPT THIS. REPLACEMENTS WILL ONLY BE GIVEN DEPENDING ON COMPANIES POLICY. SOME COMPANIES DO PROVIDE REPLACEMENT BUT SOME DON’T.

            Product may arrive with minor differences from original prototype`,
          image_cover: require('../assets/demo/image 17.png'),
          image_thumbnail: [
            require('../assets/demo/image 17.png')
          ],
          time_end: this.$moment('2020-12-31 23:59:59'),
          current_bid: 1500,
          buyout_price: 5500,
          bid_minimum: 500,
          seller: {
            avatar: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABJlBMVEX////hAAH//f/cAAD6//////v/+////fv/+P/4//z///bnAAD0//7UAADNICLx///4//j70c7IAADw//m/AAD/9vTTVFH/9ez/+vL/7+v/6eT66N29OTr//+76xMD5//T/8///3dnWMzXDNjvqsa/fm5P/5eezAADwra3gXVnSXWH/9+TcGxnafYHme3Torrb+08Xsyb/909zei4i0PkHVPUTrg4D23dDekZW1KCPikYK8HhTrua7eTFTpxcrEWVvi//7GQTTwj5rPcGq4ACPhrJvdcnnXqaHoopH/58/sc3bSjIPWbWH0w67kfY6qFCPl2NG2QTazSVHSmaG4X1zVP1jBJD7EZ3DQm4n+spTn6+PQurm6hYOYAACTJSq6Wkz//9+pT1Y1vD4YAAAQdklEQVR4nO2bB3fbSJaFC4UKiARYABjNHEWJypSo7Bzk2Gl6ZnZndvf//4m9BVJur+2xSbvbcs/Wd3yUmHDxXr13XwEmxGAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDP8v4ZxQSvFdCBK4/LYP5w+AS3wRDnUDRh0hb/tw/hgYCyLikChiiOO/HxAnhOSeFIL9e2YpFTz2PF5peNxBHG/7cP4AqJNV+j/+5S+TvVbMCLvtw/kDCHj26+uDwenZ6D6/y9prvFIXYM4ll1KnOdcF+RtA8ygwkP/KPk8if3oiPK/RGD/cT9ZS+O77xx4n31Ah1ecWp1ZK/nncv79J0C2I6+385LE1j5LSvJeiCqNEfZsM17HDh8qlws/DM4feDVBO29z7DxmscZQ6T7ycmDqOI76RQpeQmzxd9RWy7VCGQ2R3pbOGwuUnUIG0oVSIb5Oj+hNJkLQq1U5xVTqZE/CGF7siEHTlLNWrAbJwRrRHiFtJsvjpG0Bp0Nrsb4Urk+4EUfP0+V6FC4etsQ6hkDq754ODg0G/OJQr58xXQyn3BqltLbj5/jFsy9YPh80gSy0rvQ9XE7AVfCnDGicELmg4PwxD/R62ejjZyXTi/j6piuIV6OWG6kA/OHP692L6CV3vKsy/qCJp2n46e/1G0s/HgRLXhUJGeXmQhpafvxO+2mG36SauPiL59e5dkIjq6kDaNAreP2seI0eL4Hxeoe/jmYUhObcLxcpwqA/ts0FAoRY6WNUHSksLt7oPCyq0w9BXp9WMu79HVwzwj4qIsYjqH957lDNS+mRyvoffc8iTdFxpZWiNKywmqasmY9WJzs7CtNmplWt7gxLk2vakGidUfP2KhEK3ul/sSJSvgDrvKySk5K+k0M9D7U+IeDI6ZgmP3RVajOtSyiJWeaEsX02HmCdRcRxSaV4gkIfDOBG/g0JkKWqJ9Xoo85L9vkK6usJQx2FA5MGZt3ybz3pL1yUsSuQYMUv7+DWIooDQKEoq90e9YRbjBHx950dR9x6l/sOhnug+GOjWUGijUtiqybyNAoEloWRhwT4J3CdLvGHXtsN+KxDxwo3eZYI6l1Uuaf6Ur0XHbXy2dVhrYS7n770fy7M0XEkiqoNvj4bM6xYIXfW4sPCD8jz1w19RViQ6DEqe25aYu5gMgjyrlmcpy/Ln6y9uVs3KWc7N2yxinWWLJ1MtC21IOrquoFwxZ1ivNxLmEHh6+e5SzBVaqym0tcKSQzfTAiNx/uoV1hBlQeUi9Av79K4r9KH+9hq9QomAj+OV4vyqd+dqUNMDNiGtB91793qz3r1Z6XlRMEgQIuPOzuPSbDItYvASmRdFbv3pz7+UDoqU4zM640f9Mmp2q9F8cNibnGdkmWCcMV5arZT6li6Ac0KOrRMivBVjqP1abcu2Jg7KOQ0Wc9pigiKw33ml5ZunqbYCaEVzr4VEbpRsZdlY+L6vRmPUNBrEjZdd/ZfQsq86XiS5GwzvhHp5q+3NmMq5sgvViGabzxVeGqpek1C5pkKkqeWn+0S3w7UUkuPQx5lBLGC5WfDbSuF6ITLm1u8pW3csiFQPNmEPyjMfpkKl8Fq+NSrG8D7eqcoXik63s2OGSahcyjt0GKpfM6fyNLQKtYRUHo3wNgiGSt8sEnothfjYexl1t6Fw9fqAzDxWvt1nOlpOm/Bhp/6WWpUFXnWCMzAbNHcOzmxfXXsRyWaWPasPa89eXoUW/iIYqrFvFx7v7PdLOP5CjTPeVP7WoNkvpS+qgvFHqV2oc1IuhfbkfO9InTXJ+gqxCsMBJ5UZFLJVFfJlDPvaTbGAsuphIU1VTiEdTWngjZUdHlWxJpN6CYKKAUN47Aki7nrDXmh1MxHUeqHd6xARBJU5MnrbY2wc2hfcpW04XCTGOPRPNiUpp1a6L+/S/f23B7BeDNNOwDvKWlchzv8O9EkWwXx0/XdO2VSw7AcVbjTihLu8sfmDbU+9OI8Ej2iUkGtldyuCPEot9cxzY4/EjVPlqxpl58o+G/OAYYRDegyQpXVCyl1LPc4WNWx9hehpDyqMI1/WUcgJq6M8PCY04JifeL1gKb2cNJYaELqf+lZ34+riYuP64qIb+t06h0LrokEc+IVr2+omQl779tbGxcZsYwPPg8K+YPUtlIXJpVdxWy7xnqLS1Bjhj1GdCvOq536JQhzXboV5WDVnK69Dx40oSiMs6dBhboVzr3LZ7++A8fgaybsnk6Z6+/m2rh2q1ticWeEGBmUsJTypWybOzM/HN5TJfPwKj/DY+AylDzNKLBHFp6F9UndEnuh+mJ5WA70R4cUrKVwOhvj2wnPYrgrXyFLhRkLwA0TrgMOutR2Rb7TFLm9tokuqYxk3Q5SOk8JbRrW4MbPtXKEg21ohde5Y/tbWVgH/csJpHGG9bChELD0qJxF5pGspYXcb5UFBW5NuR0bM8VwhV49h6IfH+MjTtRRSN3Act1PwVbob6xUj9F5phUVRfK6ssMSJron2LgrnZnVYQ3XtdDJdEa13FRKBLDit12r5M2r4UnUdzJaN41O02vCpF/FHtq8rbEQid7NfgsRZNcCqh8lZKYZW7rutIy5YuYd2s8Y6dDlavZwqG2eV0BYsFfdapN2mnTOc/iL011D+9oi2YcKRLh6ntIJD/D8KybXvX5PAEbkrIl4cRHo7q+3GzzaUdadKtMKHVelQB7aQVJ4qa3QpA6gTKypEZ7XCQtWJ3GaK39ZQyDiMKSnfwTtgbMbERYXjYL7YL+gBkd/FWoFr7A3xZxq1svmll6DjvxdDRs5RXXZEmwWBzDr/WdU6sjhpiyiujmyFqeypbZ2UqUhi7jjtqHEUqvsZ0TuWq2WpXuZ2eo5VyHMjsYbC3MFwPizAjIweFKsYoBipdg5SSO4NWSSzoIl0PdxrVHjj2XWYTjPGyrP3FVZwitRgs+W2quMzNduXWVxtPijy2OunfmGIbmGh0sDRPvvroEzcGkrVmGuTsWIt9bXTe+Vx6hT1XsQaCvVGVz6I7BZgIm1VmGwfbW/fC2H27VkRg0eLO/IA1U9NDu6/2Ar1Lglzy8tKQ98qpPjgMOwe3Z+WYOVUvyVbvypLbRxd6/5fuUvG2ukEZCcN1b3raQ/m6Di5iyLHV1UYqu4QKZDlz9UK19w+ir3iz6N8IwpdFVp9K53s59cTUIyqaAmo8AphVb19inHrAsuukl/a2rb8XjUiQdwv2PpE45l+el+nX1+ngd64KwxJxMc4qnoihpNwsarSU5QZ8pkYYuLN5cGshfas4zkifqnyurO+QiJFtX+S6uru64EbI0N2s2EeBRVkXn6wo+flGAorh+noqpLAmpDtVN0Zon7QrHg1QucMVYrZAkUz4s0T1C8rPSwKmInxKD2pJZTWtlO0TDVCri74ZAzz3mrnZVR1JApp9V6+kfElCjG6UVk82OjpdnYxbVZ4cGOsUPZ5uTl/9Wrer/Io0pVpv7lb9AJUTl7f3YUCgj6a8M5Pr6bzftFhkcddVCtnZz6dN3miZ85hc7eJc8YqGDWn8ye1OFlFYZ4Vem7zVdPjTtQ60hPUFyrUGzQ3blFfwmK0vRzuHfgAwvWWLqYpXexRb2X+DME9121hwE30YKlnWtQtiZaqL7QTpp/FF1dCcApgD11X747pK2TajK+iMI8gkr3Q5DJgyW6Y77d9gULuccKWF9eobpJ6hbjLB4NAH6XWjiMkeWOk+RYhETLGj8hRHkM80hfFX8cejR3q9GulRPPRbQ+NEi1SX7NbKHRudjI+XWnsfNmE3SLHByblwtIVfkEM9dU7XVi553mNFkylQ3nr7WP5bs3yErHMtzyZCJB7RG954BADGAG5GJwpdV2JYZq4iasHC6FvnWDMgV8Ksna+6YPn6gdXUhjaKAvpL7WWPgTvGhmrN+a/ROGN08/3+Hm+kfTWvEPUbxs+yFOs2CASTG97CESLyyigdPkWTN/JQ7Jix8lXNs03ROB1kciUt9t6bxhtEC+LV1Lo6/2A9MiBZxYOmSstzv/CdfiOTpqvnH+5hwUxUmerTlz9s95yfHs5laLM8ONSOno4xiSm93naWJdB5PKEkfk/2qTRcN22YJiM80vbH1Go21UeqHyDG/1pJ2vhlJLKWOm+8XUKvxqEHzaoFJ6OS4dVcfwmZpGIEVchMleIo7TdPj0nMOUkhuXGmnXhNj4Sw9yj6baF7jOtScEF7F8z/W2Kuz2Fel8xcNINj5TLQlydeDyJAxYLtMtW7B2NZPtk7jAmeax3LvmHMdR1c9mS8wSd7HqeG8Dye+8IvFWFDEF0JqPp0Gs4dGPrSf3JZeD0dwK2f/B4fj3KxABjSqX/6lWntazMHygM8yTVnXA0a1aSxHGYw1rjd/eMb1MhlQEVtYlKp5sZ2bD/2UznhFx0G81R2n2IIaOtpmTYGz0sjF7yOGEfcW32Ejjhooe2ibpEqTdQuup8DwqFhJdrbL68GP1XmU26pKMGhG10/7vU3W3UZmE1s6/58/Alfi7UPKS0Lq3vKrQXDR72/KAjnXbulnhr83Fofy8xXJTHRkseqb34oktqasDIRndzdNRwWD/N4vSa/3DRSOjL0WUlJg4ca67Q/k2hFaa96U7Vi7V10hdWZOcHbWXC70OhriJv/qep/dWgsTEj5cKR1yjd29zaaDDndJRlapuXZputyjjt8DyG6Dye3kVeaAzTrcmgU+baNsEJYqF65Xlh0SO+D4Vocl59VBg3L0bFxqTbEL+ov52qv1Ym6en+faWqbfWY76Uv/naaXi1fIN04u1BYdml6snE61uqI9oR6vwNTl2z21AdG4BYVwiewuLH3WqWjgSd//VGSzmGaToas+mA0Si30w5OpqN5/PVJXN9MT/I24fHLeb3aqcIw832PgXhJrg8danYn6yB0ot6sQw3C5trf3rIGZpNYm7ubevtNmSePZ3uXerhD1ciB5vViUN5eOKMolhYsN9AV37Q0ckv8FblAUt9OFDf1+FC5HJW3g9S3KCUo9xpb8m77sCNVSXzqQkt8MLgRh01dlc2efK9VOFuaXl/sXoe9/9D6UW1So74ejeSjhy+HOIz2GOJJTWFGnLVE3ib71Qf/1xvd6ehiNIjc3OMRreTKf4PanXWUvrKnvf0cK8ytmelBEE4iY3kDHVI0ZEvNXFGBkiZNIhwjD9ttpJh/MHEzbHB5HD1WeV9993tWXZPV8/zGBt1tLMbvrm5A8j+h7oDjHytKRQ/X3kkBgIIZZwzj8zi0UlERRtBzPZHV4Of85V5cL8xejxvv68p2oWxK4PlwnJZR1Li/H06tZqN6/aeGDhYip2H5R+Xa3Fn49TNZ+7Ba29JaTf7Pw7E+Ah0d7/M/zX0kEiZLGearHwcVEuKgvn8C3R2Pu/nkUoixFSat+dOeHO4eHh3d6OXc+yYN9hwS/wy2T3wiXLG46zfcdHVnh3udoNFCvPrx77LslyG/bcYS+5pXfP++6bLmt+S+Qi9H5zwRE6ZRz3TheNNRPrzFBA/TNb3anvcFgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAx/Dv4XR9Ja6r5aKToAAAAASUVORK5CYII=`,
            name: `Genesis Studio`,
            rating: 4.5,
          },
          bidding_histories:[]
        },
        {
          name: `Sed ut perspiciatis unde omnis`,
          description: `Invoice for remaining payment will be sent 2-3 weeks before product is available for shipping.

            Invoice for shipping will follow once item arrives at my shipping warehouse.

            DISCLAIMER: RESINS ARE VERY FRAGILE IN NATURE AND ALTHOUGH ALL PRODUCTS ARE PACKED VERY WELL THERE MIGHT BE TIMES RESINS ARRIVE WITH CLEAN SNAPS OR SCRATCHES ON PAINT. NO COMPENSATION WILL BE GIVEN FOR THESE FAULTS AS THEY CAN BE GLUED AND WE CAN’T GUARANTEE PERFECTION IN EVERY SINGLE PRODUCT. DO NOT BUY IF YOU ARE NOT WILLING TO ACCEPT THIS. REPLACEMENTS WILL ONLY BE GIVEN DEPENDING ON COMPANIES POLICY. SOME COMPANIES DO PROVIDE REPLACEMENT BUT SOME DON’T.

            Product may arrive with minor differences from original prototype`,
          image_cover: require('../assets/demo/image 18.png'),
          image_thumbnail: [
            require('../assets/demo/image 18.png')
          ],
          time_end: this.$moment('2020-12-31 23:59:59'),
          current_bid: 800,
          buyout_price: 4000,
          bid_minimum: 500,
          seller: {
            avatar: `data:image/png;base64,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`,
            name: `Genesis Studio`,
            rating: 4.5,
          },
          bidding_histories:[]
        },
        {
          name: `Sed ut perspiciatis`,
          description: `Invoice for remaining payment will be sent 2-3 weeks before product is available for shipping.

            Invoice for shipping will follow once item arrives at my shipping warehouse.

            DISCLAIMER: RESINS ARE VERY FRAGILE IN NATURE AND ALTHOUGH ALL PRODUCTS ARE PACKED VERY WELL THERE MIGHT BE TIMES RESINS ARRIVE WITH CLEAN SNAPS OR SCRATCHES ON PAINT. NO COMPENSATION WILL BE GIVEN FOR THESE FAULTS AS THEY CAN BE GLUED AND WE CAN’T GUARANTEE PERFECTION IN EVERY SINGLE PRODUCT. DO NOT BUY IF YOU ARE NOT WILLING TO ACCEPT THIS. REPLACEMENTS WILL ONLY BE GIVEN DEPENDING ON COMPANIES POLICY. SOME COMPANIES DO PROVIDE REPLACEMENT BUT SOME DON’T.

            Product may arrive with minor differences from original prototype`,
          image_cover: require('../assets/demo/image 19.png'),
          image_thumbnail: [
            require('../assets/demo/image 19.png')
          ],
          time_end: this.$moment('2020-12-31 23:59:59'),
          current_bid: 800,
          buyout_price: 4000,
          bid_minimum: 500,
          seller: {
            avatar: `data:image/png;base64,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`,
            name: `Genesis Studio`,
            rating: 4.5,
          },
          bidding_histories:[]
        },
      ],
      loadingGrid: false,
    }
  },
  created() {
    setInterval(() => {
      this.$forceUpdate()
    }, 1000)
  },
  filters: {
    countdown(val) {
      return countdown(val);
    },
    rateToString(val) {
      return rateToString(val);
    }
  },
  methods: {
    viewDetail(product){
      this.$router.push({name: 'Details', params: { product: product }})
    },
    loadItem() {
      this.loadingGrid = true;
      setTimeout(() => {
        for (let i = 1; i <= 4; i++) {
          this.products.push(
              {
                name: `Demo`,
                description: `Product description`,
                image_cover: require('../assets/demo/no-image.jpg'),
                image_thumbnail: [
                  require('../assets/demo/no-image.jpg'),
                  require('../assets/demo/no-image.jpg')
                ],
                time_end: this.$moment('2020-12-31 23:59:59'),
                current_bid: Math.floor(Math.random() * 5000) + 1000,
                buyout_price: Math.floor(Math.random() * 10000) + 5001,
                bid_minimum: 100,
                seller: {
                  avatar: require('../assets/demo/no-image.jpg'),
                  name: `Demo Studio`,
                  rating: 4.5,
                },
                bidding_histories:[]
              })
        }
        this.loadingGrid = false;
      }, 3000)
    },
    removeItem() {
      for (let i = 1; i <= 4; i++) {
        this.products.splice(this.products.length, 1)
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

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
  cursor: pointer;
}
</style>