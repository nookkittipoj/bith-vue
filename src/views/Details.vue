<template>
  <v-layout>
    <v-flex offset-md3 md6>

      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
              :href="item.href"
              :disabled="item.disabled"
          >
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
        <template v-slot:divider>
          <chevron-right-icon size="1.5x" class="custom-class"></chevron-right-icon>
        </template>
      </v-breadcrumbs>

      <v-layout>
        <v-flex>
          <vue-easy-lightbox
              :visible="lightbox.visible"
              :imgs="product.image_thumbnail"
              :index="lightbox.index"
              @hide="handleHide"
          ></vue-easy-lightbox>
          <v-card
              class="mx-auto mb-3"
          >
            <v-carousel
                :height="$vuetify.breakpoint.smAndUp ? '400' : '200'"
                hide-delimiter-background
                show-arrows-on-hover
            >
              <v-carousel-item
                  v-for="(slide, i) in product.image_thumbnail"
                  :key="i"
                  @click="showImg(i)"
              >
                <v-img
                    :src="slide"
                    :height="$vuetify.breakpoint.smAndUp ? '400' : '200'"
                    aspect-ratio="2"
                    contain
                ></v-img>
              </v-carousel-item>
            </v-carousel>

            <v-card-title class="py-1 text-left">
              {{ product.name }}
            </v-card-title>

            <v-layout style="padding: 0 16px 16px 16px">
              <v-layout justify-space-between>
                <v-flex class="text-left">
                  <v-avatar
                      class="mr-3"
                      size="36px"
                  >
                    <img
                        alt="Avatar"
                        :src="product.seller.avatar"
                    >
                  </v-avatar>
                  <strong class="text-left">
                    {{ product.seller.name }}
                  </strong>
                </v-flex>
                <v-flex>
                  <v-btn text rounded>
                    <span>
                      {{ product.seller.rating }}
                    </span>
                    <star-icon size="1.3x" class="custom-class"></star-icon>
                  </v-btn>
                </v-flex>
                <v-flex>
                  <v-btn text rounded>
                    <span v-if="$vuetify.breakpoint.mdAndUp"
                          style="text-transform: none"
                    >
                      Chat now
                    </span>
                    <img :src="require('../assets/demo/chat.svg')" alt="Chat">
                  </v-btn>
                </v-flex>
              </v-layout>


              <v-spacer></v-spacer>
              <v-btn icon>
                <share-2-icon size="1.5x" class="custom-class"></share-2-icon>
              </v-btn>
              <v-btn icon>
                <more-vertical-icon size="1.5x" class="custom-class"></more-vertical-icon>
              </v-btn>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex>
          <v-card
              class="mx-auto mb-3"
          >
            <v-layout class="py-3">
              <v-flex>
                <h3>{{ product.time_end | countdown }}</h3>
                <p class="mb-0">Ends In</p>
              </v-flex>
              <v-flex>
                <h3>{{ product.current_bid | rateToString }}</h3>
                <p class="mb-0">Current Bid</p>
              </v-flex>
              <v-flex>
                <h3>{{ product.buyout_price | rateToString }}</h3>
                <p class="mb-0">Buyout Price</p>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>

      <v-expansion-panels
          v-if="product.bidding_histories.length > 0"
          class="mb-3">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-chip
                class="ma-2 bith-badge"
            >
              Bidding History
            </v-chip>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row no-gutters>
              <v-col class="d-flex justify-start align-center col-6 col-sm-8"></v-col>
              <v-col class="d-flex justify-center align-center col-3 col-sm-2">Amount</v-col>
              <v-col class="d-flex justify-center align-center col-3 col-sm-2">Time</v-col>
            </v-row>
            <v-row v-for="(biddingHistory, i) in product.bidding_histories"
                   :key="i"
            >
              <v-col class="d-flex justify-start align-center col-6 col-sm-8">
                <v-avatar
                    class="mr-3"
                    size="36px"
                >
                  <img
                      alt="Avatar"
                      :src="biddingHistory.avatar"
                  >
                </v-avatar>
                <strong class="text-left">{{ biddingHistory.name }}</strong>
              </v-col>
              <v-col class="d-flex justify-center align-center col-3 col-sm-2">
                {{ biddingHistory.amount | rateToString }}
              </v-col>
              <v-col class="d-flex justify-center align-center col-3 col-sm-2">{{ biddingHistory.time }}</v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-expansion-panels
          v-if="product.description"
          class="mb-3">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-chip
                class="ma-2 bith-badge"
            >
              Product Detail
            </v-chip>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col class="text-left" v-html="product.description"></v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <bith-confirm-dialog :type="dialogConfirm.type"
                           :active="dialogConfirm.show"
                           :content="dialogConfirm.content"
                           @close="onClose"
                           @accept="onConfirm"
                           persistent
      >
      </bith-confirm-dialog>

      <v-btn class="mx-2 fix-bid" @click="dialogBith = true" fab dark color="#f44336">
        <img :src="require('../assets/demo/bid.svg')"/>
      </v-btn>
      <v-dialog v-model="dialogBith" persistent max-width="300px">
        <v-card>
          <v-card-text style="height: 125px">
            <v-container>
              <v-row>
                <v-col class="d-flex justify-center align-center">
                  <v-btn icon @click="bidValueHandler(-product.bid_minimum)">
                    <v-icon>mdi-minus-box-outline</v-icon>
                  </v-btn>
                  <strong>{{ bidValue | rateToString }}</strong>
                  <v-btn icon @click="bidValueHandler(product.bid_minimum)">
                    <v-icon>mdi-plus-box-outline</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="dialog-actions">
            <v-btn
                class="diss-miss"
                @click="dialogBith = false"
            >
              DISSMISS
            </v-btn>
            <v-btn
                class="accept"
                @click="confirmBid"
            >
              BID
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-flex>
  </v-layout>
