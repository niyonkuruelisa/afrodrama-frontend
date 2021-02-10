<template>
    <div id="page-top">

        <Nav/>
        <div id="wrapper">

            <SideBar/>
            <div id="content-wrapper">
                <div class="container-fluid pb-0">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="main-title">
                                <h6>System Settings</h6>
                            </div>
                            <div class="main-title float-center center-section">
                                <button v-on:click="showEditInfoSection()" class="btn btn-primary pl-4 pt-1 mb-2"><i class="fa fa-edit"></i>Edit Settings</button> &nbsp; &nbsp;
                                </div>
                        </div>
                    </div>
                    <hr>
                    <div class="video-block section-padding">
                        <div class="row">
                            <div v-if="edit" class="col-md-6">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label for="systemTitle">System Title</label>
                                            <input v-model="systemTitle" type="text"
                                                   placeholder="" id="systemTitle"
                                                   class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label for="systemSlogan">System Slogan</label>
                                            <input v-model="systemSlogan" type="text"
                                                   placeholder="" id="systemSlogan"
                                                   class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label for="systemCompanyName">System Company Name</label>
                                            <input v-model="systemCompanyName" type="text"
                                                   placeholder="" id="systemCompanyName"
                                                   class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label for="systemEmail">System Email</label>
                                            <input v-model="systemEmail" type="text"
                                                   placeholder="" id="systemEmail"
                                                   class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="systemPhone1">System Telephone 1</label>
                                            <input v-model="systemPhone1" type="text"
                                                   placeholder="" id="systemPhone1"
                                                   class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="systemPhone2">System Telephone 2</label>
                                            <input v-model="systemPhone2" type="text"
                                                   placeholder="" id="systemPhone2"
                                                   class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label for="systemAddress">System Address Location</label>
                                            <input v-model="systemAddress" type="text"
                                                   placeholder="" id="systemAddress"
                                                   class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label for="systemAbout">System About</label>
                                            <textarea v-model="systemAbout" rows="3" id="systemAbout" name="e2" class="form-control"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label for="systemKeywords">System Keywords</label>
                                            <textarea v-model="systemKeywords" rows="2" id="systemKeywords" name="e2" class="form-control"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="osahan-area text-center mb-3">
                                            <button v-on:click="updateSystemInfo()" class="btn btn-outline-primary">Save Changes</button>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div class="col-md-6">
                                <div class="single-video-left">
                                    <div class="single-video-info-content box mb-3">
                                        <h6>Title:</h6>
                                        <p>{{system.title}}</p>
                                        <h6>Slogan:</h6>
                                        <p>{{system.slogan}}</p>
                                        <h6>Company Name:</h6>
                                        <p>{{system.company_name}}</p>
                                        <h6>Email:</h6>
                                        <p>{{system.email}}</p>
                                        <h6>Telephones:</h6>
                                        <p>Phone1: {{system.phone1}} Phone2: {{system.phone2}}</p>
                                        <h6>Address:</h6>
                                        <p>{{system.address}}</p>
                                        <h6>About:</h6>
                                        <p>{{system.about}}</p>
                                        <h6>Keywords:</h6>
                                        <p>{{system.keywords}}</p>
                                       </div>
                                </div>
                            </div>
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
        name: "SystemSettings",
        components: {
            Nav,
            SideBar,
            Footer
        },
        data(){
            return{
                dashboard: [],
                system: [],
                edit: false,
                systemTitle: "",
                systemAbout: "",
                systemSlogan: "",
                systemKeywords: "",
                systemPhone1: "",
                systemPhone2: "",
                systemAddress: "",
                systemEmail: "",
                systemCompanyName: "",
            }
        },
        methods: {
            showEditInfoSection(){
                this.edit = !this.edit

            },
            async getSystemInfo(){
                const systemInfoResponse = await axios.get('systems')
                this.system = systemInfoResponse.data
                this.systemTitle = this.system.title
                this.systemSlogan = this.system.slogan
                this.systemEmail = this.system.email
                this.systemAbout = this.system.about
                this.systemAddress = this.system.address
                this.systemCompanyName = this.system.company_name
                this.systemPhone1 = this.system.phone1
                this.systemPhone2 = this.system.phone2
                this.systemKeywords = this.system.keywords
            },
            async updateSystemInfo(){
                const data = {
                    "system" : {
                        "id": this.system.id,
                        "title" : this.systemTitle,
                        "company_name" :  this.systemCompanyName,
                        "about" :  this.systemAbout,
                        "slogan" :  this.systemSlogan,
                        "email" :  this.systemEmail,
                        "phone1" : this.systemPhone1,
                        "phone2" :  this.systemPhone2,
                        "keywords" :  this.systemKeywords,
                        "address" :  this.systemAddress,
                    }
                }
                //send request to server
                await axios.put('systems/'+this.system.id, data).then( response => {
                    if(response.data.success){
                        this.system = response.data.system
                        this.edit = !this.edit
                    }else{
                        alert("Can't Update System, Contact your Administrator");
                    }
                }).catch(error => {
                    console.log(error)
                });
            }
        },
        async created(){
            // get dashboard data
            await this.getSystemInfo()
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
