<main>
    {#if showExperience}
        <Experience/>
    {:else if showBasic}
        <BasicDetails/>
    {:else}
        <div class="container mx-auto mt-10">
            <h2 class="text-4xl text-slate-600">Education</h2>
            <div class="form-container mt-5">
            <div class="grid grid-cols-1 gap-4">
                {#each educationInputFields as educationInputField, index}
                    <div class="flex" class:mt-12={index > 0}>
                        <label class="label basis-1/2">
                            <span>Institution Name <span class="text-red-700">*</span> </span>
                            <input data-error ={`instituteErr-${index}`} data-rule="['required', 'firstLetter']" class="input p-3 rounded-lg border validate" type="text" placeholder="Institution Name" bind:value={educationInputField.institutionName} on:blur={validateInput} />
                            <span class="err-msg text-xs" id={`instituteErr-${index}`}></span>
                        </label>
                        <label class="label basis-1/2 ml-4">
                            <span>Location <span class="text-red-700">*</span> </span>
                            <input data-error={`locationErr-${index}`} data-rule="['required', 'firstLetter']" class="input p-3 rounded-lg border validate" type="text" placeholder="Location" bind:value={educationInputField.location} on:blur={validateInput} />
                            <span class="err-msg text-xs" id={`locationErr-${index}`}></span>
                        </label>
                    </div>
                    <div>
                        <label class="label">
                            <span>Course Name <span class="text-red-700">*</span> </span>
                            <input data-error={`coursenameErr-${index}`} data-rule="['required', 'firstLetter']" class="input p-3 rounded-lg border validate" type="text" placeholder="Course Name" bind:value={educationInputField.courseName} on:blur={validateInput}/>
                            <span class="err-msg text-xs" id={`coursenameErr-${index}`}></span>
                            </label>
                    </div>
                    <div class="flex">
                        <div class="w-1/2">
                            <label class="label">
                                <span>Start Date <span class="text-red-700">*</span> </span>
                                <div class="flex">
                                   <div class="w-1/2">
                                    <input data-error={`startmonthError-${index}`} data-rule="['required', 'firstLetter']" class="input p-3 rounded-lg border validate" type="text" placeholder="Month" bind:value={educationInputField.startDateMonth} on:blur={validateInput} on:focusout={(event) => validateYear(index)}/>
                                    <span class="err-msg text-xs" id={`startmonthError-${index}`}></span>
                                   </div>
                                   <div class="w-1/2 ml-4">
                                    <input data-error={`startyearError-${index}`} data-rule="['required']" class="input p-3 rounded-lg border validate" type="text" placeholder="Year" bind:value={educationInputField.startDateYear} on:blur={validateInput} on:focusout={(event) => validateYear(index)} />
                                    <span class="err-msg text-xs" id={`startyearError-${index}`}></span>
                                   </div>
                                </div>
                            </label>
                        </div>
                        <div class="ml-4">
                            <label class="label">
                                <span>End Date <span class="text-red-700">*</span> </span>
                                <div class="flex">
                                    <div class="w-80">
                                        <input data-error={`educationeEndDateErr-${index}`} data-rule="['required', 'firstLetter']" class="input p-3 rounded-lg border validate" type="text" placeholder="Month" bind:value={educationInputField.endDateMonth} on:blur={validateInput} on:focusout={(event) => validateYear(index)}/>
                                        <span class="err-msg text-xs" id={`educationeEndDateErr-${index}`}></span>
                                    </div>
                                    <div class="ml-4 w-80">
                                        <input data-error={`endyearError-${index}`} data-rule="['required']" class="input p-3 rounded-lg border validate" type="text" placeholder="Year" bind:value={educationInputField.endDateYear} on:blur={validateInput} on:focusout={(event) => validateYear(index)}/>
                                        <span class="err-msg text-xs" id={`endyearError-${index}`}></span>
                                    </div>
                                        <button class="bg-gray-400 rounded-lg p-2 ml-4 w-28 action-btn" disabled='{buttonDisable(index)}' on:click={()=>deleteEducation(index)}><span class="font-medium">DELETE</span></button>
                                </div>
                            </label>
                        </div>
                    </div>
                {/each}
               <div class="flex justify-end">
                    <button type="button" class="bg-gray-400 rounded-lg w-28 action-btn"  on:click={addEducationFields}><span class="font-medium">ADD</span></button>
               </div>
            </div>

            <div class="flex justify-between">
                <button id="button1" type="button" class="border-2 border-gray-400 rounded-lg p-3 w-40 mt-10" on:click={toggleComponentBackward}><span class="font-medium">BACK</span></button>
                <button type="button" class="border-2 border-gray-400 rounded-lg p-3 w-40 mt-10" on:click={toggleComponent}><span class="font-medium">NEXT</span></button>
            </div>
            </div>
        </div>
    {/if}
</main>

  <script>
    import {basicDetailsData, updateBasicDetails} from '../../store/resume.js'
    import Experience from "./Experience.svelte";
    import BasicDetails from "./BasicDetails.svelte";
    import {customValidation} from '../../utilities/validations.js'
    import {monthToNumber} from '../../utilities/index.js'
    

    let showExperience = false
    let showBasic = false
    let isValidDuration = true

    let educationInputFields = [{
        institutionName: '',
        location: '',
        courseName: '',
        startDateMonth: '',
        startDateYear: '',
        endDateMonth:'',
        endDateYear: ''
    }]
    
    if($basicDetailsData?.education?.length) {
            educationInputFields = $basicDetailsData.education.map(education => ({
                institutionName: education.institute_name || '',
                location: education.location || '',
                courseName: education.course_name || '',
                startDateMonth:education.start_month || '',
                startDateYear:education.start_year || '',
                endDateMonth:education.end_month || '',
                endDateYear:education.end_year || '',
            })) 
        }
    
    function validateInput(event) {
      const inputElement = event.target
      const rule = JSON.parse(inputElement.dataset.rule.replace(/'/g, '"'))
      customValidation.validate(inputElement,rule)
    }

    function toggleComponent() {
    let education = []
    let isValidationPassed = true
    const inputs = document.querySelectorAll('.validate')

    inputs.forEach(input => {
    const rule = JSON.parse(input.dataset.rule.replace(/'/g, '"'))
    if(!customValidation.validate(input,rule)) isValidationPassed = false

    educationInputFields.forEach((obj, index) => {
        if(validateYear(index) === false)
        isValidationPassed = false
    })

    education = educationInputFields.filter(edu => {
        return Object.values(edu).some(value => value !== '')
    })
     })
     if(isValidationPassed) { 
        if(education?.length) {
            const educationData = education.map(edu => ({
                course_name: edu.courseName,
                institute_name: edu.institutionName,
                location:edu.location,
                start_month:edu.startDateMonth,
                start_year:edu.startDateYear,
                end_month:edu.endDateMonth,
                end_year:edu.endDateYear,
            }))
            const currentFormData = $basicDetailsData
            currentFormData.education = educationData
            updateBasicDetails(currentFormData)
        }
        showExperience = true
     }    
    }

    function toggleComponentBackward() {
        showBasic = true
    }
    function addEducationFields() {
        educationInputFields = [...educationInputFields, {
        institutionName: '',
        location: '',
        courseName: '',
        startDateMonth: '',
        startDateYear: '',
        endDateMonth:'',
        endDateYear: ''}]
    }
    function deleteEducation(index) {
      educationInputFields = educationInputFields.filter((_, i) => i !== index);
    }
    function buttonDisable(index) {
        return index === 0
    }
    function validateYear(index) {
            const startMonth = monthToNumber(educationInputFields[index].startDateMonth)
            const startYear = parseInt(educationInputFields[index].startDateYear)
            const endMonth = monthToNumber(educationInputFields[index].endDateMonth)
            const endYear = parseInt(educationInputFields[index].endDateYear)
            const yearErrMsg = document.getElementById(`educationeEndDateErr-${index}`)
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
  </script>

<style>
    :global(.error){
      border: 2px solid #C70039 
    }
    .err-msg {
      color: #C70039; 
    }
    .action-btn {
        height: 48px;
    }
    .action-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  </style>
