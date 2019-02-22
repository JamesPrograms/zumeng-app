<template>
    <div class="wrapper">
        <v-header></v-header>
        <div id="map"></div>
    </div>
</template>

<script>
    export default {
        name: "location",
        mounted() {
            // 获取上一个页面传过来的坐标
            const location = this.$route.params;
            // 地图实例
            const map = new BMap.Map('map');
            // 实例化中心点坐标
            const point = new BMap.Point(location.longitude, location.latitude);
            // 初始化地图，设置中心点坐标和地图级别
            map.centerAndZoom(point, 18);
            // 创建标注
            const marker = new BMap.Marker(point);
            // 将标注放于地图中
            map.addOverlay(marker);
        }
    }
</script>

<style lang="less" scoped>
    #map {
        width: 100%;
        height: 100%;
    }
</style>
