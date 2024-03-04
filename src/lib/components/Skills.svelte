<main>
  {#if showExperience}
    <Experience/>
  {:else if showCertificate}
    <Certifications/>
  {:else}
    <div class="container mx-auto mt-10">
      <h2 class="text-4xl text-slate-600">Skills</h2>
      <div class="form-container mt-5">
        <div class="grid grid-cols-1 gap-4">
          {#each skillInputFields as skillInputField, index}
          <div class="flex" class:mt-12={index > 0}> 
            <label class="label w-1/2">
              <span>Skill Name</span>
              <input class="input p-3 rounded-lg border" type="text" placeholder="Skill Name" bind:value={skillInputField.skillName}/>
            </label>
          <label class="label w-1/2 ml-4">
            <span>Skill Level</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="Skill Level" bind:value={skillInputField.skillLevel} />
          </label>
          <button class="bg-gray-400 rounded-lg p-2 ml-4 mt-6 w-28 action-btn" disabled='{buttonDisable(index)}' on:click={()=>deleteSkill(index)}><span class="font-medium">DELETE</span></button>
        </div>
          {/each}
        <div class="flex justify-end">
          <button type="button" class="bg-gray-400 rounded-lg w-28 action-btn"  on:click={addSkills}><span class="font-medium">ADD</span></button>
       </div>
        </div>
        <div class="flex justify-between">
          <button type="button" class="border-2 border-gray-400 rounded-lg p-3 w-40 mt-10" on:click={toggleComponentBackWard}><span class="font-medium">BACK</span></button>
          <button type="button" class="border-2 border-gray-400 rounded-lg p-3 w-40 mt-10" on:click={toggleComponent}><span class="font-medium">NEXT</span></button>
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
      let skill = skillInputFields.filter(sk => {
        return Object.values(sk).some(value => value !== '')
      })
      if(skill?.length) {
        const skillData = skill.map(sk => ({
        skill_name: sk.skillName,
        skill_level: sk.skillLevel
      }))
        const currentFormData = $basicDetailsData
        currentFormData.skills = skillData
        updateBasicDetails(currentFormData)
      }
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
    function deleteSkill(index) {
      skillInputFields = skillInputFields.filter((_, i) => i !== index);
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

