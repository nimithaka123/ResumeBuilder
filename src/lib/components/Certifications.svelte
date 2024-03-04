<main>
  {#if showSocialMedia}
    <SocialMediaProfile/>
  {:else if showSkill}
    <Skills/>
  {:else}
    <div class="container mx-auto mt-10">
      <h2 class="text-4xl text-slate-600">Certifications</h2>
      <div class="form-container mt-5">
        <div class="grid grid-cols-1 gap-4">
          {#each certificationInputFields as certificationInputField, index}
          <div class="flex" class:mt-12={index > 0}>
            <label class="label w-1/2">
              <span>Certification Name</span>
              <input class="input p-3 rounded-lg border" type="text" placeholder="Certification Name" bind:value={certificationInputField.certificationName} />
            </label>
            <label class="label w-1/2 ml-4">
              <span>Url</span>
              <input class="input p-3 rounded-lg border" type="text" placeholder="Url" bind:value={certificationInputField.url} />
            </label>
          </div>
          <div class="flex justify-between">
            <div class="flex w-1/2">
              <label class="label w-1/2">
                <span>Start Year</span>
                <input class="input p-3 rounded-lg border" type="text" placeholder="Start Year" bind:value={certificationInputField.startYear} on:focusout={(event) => validateYear(index)} />
              </label>
              <label class="label w-1/2 ml-4">
                <span>End Year</span>
                <input data-error={`certEndyearError-${index}`} class="input p-3 rounded-lg border" type="text" placeholder="End Year" bind:value={certificationInputField.endYear} on:focusout={(event) => validateYear(index)} />
                <span class="err-msg text-xs" id={`certEndyearError-${index}`}></span>
              </label>
            </div>
            <button class="bg-gray-400 rounded-lg p-2 ml-4 mt-6 w-28 action-btn" disabled='{buttonDisable(index)}' on:click={()=>deleteCertificates(index)}><span class="font-medium">DELETE</span></button>
          </div>
        {/each}
        <div class="flex justify-end">
          <button type="button" class="bg-gray-400 rounded-lg w-28 action-btn"  on:click={addCertifications}><span class="font-medium">ADD</span></button>
     </div>
      </div>
        <div class="flex justify-between">
          <button type="button" class="border-2 border-gray-400 rounded-lg p-3 w-40 mt-10" on:click={toggleComponentBackWard}><span class="font-medium">BACK</span></button>
          <button type="button" class="border-2 border-gray-400 rounded-lg p-3 w-40 mt-10" on:click={toggleComponentForward}><span class="font-medium">NEXT</span></button>
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

    if($basicDetailsData?.certifications?.length) {
      certificationInputFields = $basicDetailsData.certifications.map(cert => ({
        certificationName: cert.certificate_name || '',
        url: cert.url || '',
        startYear: cert.start_year,
        endYear: cert.end_year
      }))
    }

    function toggleComponentForward() {
      let isValidationPassed = true

      const certifications = certificationInputFields.filter(cert => {
        return Object.values(cert).some(value => value !== '')
      })

      certificationInputFields.forEach((obj, index) => {
        if(validateYear(index) === false)
        isValidationPassed = false
    })

      if(isValidationPassed) {
        if(certifications?.length) {
        const certificationData = certifications.map(cert => ({
        certificate_name: cert.certificationName,
        url: cert.url,
        start_year: cert.startYear,
        end_year: cert.endYear
      }))
        const currentFormData = $basicDetailsData
        currentFormData.certifications = certificationData
        updateBasicDetails(currentFormData)
      }
      showSocialMedia = true
      }
    }

    function validateYear(index) {
          let isValidDuration = true
            const startYear = parseInt(certificationInputFields[index].startYear)
            const endYear = parseInt(certificationInputFields[index].endYear)
            const yearErrMsg = document.getElementById(`certEndyearError-${index}`)
            const errMsg = "This is not a valid duration"
            if(startYear && endYear) {
                if(endYear < startYear) {
                    yearErrMsg.innerHTML = errMsg
                    isValidDuration = false
                }
                else {
                    yearErrMsg.innerHTML = ""
                    isValidDuration = true
                }
            }
        return isValidDuration  
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
    function deleteCertificates(index) {
      certificationInputFields = certificationInputFields.filter((_, i) => i !== index);
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
  .err-msg {
      color: #C70039; 
    }
  </style>
