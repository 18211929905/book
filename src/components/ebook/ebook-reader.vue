<template>
    <div>{{$route.params.fileName}}</div>
</template>

<script>
export default {
    mounted() {
        const fileName = this.$route.params.fileName
        console.log(fileName)
    }
}
</script>

<style>
</style>

