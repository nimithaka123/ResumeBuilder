<main>
  {#if showSocialMedia}
    <SocialMediaProfile/>
  {:else if showSkill}
    <Skills/>
  {:else}
    <div class="container mx-auto mt-10">
      <h2 class="text-4xl">Certifications</h2>
      <div class="form-container mt-5">
        <div class="grid grid-cols-2 gap-4">
          {#each certificationInputFields as certificationInputField, index}
          <label class="label">
            <span>Certification Name</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="Certification Name" bind:value={certificationInputField.certificationName} />
          </label>
          <label class="label">
            <span>Url</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="Url" bind:value={certificationInputField.url} />
          </label>
          <label class="label">
            <span>Start Year</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="Start Year" bind:value={certificationInputField.startYear} />
          </label>
          <label class="label">
            <span>End Year</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="End Year" bind:value={certificationInputField.endYear} />
          </label>
          {#if index < certificationInputFields.length - 1}
            <hr class="my-8 border-b-2 border-gray-200">
            <hr class="my-8 border-b-2 border-gray-200">
          {/if}
        {/each}
        <div></div>
        <button type="button" class="text-right " on:click={addCertifications}><span class="text-blue-950">+ Add</span></button>
      </div>
        <div class="flex justify-between">
          <button type="button" class="border-2 border-blue-800 rounded-lg p-3 w-40 mt-10" on:click={toggleComponentBackWard}>Back</button>
          <button type="button" class="border-2 border-blue-800 rounded-lg p-3 w-40 mt-10" on:click={toggleComponentForward}>Next</button>
        </div>
      </div>
    </div>
  {/if}
</main>

  <script>
    import {basicDetailsData, updateBasicDetails} from '../../store/resume.js'
    import SocialMediaProfile from "./SocialMediaProfile.svelte";
    import Skills from "./Skills.svelte";

    let showSocialMedia = false
    let showSkill = false
    let certificationInputFields = [{
      certificationName: '',
      url: '',
      startYear: '',
      endYear: ''
    }]

    if($basicDetailsData?.certifications) {
      certificationInputFields = $basicDetailsData.certifications.map(cert => ({
        certificationName: cert.certificate_name || '',
        url: cert.url || '',
        startYear: cert.start_year,
        endYear: cert.end_year
      }))
    }
    
    function toggleComponentForward() {
      const certifications = certificationInputFields.map(cert => ({
        certificate_name: cert.certificationName,
        url: cert.url,
        start_year: cert.startYear,
        end_year: cert.endYear
      }))
      const currentFormData = $basicDetailsData
      currentFormData.certifications = certifications
      updateBasicDetails(currentFormData)
      showSocialMedia = true
    }

    function toggleComponentBackWard() {
      showSkill = true
    }
    function addCertifications() {
      certificationInputFields = [...certificationInputFields, {
        certificationName: '',
        url: '',
        startYear: '',
        endYear: ''
      }]
    }
  </script>
