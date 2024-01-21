<script lang="ts">

export default{
    data() {
        return{
            email: '',
            password: '',
        };
    },
    methods:{
        register() {
            fetch('http://localhost:5050/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                }),
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error.response.data);
            });
        }
    }
};
</script>


<template>
    <input id="email" type="email" v-model="email" placeholder="youremail@example.com">
    <input id="password" type="password" v-model="password" placeholder="password">
    <router-link :to="{ name:'register' }" id="reg_btn" @click.prevent="register">Register!</router-link>
    <router-link :to="{ name:'login' }" id="redirect-btn">Have an account?&nbsp;<a id="zzz">Log In here!</a></router-link>
</template>