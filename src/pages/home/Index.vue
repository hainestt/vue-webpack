<template>
    <div class="main">
        <p> {{message}} </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    props: {},
    components: {}
})
export default class App extends Vue {

    message = 'Hello, World'
    
    mounted () {
    }
}
</script>

<style lang='scss'>
    .main {
        border: 1px solid red;
        padding: 100px;
    }
</style>


