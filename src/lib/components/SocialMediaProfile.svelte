  <main>
    {#if showCertificates}
      <Certifications/>
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
          <button type="button" class="text-left " on:click={removeInput}><span class="text-blue-950">- Remove</span></button>
          <button type="button" class="text-right " on:click={addInput}><span class="text-blue-950">+ Add</span></button>
        </div>
        <div class="flex justify-between">
          <button type="button" class="border-2 border-blue-800 rounded-lg p-3 w-40 mt-10" on:click={toggleComponent}>Back</button>
          <button type="button" class="border-2 border-blue-800 rounded-lg p-3 w-40 mt-10" on:click={formSubmit}>Save</button> 
        </div>
      </div>
    </div>
    {/if}
  </main>
  
  
  <script>
    import axios from 'axios';
    import {basicDetailsData, updateBasicDetails} from '../../store/resume.js'
    import Certifications from "./Certifications.svelte";

    let showCertificates = false
    let inputs = [{
      network: '',
      url: ''
    }]
    function addInput() {
      inputs = [...inputs, {network:'',url: ''}]
    }
    function removeInput() {
      inputs.pop();
      inputs = [...inputs]; // Trigger reactivity
    }
    if($basicDetailsData?.social_media_profile) {
      inputs = $basicDetailsData.social_media_profile.map(sm => ({
        network: sm.network || '',
        url: sm.url || ''
      }))
    }

    function toggleComponent() {
      showCertificates = true
    }
    async function formSubmit() {
      const socialMedia = inputs.map(sm => ({
        network: sm.network,
        url: sm.url
      }))
      const currentFormData = $basicDetailsData
      currentFormData.social_media_profile = socialMedia
      updateBasicDetails(currentFormData)

      if($basicDetailsData?.id) {
        try {
          let updatedData = $basicDetailsData
          const response = await axios.put(`http://localhost:5173/api/${updatedData.id}`, updatedData)
          console.log('edited successfully', updatedData)

        }
        catch(error) {
          console.log('error', error);
        }

      }
      else {
        try {
        const response = await axios.post(`http://localhost:5173/api/`, currentFormData)
        if(response.status === 200) {
          console.log('successfully updated')
        }
      }
      catch(error) {
        console.log('error', error);
      }
      }
    }
  </script>