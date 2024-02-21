<template>
    <footer class="footer">
        <div class="container">
            <p>© 2024 Tous droits réservés. Slay The Baraka.</p>
        </div>
    </Footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>


<style scoped>

footer {
    text-align: center;
    padding: 7px 0;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
}

footer p {
    font-family: 'Press Start 2P', cursive;
    /* Police personnalisée */
    text-shadow: -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black; /* Contours noirs */
    letter-spacing: -2px;
    font-size: 14px;
}

</style>