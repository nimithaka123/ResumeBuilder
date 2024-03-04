<main>
  {#if showSkill}
    <Skills/>
  {:else if showEducation}
    <Education/>
  {:else}
    <div class="container mx-auto mt-10">
      <h2 class="text-4xl text-slate-600">Work History</h2>
      <div class="form-container mt-5">
        <div class="grid grid-cols-1 gap-4">
          {#each experienceInputFields as experienceInputField, index}
            <div class="flex" class:mt-12={index > 0}>
              <label class="label basis-1/2">
                <span>Job Title</span>
                <input class="input p-3 rounded-lg border" type="text" placeholder="Job Title" bind:value={experienceInputField.jobTitle} />
              </label>
              <label class="label basis-1/2 ml-4">
                <span>Employer</span>
                <input class="input p-3 rounded-lg border" type="text" placeholder="Employer" bind:value={experienceInputField.employer} />
              </label>
            </div>
            <div>
              <label class="label">
                <span>Job Description</span>
                <input class="input p-3 rounded-lg border" type="text" placeholder="Job Description" bind:value={experienceInputField.jobDescription} />
              </label>
            </div>
            <div class="flex">
              <div class="w-1/2">
                <label class="label">
                  <span>Start Date</span>
                  <div class="flex">
                    <div class="w-1/2">
                      <input class="input p-3 rounded-lg border" type="text" placeholder="Month" bind:value={experienceInputField.startDateMonth} on:focusout={(event) => validateYear(index)} />
                    </div>
                    <div class="w-1/2 ml-4">
                      <input class="input p-3 rounded-lg border" type="text" placeholder="Year" bind:value={experienceInputField.startDateYear} on:focusout={(event) => validateYear(index)} />
                    </div>
                  </div>
                </label>
              </div>
              <div class="ml-4">
                <label class="label">
                  <span>End Date</span>
                  <div class="flex">
                    <div class="w-80">
                      <input data-error={`experienceEndDateErr-${index}`} class="input p-3 rounded-lg border" type="text" placeholder="Month" bind:value={experienceInputField.endDateMonth} on:focusout={(event) => validateYear(index)} />
                      <span class="err-msg text-xs" id={`experienceEndDateErr-${index}`}></span>
                    </div>
                    <div class="w-80 ml-4">
                      <input class="input p-3 rounded-lg border" type="text" placeholder="Year" bind:value={experienceInputField.endDateYear} on:focusout={(event) => validateYear(index)}/>
                    </div>
                    <button class="bg-gray-400 rounded-lg p-2 ml-4 w-28 action-btn" disabled='{buttonDisable(index)}' on:click={()=>deleteExperience(index)}><span class="font-medium">DELETE</span></button>
                  </div>
                </label>
              </div>
              <span class="err-msg text-xs text-red-600" id="experienceDurationErr"></span>
            </div>
          {/each}
          <div class="flex justify-end">
            <button type="button" class="bg-gray-400 rounded-lg w-28 action-btn" on:click={addExperienceFields}><span class="font-medium">ADD</span></button>
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
    import Skills from "./Skills.svelte";
    import Education from "./Education.svelte";
    import {monthToNumber} from '../../utilities/index.js'

    let showSkill = false
    let showEducation = false

    let experienceInputFields = [{
      jobTitle : '',
      employer: '',
      jobDescription: '',
      startDateMonth: '',
      startDateYear: '',
      endDateMonth: '',
      endDateYear: ''
    }]

    
    if($basicDetailsData?.work_experience?.length) {
      experienceInputFields = $basicDetailsData.work_experience.map(exp => ({
        jobTitle: exp.job_title || '',
        jobDescription: exp.job_description || '',
        employer: exp.employer || '',
        startDateMonth: exp.start_month || '',
        startDateYear: exp.start_year || '',
        endDateMonth: exp.end_month || '',
        endDateYear: exp.end_year || ''
      }))
    }

    function validateYear(index) {
      let isValidDuration = true
      const startMonth = monthToNumber(experienceInputFields[index].startDateMonth)
      const startYear = parseInt(experienceInputFields[index].startDateYear)
      const endMonth = monthToNumber(experienceInputFields[index].endDateMonth)
      const endYear = parseInt(experienceInputFields[index].endDateYear)
      const yearErrMsg = document.getElementById(`experienceEndDateErr-${index}`)
      const errMsg = "This is not a valid duration"
      if(startMonth && startYear && endMonth && endYear) {
          if(endYear < startYear) {
              yearErrMsg.innerHTML = errMsg
              isValidDuration = false
            }
            else if(endYear === startYear) {
              if(endMonth <= startMonth) {
                  yearErrMsg.innerHTML = errMsg
                    isValidDuration = false
                  }
              else {
                  yearErrMsg.innerHTML = ""
                  isValidDuration = true
                  }
                } 
                else {
                    yearErrMsg.innerHTML = ""
                    isValidDuration = true
                }
            }
        return isValidDuration  
    }
    
    function toggleComponent() {
      let isValidationPassed = true
      let experience = experienceInputFields.filter(exp => {
        return Object.values(exp).some(value => value !== '')
      })
      experienceInputFields.forEach((obj, index) => {
        if(validateYear(index) === false)
        isValidationPassed = false
    })
      
      if(isValidationPassed) {
        if(experience?.length) {
          const experienceData = experience.map(exp => ({
          job_title: exp.jobTitle,
          employer: exp.employer,
          job_description: exp.jobDescription,
          start_month: exp.startDateMonth,
          start_year: exp.startDateYear,
          end_month: exp.endDateMonth,
          end_year: exp.endDateYear
        }))
        const currentFormData = $basicDetailsData
        currentFormData.work_experience = experienceData
        updateBasicDetails(currentFormData)
        }
        showSkill = true
    }
    }
    function deleteExperience(index) {
      experienceInputFields = experienceInputFields.filter((_, i) => i !== index);
    }
    function buttonDisable(index) {
        return index === 0
    }

    function toggleComponentBackWard() {
      showEducation = true
    }
    function addExperienceFields() {
      experienceInputFields = [...experienceInputFields, {
        jobTitle : '',
        employer: '',
        jobDescription: '',
        startDateMonth: '',
        startDateYear: '',
        endDateMonth: '',
        endDateYear: ''
      }]
    }

  </script>

  <style>
    .err-msg {
      color: #C70039; 
    }
    .action-btn {
        height: 50px;
    }
    .action-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  </style>
