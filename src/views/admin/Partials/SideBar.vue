<template>
  <ul class="sidebar navbar-nav">
    <li class="nav-item">
      <router-link class="nav-link" to="/admin">
        <i class="fas fa-fw fa-home"></i>
        <span>Home</span>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/admin/upload">
        <i class="fas fa-fw fa-cloud-upload-alt"></i>
        <span>Upload Movie</span>
      </router-link>
    </li>

    <li class="nav-item">
      <router-link class="nav-link" to="/admin/movies">
        <i class="fas fa-fw fa-video"></i>
        <span>Manage Movies</span>
      </router-link>
    </li>
<!--    <li class="nav-item">-->
<!--      <a class="nav-link" href="channels.html">-->
<!--        <i class="fas fa-fw fa-gift"></i>-->
<!--        <span>Manage Subscription</span>-->
<!--      </a>-->
<!--    </li>-->
    <li class="nav-item">
      <router-link class="nav-link" to="/admin/packages">
        <i class="fas fa-fw fa-gift"></i>
        <span>Manage Packages</span>
      </router-link>
    </li>
<!--    <li class="nav-item">-->
<!--      <a class="nav-link" href="channels.html">-->
<!--        <i class="fas fa-fw fa-users"></i>-->
<!--        <span>Manage Users</span>-->
<!--      </a>-->
<!--    </li>-->
    <li class="nav-item">
      <router-link class="nav-link" to="/admin/settings">
        <i class="fas fa-fw fa-cog"></i>
        <span>Manage System</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
    export default {
        name: "SideBar"
    }
</script>

<style scoped>

</style>
