  <main>
    {#if showCertificates}
      <Certifications/>
    {:else if showPreview}
      <TemplateChoice/>
    {:else}
    <div class="container mx-auto mt-10">
      <h2 class="text-4xl text-slate-600">Social Media Profile</h2>
      <div class="form-container mt-5">
        <div class="grid grid-cols-1 gap-4">
          {#each inputs as input, index}
          <div class="flex" class:mt-12={index > 0}>
            <label class="label w-1/2">
              <span>Network</span>
              <input class="input p-3 rounded-lg border" type="text" placeholder="Network" bind:value={input.network}/>
            </label>
            <label class="label w-1/2 ml-4">
              <span>Url</span>
              <input class="input p-3 rounded-lg border" type="text" placeholder="Url" bind:value={input.url} />
            </label>
            <button class="bg-gray-400 rounded-lg p-2 ml-4 mt-6 w-28 action-btn" disabled='{buttonDisable(index)}' on:click={()=>deleteSocialMedia(index)}><span class="font-medium">DELETE</span></button>
          </div>
          {/each}
          <div class="flex justify-end">
            <button type="button" class="bg-gray-400 rounded-lg w-28 action-btn"  on:click={addInput}><span class="font-medium">ADD</span></button>
         </div>
        </div>
        <div class="flex justify-between">
          <button type="button" class="border-2 border-gray-400 rounded-lg p-3 w-40 mt-10" on:click={toggleComponent}><span class="font-medium">BACK</span></button>
          <button type="button" class="border-2 border-gray-400 rounded-lg p-3 w-40 mt-10" on:click={toPreviewPage}><span class="font-medium">NEXT</span></button>
        </div>
      </div>
    </div>
    {/if}
    <Modal/>
  </main>
  
  
  <script>
    import {basicDetailsData, updateBasicDetails} from '../../store/resume.js'
    import Certifications from "./Certifications.svelte";
    import TemplateChoice from './TemplateChoice.svelte';

    import { Modal, getModalStore } from '@skeletonlabs/skeleton';
    import { initializeStores } from '@skeletonlabs/skeleton';		
    initializeStores();
    const modalStore = getModalStore();


    let showCertificates = false
    let showPreview = false
    let inputs = [{
      network: '',
      url: ''
    }]

    function addInput() {
      inputs = [...inputs, {network:'',url: ''}]
    }

    if($basicDetailsData?.social_media_profile?.length) {
      inputs = $basicDetailsData.social_media_profile.map(sm => ({
        network: sm.network || '',
        url: sm.url || ''
      }))
    }

    function toggleComponent() {
      showCertificates = true
    }

    async function toPreviewPage() {
      const socialMedia = inputs.filter(sm => {
        return Object.values(sm).some(value => value !== '')
      })
      if(socialMedia?.length) {
        const socialMediaData = inputs.map(sm => ({
        network: sm.network,
        url: sm.url
      }))
        const currentFormData = $basicDetailsData
        currentFormData.social_media_profile = socialMediaData
        updateBasicDetails(currentFormData)
      }
      showPreview = true
    }

    function alertMessage(head, message) {
      const modal = {
      type: 'alert',
      title: head,
      body: message
      };
      modalStore.trigger(modal);
    }
    function deleteSocialMedia(index) {
      inputs = inputs.filter((_, i) => i !== index);
    }
    function buttonDisable(index) {
        return index === 0
    }
  </script>

<style>
  .action-btn {
      height: 50px;
  }
  .action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>