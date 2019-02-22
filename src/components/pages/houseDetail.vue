<template>
    <div class="wrapper bg-color-white">
        <v-header></v-header>
        <!-- swiper -->
        <swiper :options="swiperOption">
            <swiper-slide v-for="(banner,index) in houseDetail.banners" :key="index">
                <img :src="require(`../../assets/image/${banner}`)" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="house-info">
            <div class="card-title">{{houseDetail.name}}</div>
            <div class="rent">¥{{houseDetail.amount}}<span>/月</span></div>
            <div class="room">
                <img src="../../assets/image/icon/icon_pattern.png" alt="">
                <span>{{houseDetail.area}}㎡&nbsp;.&nbsp;{{houseDetail.room}}室{{houseDetail.parlor}}厅1卫</span>
            </div>
            <div class="expire-date">
                <img src="../../assets/image/icon/icon_time.png" alt="">
                <span>到期时间{{ moment(houseDetail.outdate).format('YYYY-MM-DD')}}</span>
            </div>
            <div class="agency-fee">
                <img src="../../assets/image/icon/icon_money.png" alt="">
                <span>中介费&nbsp;{{houseDetail.tip}}&nbsp;元</span>
            </div>
            <div class="house-tags">
                <v-tags :tags="houseDetail.tagList"></v-tags>
            </div>
        </div>
        <div class="house-location">
            <div class="card-title">位置及周边</div>
            <div id="map"></div>
        </div>
        <div class="tenant-limit">
            <div class="card-title">租客要求</div>
            <div class="tenant-limit-tags">
                <v-tags :tags="houseDetail.tenantlimit"></v-tags>
            </div>
        </div>
        <div class="house-publisher">
            <div class="card-title">发布者</div>
            <div class="publisher-info" @click="util.goPage({ name: 'commentsForPublisher',params:{publisherid:1}})">
                <img class="avatar" src="../../assets/image/touxiang.jpg" alt="">
                <div class="detail">
                    <p>纯港</p>
                    <p>投诉率：98% 被投诉率：99%</p>
                </div>
                <div class="indicator-icon">&gt;</div>
            </div>
        </div>
        <div class="house-comment" v-if="latestComment != ''">
            <div class="card-title">
                房屋评价
                <span class="see-more" @click="util.goPage({ name: 'houseComments',params:{tags:houseDetail.tagList,houseid:houseDetail.id}})">查看更多>></span>
            </div>
            <div class="comment-detail">
                <div class="commentator-info">
                    <img class="avatar" :src="require(`../../assets/image/${latestComment.avatarUrl}`)" alt="">
                    <div class="name">{{latestComment.username}}</div>
                    <div class="date">{{latestComment.date}}</div>
                </div>
                <div class="comment-text">
                    {{latestComment.comment}}
                </div>
                <div class="comment-pics" v-if="latestComment.pictures.length">
                    <div class="pic" v-for="(pic,index) in latestComment.pictures" :key="index">
                        <img :src="require(`../../assets/image/${pic}`)" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="house-allocations">
            <div class="card-title">房间配置</div>
            <v-allocations :allocations="houseDetail.installation"></v-allocations>
        </div>
        <div class="booking-time">
            <button class="custom-btn-big"
                    @click="util.goPage({ name: 'reserveTime',params:{timeTags:[houseDetail.reservedate,houseDetail.reservetime],houseid:houseDetail.id}})">预约看房
            </button>
        </div>
    </div>
