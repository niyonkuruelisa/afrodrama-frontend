<template>
    <div id="page-top">
        <Nav/>
        <div id="wrapper">
            <SideBar/>
            <div id="content-wrapper">
                <div class="container-fluid pb-0">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="col-xl-6 col-sm-6 mb-3">
                            <div class="card text-white bg-primary o-hidden h-100 border-none">
                                <div class="card-body">
                                    <div class="card-body-icon">
                                        <i class="fas fa-fw fa-briefcase"></i>
                                    </div>
                                    <div class="mr-5"><b>{{packages.length}}</b> Packages</div>
                                </div>
                                <a class="card-footer text-white clearfix small z-1" href="#">
                                </a>
                            </div>
                        </div>
                        </div>
                    </div>
                    <hr>
                    <div class="video-block section-padding">

                        <div class="row">
                            <div class="col-lg-6">

                                <div class="col-lg-12">
                                    <div class="main-title">
                                        <h6>Available Packages</h6>
                                    </div>
                                </div>
                                <div  class="col-xl-6 col-sm-6 mb-12" >
                                    <div class="card text-white bg-primary o-hidden h-100 border-none" v-for="(pack,index) in packages" :key="index">
                                        <div class="card-body">
                                            <div class="card-body-icon">
                                                <i class="fas fa-fw fa-money-bill"></i>
                                            </div>
                                            <div class="text-center"><h1><b>${{pack.amount}}</b></h1></div>
                                            <div class="text-center"><h1><b>{{pack.name}}</b></h1></div>
                                        </div>
                                        <a class="card-footer text-white clearfix small z-1" href="#">
                                            <h5 class="text-center">{{pack.package_type}}</h5>
                                            <div  class="main-title float-center center-section">
                                                <button v-on:click="showEditPackageSection(pack)" class="btn btn-block btn-dark pl-4 pt-1 mb-2">Edit This Package</button> &nbsp; &nbsp;
                                            </div>

                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div v-if="edit" class="col-lg-6">
                                <div class="main-title text-center">
                                    <h6>Edit Package: {{name}}</h6>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="name">Name</label>
                                            <input v-model="name" type="text"
                                                   placeholder="Eg: Premium" id="name"
                                                   class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="package_type">Type</label>
                                            <select class="custom-select" id="package_type" v-model="package_type">
                                                <option value="">Select Package</option>
                                                <option value="Monthly">Monthly</option>
                                                <option value="Daily">Daily</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="amount">Amount</label>
                                            <input v-model="amount" type="text"
                                                   placeholder="Eg: 20000" id="amount"
                                                   class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="discount">Discount</label>
                                            <input v-model="discount" type="text"
                                                   placeholder="Eg: 20" id="discount"
                                                   class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-lg-12 text-center">
                                        <div v-if="isNew" class="main-title float-center center-section">
                                            <button v-on:click="addPackage()" class="btn btn-primary pl-4 pt-1 mb-2">Add Package</button> &nbsp; &nbsp;
                                        </div>
                                        <div v-else class="main-title float-center center-section">
                                            <button v-on:click="showAddPackageSection()" class="btn btn-dark pl-4 pt-1 mb-2">Cancel</button> &nbsp; &nbsp;
                                            <button v-on:click="editPackage()" class="btn btn-primary pl-4 pt-1 mb-2">Edit Package</button> &nbsp; &nbsp;
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <!--                            <div class="col-lg-12">-->
                            <!--                                <div class="main-title">-->
                            <!--                                    <h6>System Packages</h6>-->
                            <!--                                </div>-->
                            <!--                                <div  class="main-title float-center center-section">-->
                            <!--                                    <button v-on:click="showAddPackageSection()" class="btn btn-primary pl-4 pt-1 mb-2">Add New Package</button> &nbsp; &nbsp;-->
                            <!--                                </div>-->

                            <!--                            </div>-->

                        </div>
                    </div>

                </div>

                <Footer/>
            </div>

        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import '../../assets/styles/js/custom.js'
    /* eslint-disable */
    import Nav from './Partials/Nav'
    import SideBar from "./Partials/SideBar";
    import Footer from "./Partials/Footer";
    import axios from 'axios'
    export default {
        name: "ManagePackages",
        components: {
            Nav,
            SideBar,
            Footer
        },
        data(){
            return{
                packages: [],
                edit: false,
                amount: 0,
                name: "",
                discount: 0,
                package_type: "",
                pack: [],
                isNew: true,
            }
        },
        methods: {
            showAddPackageSection(){
                this.edit = !this.edit
                this.isNew = true

                this.name = ""
                this.discount = 0
                this.amount = 0
                this.package_type = ""
            },
            async addPackage(){
                const pack = {
                    "package" : {
                        "name" : this.name,
                        "package_type" :this.package_type,
                        "amount" : this.amount,
                        "discount" : this.discount
                    }
                }
                if(pack.package.name === ""){
                    alert("Please Enter Package Name.")
                }else if(pack.package.package_type === ""){
                    alert("Please Choose Package Type.")
                }else if(pack.package.amount === 0){
                    alert("Please Enter Package Amount in Dollars.")
                }else{
                    await axios.post('packages',pack).then( res => {
                        this.edit = !this.edit
                        this.getPackages()
                    }).catch( err => {
                        console.log(err)
                    })
                }

            },
            async getPackages(){
                const getPackages = await axios.get('packages')
               // console.log(getPackages.data)
                this.packages = getPackages.data.packages
            },
            showEditPackageSection(pack){
                this.pack = pack
                this.edit = true
                this.isNew = false
                this.name = pack.name
                this.discount = pack.discount
                this.amount = pack.amount
                this.package_type = pack.package_type

            },
            async editPackage(){
                const pack = {
                    "package" : {
                        "id" : this.pack.id,
                        "name" : this.name,
                        "package_type" :this.package_type,
                        "amount" : this.amount,
                        "discount" : this.discount
                    }
                }
                if(pack.package.name === ""){
                    alert("Please Enter Package Name.")
                }else if(pack.package.package_type === ""){
                    alert("Please Choose Package Type.")
                }else{
                    await axios.put('packages/'+pack.package.id,pack).then( res => {
                        this.edit = !this.edit

                        this.getPackages()
                    }).catch( err => {
                        console.log(err)
                    })
                }
            }

        },
        async created(){
            // get dashboard data
            await this.getPackages()
        },
    }
</script>

<style>

    @import '../../assets/styles/vendor/bootstrap/css/bootstrap.min.css';
    @import '../../assets/styles/vendor/fontawesome-free/css/all.min.css';
    @import '../../assets/styles/css/osahan.css';
    @import '../../assets/styles/vendor/owl-carousel/owl.carousel.css';
    @import '../../assets/styles/vendor/owl-carousel/owl.theme.css';
</style>
