<main>
  {#if showExperience}
    <Experience/>
  {:else if showCertificate}
    <Certifications/>
  {:else}
    <div class="container mx-auto mt-10">
      <h2 class="text-4xl">Skills</h2>
      <div class="form-container mt-5">
        <div class="grid grid-cols-1 gap-4">
          {#each skillInputFields as skillInputField, index}
          <div class="flex justify-between"> 
            <label class="label w-1/2">
            <span>Skill Name</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="Skill Name" bind:value={skillInputField.skillName}/>
          </label>
          <label class="label w-1/2 ml-5">
            <span>Skill Level</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="Skill Level" bind:value={skillInputField.skillLevel} />
          </label>
        </div>
         
          <!-- <button class="border-2 border-blue-800 rounded-lg p-3 w-40 mt-10">Delete</button> -->
          {#if index < skillInputFields.length - 1}
            <hr class="my-8 border-b-2 border-gray-200">
          {/if}
          {/each}
          <button class="text-right " on:click={addSkills}><span class="text-blue-950">+ Add</span></button>
        </div>
        <div class="flex justify-between">
          <button type="button" class="border-2 border-blue-800 rounded-lg p-3 w-40 mt-10" on:click={toggleComponentBackWard}>Back</button>
          <button type="button" class="border-2 border-blue-800 rounded-lg p-3 w-40 mt-10" on:click={toggleComponent}>Next</button>
        </div>
      </div>
    </div>
  {/if}
</main>

  <script>
    import {basicDetailsData, updateBasicDetails} from '../../store/resume.js'
    import Certifications from "./Certifications.svelte";
    import Experience from "./Experience.svelte";

    let skillInputFields = [{
      skillName: '',
      skillLevel: ''
    }]
    if($basicDetailsData?.skills?.length) {
      skillInputFields = $basicDetailsData.skills.map(skill => ({
        skillName : skill.skill_name || '',
        skillLevel : skill.skill_level || ''
      }))
    }

    let showCertificate = false
    let showExperience = false

    function toggleComponent() {
      const skillData = skillInputFields.map(skill => ({
        skill_name: skill.skillName,
        skill_level: skill.skillLevel
      }))
      const currentFormData = $basicDetailsData
      currentFormData.skills = skillData
      updateBasicDetails(currentFormData)
      showCertificate = true
    }
    function toggleComponentBackWard() {
      showExperience = true
    }
    function addSkills() {
      skillInputFields = [...skillInputFields, {
        skillName: '',
        skillLevel: ''
      }]
    }
  </script>

