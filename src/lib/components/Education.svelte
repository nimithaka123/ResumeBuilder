<main>
    {#if showExperience}
        <Experience/>
    {:else if showBasic}
        <BasicDetails/>
    {:else}
        <div class="container mx-auto mt-10">
            <h2 class="text-4xl">Education</h2>
            <div class="form-container mt-5">
            <div class="grid grid-cols-2 gap-4">
                {#each educationInputFields as educationInputField, index}
                  <!-- <h3 class="text-xl">Education-{index+1}</h3>
                    <div></div> -->
                    <label class="label">
                    <span>Institution Name</span>
                    <input class="input p-3 rounded-lg border" type="text" placeholder="Institution Name" bind:value={educationInputField.institutionName} />
                    </label>
                    <label class="label">
                    <span>Location</span>
                    <input class="input p-3 rounded-lg border" type="text" placeholder="Location" bind:value={educationInputField.location} />
                    </label>
                    <label class="label">
                    <span>Course Name</span>
                    <input class="input p-3 rounded-lg border" type="text" placeholder="Course Name" bind:value={educationInputField.courseName}/>
                    </label>
                    <div></div>
                    <label class="label">
                    <span>Start Date</span>
                    <div class="grid grid-cols-2 gap-4">
                        <input class="input p-3 rounded-lg border" type="text" placeholder="Month" bind:value={educationInputField.startDateMonth} />
                        <input class="input p-3 rounded-lg border" type="text" placeholder="Year" bind:value={educationInputField.startDateYear}/>
                    </div>
                    </label>
                    <label class="label">
                    <span>End Date</span>
                    <div class="grid grid-cols-2 gap-4">
                        <input class="input p-3 rounded-lg border" type="text" placeholder="Month" bind:value={educationInputField.endDateMonth} />
                        <input class="input p-3 rounded-lg border" type="text" placeholder="Year" bind:value={educationInputField.endDateYear} />
                    </div>
                    </label>
                    {#if index < educationInputFields.length - 1}
                        <hr class="my-8 border-b-2 border-gray-200">
                        <hr class="my-8 border-b-2 border-gray-200">
                    {/if}
                {/each}
                <div></div>
                <button type="button" class="text-right " on:click={addEducationFields}><span class="text-blue-950">+ Add</span></button>
            </div>

            <div class="flex justify-between">
                <button id="button1" type="button" class="border-2 border-blue-800 rounded-lg p-3 w-40 mt-10" on:click={toggleComponentBackward}>Back</button>
                <button type="button" class="border-2 border-blue-800 rounded-lg p-3 w-40 mt-10" on:click={toggleComponent}>Next</button>
            </div>
            </div>
        </div>
    {/if}
</main>

  <script>
    import {basicDetailsData, updateBasicDetails} from '../../store/resume.js'
    // import {onMount} from '/sv'
    import Experience from "./Experience.svelte";
    import BasicDetails from "./BasicDetails.svelte";

    let showExperience = false
    let showBasic = false
    let educationInputFields = [{
        institutionName: '',
        location: '',
        courseName: '',
        startDateMonth: '',
        startDateYear: '',
        endDateMonth:'',
        endDateYear: ''
    }]
    
    console.log('educationnnnnnnnnnnnn', $basicDetailsData)
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
    
    function toggleComponent() {
        const educationData = educationInputFields.map(education => ({
            course_name: education.courseName,
            institute_name: education.institutionName,
            location:education.location,
            start_month:education.startDateMonth,
            start_year:education.startDateYear,
            end_month:education.endDateMonth,
            end_year:education.endDateYear,
        }))
        const currentFormData = $basicDetailsData
        currentFormData.education = educationData
        updateBasicDetails(currentFormData)
        showExperience = true
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
  </script>
