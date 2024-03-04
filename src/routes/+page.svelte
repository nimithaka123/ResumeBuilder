<script>
  import {goto} from '$app/navigation'
  import ListingPage from "$lib/components/ListingPage.svelte";
  import SimpleResumeTemplate from "$lib/components/simpleResumeTemplate.svelte";

  function redirectToForms() {
    goto('/resume')
  }

</script>

<main>
  <div class="flex justify-end mt-5 mr-20">
    <button type="button" class="text-gray-900 border-2 border-cyan-600 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" on:click={redirectToForms}><span class="font-bold text-cyan-600">+ Create Resume</span></button>
  </div>
  <ListingPage/>
</main>


   