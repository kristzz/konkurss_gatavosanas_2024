<template>
    <input id="email" type="email" v-model="email" placeholder="youremail@example.com">
    <input id="password" type="password" v-model="password" placeholder="password">
    <button @click.prevent="login">Login</button>
</template>

<script lang="ts">
export default{
    data() {
        return{
            email: '',
            password: '',
        };
    },
    methods:{
        login(){
            fetch('http://localhost:5050/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                }),
            }).then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Failed to login');
                }
            }).then((data) => {
                localStorage.setItem('token', data.token);
                this.$router.push({ name: 'success' });
            }).catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>