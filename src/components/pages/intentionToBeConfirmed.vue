<template>
    <div>
        <house-info :houseInfo="houseInfo"></house-info>
        <img class="scan-icon" src="../../assets/image/icon/icon_scan.png">
    </div>

</template>

<script>
    import houseInfo from '../intentionHouseInfo';
    export default {
        name: "intentionConfirmed",
        data() {
          return {
              houseInfo: {
                  tags: ['房屋安静','干净整洁','交通方便'],
                  name: '保利心语四期',
                  size: '80㎡ . 3室2厅1卫',
                  rentPrice: '2200',
                  type: '待确认',
                  bookInfo: '2019-1-2,非工作日，20：00',
                  phoneNum: '18302118574',
                  btnInfos: [{
                      content: '投诉',
                      jumpPath: '/complain',
                      hasStressStyle: false
                  },
                  {
                      content: '修改',
                      jumpPath: '/modifyReservation',
                      hasStressStyle: false
                  },
                  {
                      content: '确认',
                      jumpPath: '/payEarnest',
                      hasStressStyle: true
                  }]
              }
          }
        },
        components: {
            houseInfo
        }
    }
</script>

<style lang="less" scoped>
    .scan-icon {
        top: 4rem;
        right: 0.03rem;
        width: 1.7rem;
        position: fixed;
    }
</style>

