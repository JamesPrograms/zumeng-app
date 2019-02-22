<template>
    <div class="wrapper">
        <v-header></v-header>
        <div class="search-wrap">
            <img src="../../assets/image/icon/icon_serch.png" alt="">
            <input type="text" ref="suggestInput" id="suggestInput" placeholder="请输入小区名称" v-model="searchVal">
            <button @click="goBackTo">确定</button>
        </div>
        <div id="map">

        </div>
        <mt-actionsheet
            :actions="actions"
            v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>

<script>

    export default {
        name: "chooseAddr",
        data() {
            return {
                oldUrl: '',
                sheetVisible: false,  // 附近小区显示列表标识位
                actions: [],
                searchVal: '',
                map: '',
                longitude: '',
                latitude: ''
            }
        },
        methods: {
            initMap() {
                const that = this;
                // 实例化百度地图
                this.map = new BMap.Map('map');
                this.map.centerAndZoom('成都');
                let geoLocation = new BMap.Geolocation();
                //定位当前位置
                geoLocation.getCurrentPosition(function (r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        // 设置当前位置为地图中心点和地图级别
                        that.map.centerAndZoom(r.point, 18);
                        // 标注位置
                        let marker = new BMap.Marker(r.point);
                        that.map.addOverlay(marker);
                        // 获取周边小区
                        that.getNeighborhoods();
                        // 存储当前定位位置
                        // sessionStorage.setItem('curPoint', JSON.stringify(r.point));
                    }
                })
            },
            initAutocomplete() {
                const that = this;
                // 搜索框自动匹配
                let ac = new BMap.Autocomplete({
                    'input': 'suggestInput',
                    'location': this.map
                });
                // 鼠标放在下拉框列表的事件
                ac.addEventListener('onconfirm', function (e) {
                    let _value = e.item.value;
                    let value = _value.province + _value.city + _value.district + _value.street + _value.business;
                    that.setPlace(value);
                    that.searchVal = that.$refs.suggestInput.value;
                });
            },
            getNeighborhoods() {
                const that = this;
                // 显示以当前定位点为中心 地图范围内的小区
                let bounds = this.map.getBounds();
                let sw = bounds.getSouthWest();
                let ne = bounds.getNorthEast();
                this.axios.origin.get('/place/v2/search', {
                    baseURL: '/map',
                    params: {
                        query: '附近小区',
                        bounds: sw.lat + ',' + sw.lng + ',' + ne.lat + ',' + ne.lng,
                        output: 'json',
                        ak: 'hhChe9uQhxK3j6sVGZCCAR5i0Qum3npU'
                    }
                }).then(response => {
                    response.data.results.forEach((ele, i) => {
                        that.actions.push({
                            name: ele.name,
                            location: ele.location,
                            method: that.handleCallback
                        });
                    });
                    that.sheetVisible = true;
                });
            },
            handleCallback(data) {
                this.util.goPage(
                    {
                        name: this.oldUrl,
                        params: {
                            name: data.name,
                            curLng: data.location.lng,
                            curLat: data.location.lat
                        }
                    }
                )
            },
            setPlace(value) {
                const that = this;
                this.map.clearOverlays();

                function myFun() {
                    let pp = local.getResults().getPoi(0).point;
                    that.longitude = pp.lng;
                    that.latitude = pp.lat;
                    that.map.centerAndZoom(pp, 18);
                    that.map.addOverlay(new BMap.Marker(pp));
                }

                let local = new BMap.LocalSearch(that.map, {
                    onSearchComplete: myFun
                });
                local.search(value)
            },
            goBackTo() {
                this.util.goPage({name: this.oldUrl, params: {name: this.searchVal, curLng: this.longitude, curLat: this.latitude}});
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                // 通过 `vm` 访问组件实例,将值传入oldUrl
                // 这里获取到的path带有'/'，例如'/houseDemand',这里去掉'/'
                vm.oldUrl = from.path.slice(1);
            })
        },
        mounted() {
            this.initMap();
            this.initAutocomplete();
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/variable";

    .search-wrap {
        position: absolute;
        left: 0;
        right: 0;
        display: flex;
        width: auto;
        height: .8rem;
        margin: .2rem;
        background-color: @white;
        box-sizing: border-box;
        box-shadow: 0px 1px 30px 0px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        z-index: 1;
        img {
            position: absolute;
            width: .34rem;
            height: .34rem;
            align-self: center;
            margin-left: .2rem;
        }
        input {
            flex-grow: 1;
            height: 100%;
            width: 100%;
            padding: 0;
            font-family: @font-family-medium;
            font-size: .26rem;
            color: @gray;
            padding-left: .74rem;
            padding-right: 1rem;
            border-radius: 6px;
        }
        button {
            position: absolute;
            right: 0;
            display: block;
            height: 100%;
            width: auto;
            border: none;
            flex-shrink: 0;
            border-top-right-radius: 6px;
            border-bottom-right-radius: 6px;
            background-color: @theme-color;
            color: @white;
        }
    }

    #map {
        width: 100%;
        height: 100%;
    }
</style>
