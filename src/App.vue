<template>
    <div class="main">
        <transition name='fade'>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    props: {
        propMessage: String
    }
})
export default class App extends Vue {}
</script>

<style lang="scss">
    body {
        font-size: 14px;
        margin: 0;
    }
</style>


