
<!-- <script>
	import { div } from "edgedb/dist/primitives/bigint";

</script> -->

<!-- <script>
  import Navbar from "$lib/components/Navbar.svelte";
  import CustomLabel from "$lib/components/basiccomponents/CustomLabel.svelte";
</script> -->

<!-- <Navbar> <div slot="header">Resume Builder</div></Navbar> -->
<!-- <CustomLabel>Name</CustomLabel> -->


<!-- <div class="parent">
  <div>Header</div> 
  <div class="flex flex-col md:flex-row">
    <div class="w-20">Sidebar</div>
    <div class="w-full">Main content</div>
  </div>
</div>
    -->

    <!-- <div class="flex flex-wrap grow">
      <div class="w-32 grow">01</div>
      <div class="w-32 grow ">02</div>
      <div class="w-32 grow">03</div>
      <div class="w-32 grow">04</div>
      <div class="w-32 grow">05</div>
      <div class="w-32 grow">06</div>
      <div class="w-32 grow">07</div>
      <div class="w-32 grow">03</div>
    </div> -->


    <!-- <div class="container mx-auto">
      <div class="grid  lg:grid-cols-2 gap-4">
        <div class="p-6 rounded-lg bg-sky-500">First Column</div>
        <div class="p-6 rounded-lg bg-sky-500">Second Column</div>
        <div class="p-6 rounded-lg bg-sky-500 col-span-2">Third Column</div>
        <div class="p-6 rounded-lg bg-sky-500">Fourth Column</div>
        <div class="grid  lg:grid-cols-2 gap-4">
          <div class="p-6 rounded-lg bg-sky-500">Fifth Column</div>
          <div class="p-6 rounded-lg bg-sky-500">Sixth Column</div>
        </div>
        <div class="p-6 rounded-lg bg-sky-500">Seventh Column</div>
        <div class="p-6 rounded-lg bg-sky-500">Eight Column</div>
      </div>
    </div> -->

    <!-- <script>
      import BasicDetails from "$lib/components/BasicDetails.svelte";
    </script>

    <BasicDetails/> -->


    <!-- <script>
      import BasicDetails from "$lib/components/BasicDetails.svelte"
    </script>

    <BasicDetails/> -->

<script>
  import ListingPage from "$lib/components/ListingPage.svelte";

</script>

<main>
  <div class="flex justify-end mt-5 mr-20">
    <button type="button" class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"><a href="/resume">+ Create Resume</a></button>
  </div>
  <ListingPage/>
</main>



   