</template>

<script>
import BithConfirmDialog from "../components/BithConfirmDialog";
import {Share2Icon, MoreVerticalIcon, StarIcon, ChevronRightIcon} from 'vue-feather-icons'
import {countdown, rateToString} from "@/utils/helper";
import router from "@/router";

export default {
  name: "Details",
  components: {
    BithConfirmDialog,
    Share2Icon,
    MoreVerticalIcon,
    StarIcon,
    ChevronRightIcon
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  filters: {
    countdown(val) {
      return countdown(val);
    },
    rateToString(val) {
      return rateToString(val);
    }
  },
  data() {
    return {
      dialogConfirm: {
        show: false,
        content: ``,
        type: `success`,
      },
      dialogBith: false,
      bidValue: 0,
      lightbox: {
        visible: false,
        index: 0,
      },
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: this.product.name,
          disabled: false,
          href: 'details',
        },
      ]
    }
  },
  created() {
    if (!this.product) {
      router.push({name: 'Home'})
    }
    setInterval(() => {
      this.$forceUpdate()
    }, 1000)
    this.bidValue = this.product.current_bid
  },
  methods: {
    bidValueHandler(bidLimit) {
      let currentBid = this.bidValue + bidLimit;
      if(this.bidValue >= this.product.buyout_price) {
        this.warn();
      } else if (currentBid <= this.product.current_bid) {
        this.bidValue = this.product.current_bid;
        this.oops();
      } else if (currentBid >= this.product.buyout_price) {
        this.bidValue = this.product.buyout_price;
      } else {
        this.bidValue = currentBid;
      }
    },
    confirmBid() {
      this.product.current_bid = this.bidValue;
      this.dialogBith = false
      this.done();
    },
    showImg(index) {
      this.lightbox.index = index
      this.lightbox.visible = true
    },
    handleHide() {
      this.lightbox.visible = false
    },
    onClose(val) {
      this.dialogConfirm.show = val
    },
    onConfirm() {
      this.dialogConfirm.show = false
    },
    done() {
      this.dialogConfirm.type = 'success'
      this.dialogConfirm.show = true;
      this.dialogConfirm.content = `Your current bid is ${rateToString(this.bidValue)}.`;
    },
    oops() {
      this.dialogConfirm.type = 'danger'
      this.dialogConfirm.show = true;
      this.dialogConfirm.content = `${rateToString(this.bidValue)} were outbid by another user.`;
    },
    warn() {
      this.dialogConfirm.type = 'warn'
      this.dialogConfirm.show = true;
      this.dialogConfirm.content = `You will <b>CANNOT</b> increase your bid more than buyout price.`;
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-class {
  color: #40C3B0;
}

.bith-badge {
  color: #40C3B0 !important;
  background-color: #B5F0E8 !important;
  font-weight: bold;
  max-width: 125px;
  justify-content: center;
}

.fix-bid {
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 1;
}
</style>