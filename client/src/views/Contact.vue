<template>
  <div class="contact-us container">
    <h1>Contact Us</h1>
    <div class="row">
      <div class="col-12">
        <form>
          <div class="row">
            <div class="col-12 col-sm-6">
              <input class="form-control" type="text" placeholder="Full Name" />
            </div>
            <div class="col-12 col-sm-6">
              <input class="form-control" type="text" placeholder="email" />
            </div>
          </div>
          <input class="form-control margin-top-10" type="text" placeholder="Subject" />
          <textarea
            class="form-control margin-top-10"
            rows="8"
            placeholder="Type message here..."
          ></textarea>
          <button class="btn btn-primary margin-top-10">Submit</button>
        </form>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Footer from "@/components/layout/Footer.vue";
  export default {
    name: "Contact",
    components: {
      Footer,
    },
  };
</script>
<style scoped>
  .margin-top-10 {
    margin-top: 10px;
  }
</style>
