  <main>
    {#if showCertificates}
      <Certifications/>
    {:else if showPreview}
      <!-- <ModernResumeTemplate/> -->
      <!-- <SimpleResumeTemplate/> -->
      <!-- <IntermediateResumeTemplate/> -->
      <TemplateChoice/>
    {:else}
    <div class="container mx-auto mt-10">
      <h2 class="text-4xl">Social Media Profile</h2>
      <div class="form-container mt-5">
        <div class="grid grid-cols-2 gap-4">
          {#each inputs as input, index}
          <label class="label">
            <span>Network</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="Network" bind:value={input.network}/>
          </label>
          <label class="label">
            <span>Url</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="Url" bind:value={input.url} />
          </label>
          {/each}
          <!-- <button type="button" class="text-left " on:click={removeInput}><span class="text-blue-950">- Remove</span></button> -->
          <div></div>
          <button type="button" class="text-right " on:click={addInput}><span class="text-blue-950">+ Add</span></button>
        </div>
        <div class="flex justify-between">
          <button type="button" class="border-2 border-blue-800 rounded-lg p-3 w-40 mt-10" on:click={toggleComponent}>Back</button>
          <button type="button" class="border-2 border-blue-800 rounded-lg p-3 w-40 mt-10" on:click={toPreviewPage}>Preview</button> 
        </div>
      </div>
    </div>
    {/if}
    <Modal/>
  </main>
  
  
  <script>
    import axios from 'axios';
    import {goto} from '$app/navigation'
    import {basicDetailsData, updateBasicDetails} from '../../store/resume.js'
    import Certifications from "./Certifications.svelte";
    import ModernResumeTemplate from './ModernResumeTemplate.svelte';
    import SimpleResumeTemplate from './simpleResumeTemplate.svelte';
    import IntermediateResumeTemplate from './IntermediateResumeTemplate.svelte';
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

    // function removeInput() {
    //   inputs.pop();
    //   inputs = [...inputs]; 
    // }

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
      const hasSocialMedia = inputs.some(sm => {
        return Object.values(sm).some(value => value !== '')
      })
      if(hasSocialMedia) {
        const socialMedia = inputs.map(sm => ({
        network: sm.network,
        url: sm.url
      }))
        const currentFormData = $basicDetailsData
        currentFormData.social_media_profile = socialMedia
        updateBasicDetails(currentFormData)
      }
      showPreview = true
      // if($basicDetailsData?.id) {
      //   try {
      //     let updatedData = $basicDetailsData
      //     const response = await axios.put(`http://localhost:5173/api/${updatedData.id}`, updatedData)
      //     if(response.status === 200) {
      //       alertMessage('Saved', 'Successfully Saved')
      //   }
      //   else {
      //     alertMessage('error', 'Oops, something went wrong')
      //   }
      //   }
      //   catch(error) {
      //     alertMessage('error', 'Oops, something went wrong')
      //     console.log('error', error);
      //   }

      // }
      // else {
        // goto('/preview-simple-template')
      //   try {
      //   const response = await axios.post(`http://localhost:5173/api`, currentFormData)
      //   if(response.status === 200) {
      //     alertMessage('Saved', 'Successfully Saved')
      //   }
      //   else {
      //     alertMessage('error', 'Oops, something went wrong')
      //   }
      // }
      // catch(error) {
      //   alertMessage('error', 'Oops, something went wrong')
      //   console.log('error', error); 
      // }
      // }
    }

    function alertMessage(head, message) {
      const modal = {
      type: 'alert',
      title: head,
      body: message
      };
      modalStore.trigger(modal);
    }
  </script>