</template>
<script>
    import vTags from '../../components/tags'
    import vAllocations from '../allocations'

    export default {
        name: "houseDetail",
        components: {
            vTags,
            vAllocations
        },
        data() {
            return {
                // swiper 配置
                swiperOption: {
                    loop: true,
                    autoplay: true,
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'fraction',
                        modifierClass: 'custom-pagination-'
                    }
                },
                // 房源列表传过来的id
                id: this.$route.params.id,
                // 房源详情数据
                houseDetail: {},
                // 发布者相关数据
                publisherInfo: '',
                // 最新一条评论数据
                latestComment: '',
                publisherAcceptTime: []
            }
        },
        methods: {
            getHouseDetail() {
                const that = this;
                this.axios.get({
                    url: '/house-service/getDetail',
                    data: {
                        houseid: this.id
                    },
                    loading: true,
                    sucFunc(response) {
                        that.houseDetail = response.data;
                        that.initMap();
                    }
                });
            },
            getPublisherInfo() {
                const that = this;
                this.axios.get({
                    url: '',  // TODO 接口未定义
                    loading: true,
                    sucFunc(response) {
                        that.publisherInfo = response.data;
                    }
                });
            },
            getlatestComment() {
                const that = this;
                this.axios.post({
                    url: '/comment-service/house/getLastComment',
                    loading: true,
                    data: {
                        houseid: this.id
                    },
                    sucFunc(response) {
                        that.latestComment = response.data;
                    }
                });
            },
            initMap() {
                const that = this;
                // 创建地图实例
                let map = new BMap.Map("map");
                // 创建点坐标
                let point = new BMap.Point(that.houseDetail.longitude, that.houseDetail.latitude);
                // 初始化地图，设置中心点坐标和地图级别
                map.centerAndZoom(point, 18);
                // 根据坐标点获得该地点的地址描述
                // 1. 创建地理编码实例
                var myGeo = new BMap.Geocoder();
                // 2. 根据坐标得到地址描述
                myGeo.getLocation(point, function (result) {
                    // 3. 解析成功后显示信息窗口
                    if (result) {
                        let customContent = '<div class="custom-map-info-window"><img src=" ' + require('../../assets/image/icon/icon_location.png') + '"><span>' + result.address + '</span></div>';
                        // 创建信息窗口对象
                        let infoWindow = new BMap.InfoWindow({
                            width: 0,               // 信息窗口宽度(0 means auto width)
                            height: 0               // 信息窗口高度(0 means auto height)
                        });
                        // 自定义窗口内容
                        infoWindow.setContent(customContent);
                        //开启信息窗口
                        map.openInfoWindow(infoWindow, point);
                    }
                });
            }
        },
        mounted() {
            this.getHouseDetail();
            this.getlatestComment();
        },
        watch: {}
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .wrapper > div {
        margin: 0 .3rem .4rem .3rem;
    }

    div.swiper-container {
        margin-left: 0;
        margin-right: 0;
        margin-bottom: .2rem;
    }

    .swiper-slide {
        height: 3.4rem;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .custom-pagination-fraction {
        top: .28rem;
        right: .2rem;
        font-family: @font-family-medium;
        font-size: .24rem;
        color: @white;
    }

    .avatar {
        img {
            width: 100%;
            height: 100%;
            border-radius: 100%;
        }
    }

    .house-info {
        font-family: @font-family-medium;
        font-size: .24rem;
        color: @gray-dim;
        padding-left: .2rem;
        padding-right: .2rem;
        padding-top: .2rem;
        box-shadow: 0px 1px 10px 0px rgba(53, 47, 47, 0.1);
        border-radius: 6px;
        > div {
            margin-bottom: .21rem;
        }
        .rent {
            font-family: @font-family-bold;
            font-size: .48rem;
            color: @theme-color;
            span {
                font-family: @font-family-medium;
                font-size: .24rem;
                color: #1e1e1e;
            }
        }
        .room {
            img {
                width: .2rem;
                height: .2rem;
                margin-right: .11rem;
            }
        }
        .expire-date {
            margin-bottom: .31rem;
            float: left;
            img {
                width: .22rem;
                height: .22rem;
                margin-right: .09rem;
            }
            span {
                vertical-align: top;
            }
        }
        .agency-fee {
            font-family: @font-family-regular;
            float: right;
            margin-bottom: .31rem;
            img {
                width: .22rem;
                height: .22rem;
                margin-right: .09rem;
            }
            span {
                vertical-align: top;
            }
        }
        .house-tags {
            clear: both;
            padding: .19rem .1rem .13rem .1rem;
            margin-bottom: 0;
            border-top: 1px solid #eeeeee;
        }
    }

    .house-location {
        #map {
            width: 100%;
            height: 3.4rem;
            border-radius: 6px;
            border: 1px solid #dcdcdc;
        }
    }

    .tenant-limit {
        padding-bottom: .2rem;
        border-bottom: 1px solid #f0f0f0;
    }

    .house-publisher {
        padding-bottom: .4rem;
        border-bottom: 1px solid #f0f0f0;
        .publisher-info {
            display: flex;
            justify-content: space-between;
            .avatar {
                width: 0.9rem;
                height: 0.9rem;
                border-radius: 100%;
                margin-right: .15rem;
            }
            .detail {
                font-family: @font-family-medium;
                font-size: .28rem;
                color: @black;
                align-self: center;
                flex-grow: 1;
                p:first-child {
                    margin-bottom: .16rem;
                }
            }
            .indicator-icon {
                align-self: center;
                color: #999;
            }
        }
    }

    .house-comment {
        font-family: @font-family-regular;
        font-size: .24rem;
        .see-more {
            font-size: .24rem;
            color: @theme-color;
            float: right;
            margin-top: .05rem;
        }
        .comment-detail {
            padding: .2rem;
            box-shadow: 0px 1px 10px 0px rgba(53, 47, 47, 0.1);
            border-radius: 6px;
            .commentator-info {
                clear: both;
                display: flex;
                margin-bottom: .2rem;
                .avatar {
                    width: .6rem;
                    height: .6rem;
                    border-radius: 100%;
                    margin-right: .1rem;
                }
                .name {
                    font-family: @font-family-medium;
                    font-size: .28rem;
                    align-self: center;
                }
                .date {
                    color: #b2b2b2;
                    font-size: .2rem;
                    text-align: right;
                    align-self: center;
                    flex-grow: 1;
                }
            }
            .comment-text {
                color: @gray;
                margin-bottom: .2rem;
            }
            .comment-pics {
                display: flex;
                margin-bottom: .08rem;
                .pic {
                    width: 2.1rem;
                    height: 1.2rem;
                    background-color: #aeaeae;
                    border: solid 1px #dddddd;
                    &:nth-child(2) {
                        margin: 0 .1rem;
                    }
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }

    .house-allocations {
        padding-bottom: 1.2rem;
    }

    div.booking-time {
        width: 100%;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        margin: 0;
        padding: .16rem .3rem;
        box-shadow: 0px 1px 20px 0px rgba(176, 176, 176, 0.31);
        background-color: @white;
    }
</style>
