<template>
    <div>
        <house-info :houseInfo="houseInfo"></house-info>
    </div>

</template>

<script>
    import houseInfo from '../intentionHouseInfo';
    export default {
        name: "intentionLocked",
        data() {
            return {
                houseInfo: {
                    tags: ['房屋安静','干净整洁','交通方便'],
                    name: '保利心语四期',
                    size: '80㎡ . 3室2厅1卫',
                    rentPrice: '2200',
                    type: '已锁定',
                    bookInfo: '',
                    btnInfos: [{
                        content: '确认已签约',
                        jumpPath: '/confirmSign',
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

