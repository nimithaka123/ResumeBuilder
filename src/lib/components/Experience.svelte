<main>
  {#if showSkill}
    <Skills/>
  {:else if showEducation}
    <Education/>
  {:else}
    <div class="container mx-auto mt-10">
      <h2 class="text-4xl">Work History</h2>
      <div class="form-container mt-5">
        <div class="grid grid-cols-2 gap-4">
          {#each experienceInputFields as experienceInputField, index}
          <label class="label">
            <span>Job Title</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="Job Title" bind:value={experienceInputField.jobTitle} />
          </label>
          <label class="label">
            <span>Employer</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="Employer" bind:value={experienceInputField.employer} />
          </label>
          <label class="label">
            <span>Location</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="Location" bind:value={experienceInputField.location} />
          </label>
          <label class="label">
            <span>Job Description</span>
            <input class="input p-3 rounded-lg border" type="text" placeholder="Job Description" bind:value={experienceInputField.jobDescription} />
          </label>
          <label class="label">
            <span>Start Date</span>
            <div class="grid grid-cols-2 gap-4">
              <input class="input p-3 rounded-lg border" type="text" placeholder="Month" bind:value={experienceInputField.startDateMonth} />
              <input class="input p-3 rounded-lg border" type="text" placeholder="Year" bind:value={experienceInputField.startDateYear}/>
            </div>
          </label>
          <label class="label">
            <span>End Date</span>
            <div class="grid grid-cols-2 gap-4">
              <input class="input p-3 rounded-lg border" type="text" placeholder="Month" bind:value={experienceInputField.endDateMonth} />
              <input class="input p-3 rounded-lg border" type="text" placeholder="Year" bind:value={experienceInputField.endDateYear}/>
            </div>
          </label>
          {#if index < experienceInputFields.length - 1}
            <hr class="my-8 border-b-2 border-gray-200">
            <hr class="my-8 border-b-2 border-gray-200">
          {/if}
          {/each}
          <div></div>
          <button type="button" class="text-right " on:click={addExperienceFields}><span class="text-blue-950">+ Add</span></button>
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
    import Skills from "./Skills.svelte";
    import Education from "./Education.svelte";

    let showSkill = false
    let showEducation = false

    let experienceInputFields = [{
      jobTitle : '',
      employer: '',
      jobDescription: '',
      location: '',
      startDateMonth: '',
      startDateYear: '',
      endDateMonth: '',
      endDateYear: ''
    }]

    console.log();
    if($basicDetailsData?.work_experience?.length) {
      experienceInputFields = $basicDetailsData.work_experience.map(exp => ({
        jobTitle: exp.job_title || '',
        jobDescription: exp.job_description || '',
        employer: exp.employer || '',
        location: exp.location || '',
        startDateMonth: exp.start_month || '',
        startDateYear: exp.start_year || '',
        endDateMonth: exp.end_month || '',
        endDateYear: exp.end_year || ''
      }))
    }
    
    function toggleComponent() {
      const experienceData = experienceInputFields.map(exp => ({
        job_title: exp.jobTitle,
        employer: exp.employer,
        location: exp.location,
        job_description: exp.jobDescription,
        start_month: exp.startDateMonth,
        start_year: exp.startDateYear,
        end_month: exp.endDateMonth,
        end_year: exp.endDateYear
      }))
      const currentFormData = $basicDetailsData
      currentFormData.work_experience = experienceData
      updateBasicDetails(currentFormData)
      showSkill = true
    }
    function toggleComponentBackWard() {
      showEducation = true
    }
    function addExperienceFields() {
      experienceInputFields = [...experienceInputFields, {
        jobTitle : '',
        employer: '',
        jobDescription: '',
        location: '',
        startDateMonth: '',
        startDateYear: '',
        endDateMonth: '',
        endDateYear: ''
      }]
    }

  </script>
